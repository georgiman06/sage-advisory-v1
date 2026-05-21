import hashlib
import hmac
import json
import logging
import os
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

CALCOM_WEBHOOK_SECRET = os.environ.get("CALCOM_WEBHOOK_SECRET", "")
SENDGRID_WEBHOOK_SECRET = os.environ.get("SENDGRID_WEBHOOK_SECRET", "")

router = APIRouter(tags=["webhooks"])


def _verify_calcom_signature(payload: bytes, signature: str) -> bool:
    if not CALCOM_WEBHOOK_SECRET:
        logger.warning("CALCOM_WEBHOOK_SECRET not set — skipping signature verification")
        return True
    expected = hmac.new(
        CALCOM_WEBHOOK_SECRET.encode(), payload, hashlib.sha256
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


class CalComWebhookPayload(BaseModel):
    triggerEvent: str
    payload: dict[str, Any]


@router.post("/notifications/cal-webhook", status_code=status.HTTP_200_OK)
async def cal_webhook(
    request: Request,
    db: AsyncSession = Depends(get_db),
) -> dict:
    raw_body = await request.body()
    signature = request.headers.get("x-cal-signature-256", "")

    if not _verify_calcom_signature(raw_body, signature):
        raise HTTPException(
            status_code=401,
            detail={"error": {"code": "INVALID_SIGNATURE", "message": "Webhook signature invalid."}},
        )

    try:
        data = json.loads(raw_body)
        trigger = data.get("triggerEvent", "")
        booking_payload = data.get("payload", {})

        calcom_id = str(booking_payload.get("id") or booking_payload.get("bookingId") or "")
        if not calcom_id:
            logger.warning("Cal.com webhook missing booking id, trigger=%s", trigger)
            return {"received": True}

        attendee = (booking_payload.get("attendees") or [{}])[0]
        attendee_email = attendee.get("email", "")
        attendee_name = attendee.get("name", "")

        existing = (
            await db.execute(
                select(Booking).where(Booking.calcom_booking_id == calcom_id)
            )
        ).scalar_one_or_none()

        if trigger == "BOOKING_CREATED":
            if existing is None:
                booking = Booking(
                    calcom_booking_id=calcom_id,
                    calcom_uid=booking_payload.get("uid"),
                    attendee_email=attendee_email,
                    attendee_name=attendee_name,
                    attendee_email_hash=_hash_email(attendee_email) if attendee_email else None,
                    event_type_slug=booking_payload.get("eventTypeSlug")
                    or booking_payload.get("type"),
                    start_time=_parse_dt(booking_payload.get("startTime")),
                    end_time=_parse_dt(booking_payload.get("endTime")),
                    status="confirmed",
                    meeting_url=(booking_payload.get("metadata") or {}).get("videoCallUrl"),
                    raw_payload=booking_payload,
                )
                db.add(booking)
                await db.flush()
                logger.info("[booking:%s] BOOKING_CREATED persisted", booking.id)
            else:
                logger.info("[booking:%s] BOOKING_CREATED duplicate, skipping insert", existing.id)

            await send_consultation_confirmed(
                recipient_email=attendee_email,
                attendee_name=attendee_name,
                start_time=booking_payload.get("startTime", ""),
                meeting_url=(booking_payload.get("metadata") or {}).get("videoCallUrl", ""),
            )

        elif trigger == "BOOKING_CANCELLED":
            if existing is not None:
                existing.status = "cancelled"
                existing.raw_payload = booking_payload
                logger.info("[booking:%s] BOOKING_CANCELLED", existing.id)
            else:
                logger.warning("BOOKING_CANCELLED for unknown calcom_id=%s", calcom_id)

        elif trigger == "BOOKING_RESCHEDULED":
            if existing is not None:
                existing.start_time = _parse_dt(booking_payload.get("startTime"))
                existing.end_time = _parse_dt(booking_payload.get("endTime"))
                existing.status = "rescheduled"
                existing.raw_payload = booking_payload
                logger.info("[booking:%s] BOOKING_RESCHEDULED", existing.id)
            else:
                logger.warning("BOOKING_RESCHEDULED for unknown calcom_id=%s", calcom_id)

        else:
            logger.info("Cal.com webhook unhandled trigger=%s", trigger)

    except Exception as exc:
        logger.error("Cal.com webhook processing error: %s", exc)

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
