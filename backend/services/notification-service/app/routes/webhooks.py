import hashlib
import hmac
import logging
import os
from typing import Any

from fastapi import APIRouter, HTTPException, Request, status
from pydantic import BaseModel

from app.services.sendgrid import send_consultation_confirmed

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


class CalComWebhookPayload(BaseModel):
    triggerEvent: str
    payload: dict[str, Any]


@router.post("/notifications/cal-webhook", status_code=status.HTTP_200_OK)
async def cal_webhook(request: Request) -> dict:
    raw_body = await request.body()
    signature = request.headers.get("x-cal-signature-256", "")

    if not _verify_calcom_signature(raw_body, signature):
        raise HTTPException(
            status_code=401,
            detail={"error": {"code": "INVALID_SIGNATURE", "message": "Webhook signature invalid."}},
        )

    try:
        import json
        data = json.loads(raw_body)
        trigger = data.get("triggerEvent", "")

        if trigger == "BOOKING_CREATED":
            booking = data.get("payload", {})
            attendee = (booking.get("attendees") or [{}])[0]
            await send_consultation_confirmed(
                recipient_email=attendee.get("email", ""),
                attendee_name=attendee.get("name", ""),
                start_time=booking.get("startTime", ""),
                meeting_url=booking.get("metadata", {}).get("videoCallUrl", ""),
            )
            logger.info("Cal.com BOOKING_CREATED processed")

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
