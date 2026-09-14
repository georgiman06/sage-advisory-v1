import hashlib
import hmac
import json
import logging
import os
import time
from datetime import datetime
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, Request, status
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.booking import Booking
from app.services.sendgrid import send_consultation_confirmed
from shared.database.connection import get_db

logger = logging.getLogger(__name__)

CALENDLY_WEBHOOK_SECRET = os.environ.get("CALENDLY_WEBHOOK_SECRET", "")
SENDGRID_WEBHOOK_SECRET = os.environ.get("SENDGRID_WEBHOOK_SECRET", "")

# How much clock skew to tolerate between the webhook timestamp and now.
CALENDLY_SIGNATURE_TOLERANCE_SECONDS = 300

router = APIRouter(tags=["webhooks"])


def _verify_calendly_signature(payload: bytes, signature_header: str) -> bool:
    """
    Calendly signs webhooks with a `Calendly-Webhook-Signature` header shaped
    like `t=<timestamp>,v1=<hex hmac>`. The signed message is `f"{t}.{raw_body}"`,
    HMAC-SHA256'd with the webhook signing key.
    """
    if not CALENDLY_WEBHOOK_SECRET:
        logger.warning("CALENDLY_WEBHOOK_SECRET not set — skipping signature verification")
        return True

    parts = dict(
        item.split("=", 1) for item in signature_header.split(",") if "=" in item
    )
    timestamp = parts.get("t")
    signature = parts.get("v1")
    if not timestamp or not signature:
        return False

    try:
        if abs(time.time() - int(timestamp)) > CALENDLY_SIGNATURE_TOLERANCE_SECONDS:
            logger.warning("Calendly webhook timestamp outside tolerance window")
            return False
    except ValueError:
        return False

    signed_payload = f"{timestamp}.{payload.decode('utf-8')}".encode("utf-8")
    expected = hmac.new(
        CALENDLY_WEBHOOK_SECRET.encode(), signed_payload, hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(expected, signature)


def _hash_email(email: str) -> str:
    return hashlib.sha256(email.encode()).hexdigest()


def _parse_dt(value: Any) -> datetime | None:
    if not value or not isinstance(value, str):
        return None
    try:
        return datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError:
        return None


class CalendlyWebhookPayload(BaseModel):
    event: str
    payload: dict[str, Any]


@router.post("/notifications/calendly-webhook", status_code=status.HTTP_200_OK)
async def calendly_webhook(
    request: Request,
    db: AsyncSession = Depends(get_db),
) -> dict:
    raw_body = await request.body()
    signature = request.headers.get("calendly-webhook-signature", "")

    if not _verify_calendly_signature(raw_body, signature):
        raise HTTPException(
            status_code=401,
            detail={"error": {"code": "INVALID_SIGNATURE", "message": "Webhook signature invalid."}},
        )

    try:
        data = json.loads(raw_body)
        event = data.get("event", "")
        invitee = data.get("payload", {})

        invitee_uri = invitee.get("uri", "")
        if not invitee_uri:
            logger.warning("Calendly webhook missing invitee uri, event=%s", event)
            return {"received": True}

        attendee_email = invitee.get("email", "")
        attendee_name = invitee.get("name", "")

        scheduled_event = invitee.get("scheduled_event") or {}
        event_uri = scheduled_event.get("uri")
        event_type_uri = scheduled_event.get("event_type")
        location = scheduled_event.get("location") or {}
        meeting_url = location.get("join_url") or location.get("location")

        old_invitee = invitee.get("old_invitee")

        # A reschedule shows up as a new invitee.created event carrying a
        # link back to the invitee it replaced.
        lookup_uri = old_invitee if (event == "invitee.created" and old_invitee) else invitee_uri

        existing = (
            await db.execute(
                select(Booking).where(Booking.calendly_invitee_uri == lookup_uri)
            )
        ).scalar_one_or_none()

        if event == "invitee.created":
            if old_invitee and existing is not None:
                existing.calendly_invitee_uri = invitee_uri
                existing.calendly_event_uri = event_uri
                existing.start_time = _parse_dt(scheduled_event.get("start_time"))
                existing.end_time = _parse_dt(scheduled_event.get("end_time"))
                existing.status = "rescheduled"
                existing.raw_payload = invitee
                logger.info("[booking:%s] invitee.created (reschedule)", existing.id)
            elif existing is None:
                booking = Booking(
                    calendly_invitee_uri=invitee_uri,
                    calendly_event_uri=event_uri,
                    attendee_email=attendee_email,
                    attendee_name=attendee_name,
                    attendee_email_hash=_hash_email(attendee_email) if attendee_email else None,
                    event_type_slug=event_type_uri,
                    start_time=_parse_dt(scheduled_event.get("start_time")),
                    end_time=_parse_dt(scheduled_event.get("end_time")),
                    status="confirmed",
                    meeting_url=meeting_url,
                    raw_payload=invitee,
                )
                db.add(booking)
                await db.flush()
                logger.info("[booking:%s] invitee.created persisted", booking.id)
            else:
                logger.info("[booking:%s] invitee.created duplicate, skipping insert", existing.id)

            await send_consultation_confirmed(
                recipient_email=attendee_email,
                attendee_name=attendee_name,
                start_time=scheduled_event.get("start_time", ""),
                meeting_url=meeting_url or "",
            )

        elif event == "invitee.canceled":
            if existing is not None:
                existing.status = "cancelled"
                existing.raw_payload = invitee
                logger.info("[booking:%s] invitee.canceled", existing.id)
            else:
                logger.warning("invitee.canceled for unknown invitee_uri=%s", lookup_uri)

        else:
            logger.info("Calendly webhook unhandled event=%s", event)

    except Exception as exc:
        logger.error("Calendly webhook processing error: %s", exc)

    return {"received": True}


@router.post("/notifications/sendgrid-webhook", status_code=status.HTTP_200_OK)
async def sendgrid_webhook(request: Request) -> dict:
    """
    Receives SendGrid event webhook (delivered, bounced, spam_report).
    Stores events via the email_events table (write path deferred to Phase 4 DB wiring).
    """
    try:
        events = await request.json()
        for event in events if isinstance(events, list) else [events]:
            event_type = event.get("event", "unknown")
            message_id = event.get("sg_message_id", "")
            logger.info("SendGrid event: %s message_id=%s", event_type, message_id)
    except Exception as exc:
        logger.error("SendGrid webhook processing error: %s", exc)

    return {"received": True}
