import logging
import os

from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import From, Mail, To

logger = logging.getLogger(__name__)

SENDGRID_API_KEY = os.environ.get("SENDGRID_API_KEY", "")
SENDGRID_FROM_EMAIL = os.environ.get("SENDGRID_FROM_EMAIL", "hello@sageconsulting.com")
INTERNAL_ALERT_EMAIL = os.environ.get("INTERNAL_ALERT_EMAIL", "strategy@sageconsulting.com")

TEMPLATE_LEAD_INTERNAL = os.environ.get("SENDGRID_TEMPLATE_LEAD_INTERNAL", "")
TEMPLATE_LEAD_AUTOREPLY = os.environ.get("SENDGRID_TEMPLATE_LEAD_AUTOREPLY", "")
TEMPLATE_DELIVERABLE_UPLOADED = os.environ.get("SENDGRID_TEMPLATE_DELIVERABLE_UPLOADED", "")
TEMPLATE_MILESTONE_UPDATED = os.environ.get("SENDGRID_TEMPLATE_MILESTONE_UPDATED", "")
TEMPLATE_CONSULTATION_CONFIRMED = os.environ.get("SENDGRID_TEMPLATE_CONSULTATION_CONFIRMED", "")
TEMPLATE_WEEKLY_DIGEST = os.environ.get("SENDGRID_TEMPLATE_WEEKLY_DIGEST", "")


def _client() -> SendGridAPIClient:
    return SendGridAPIClient(SENDGRID_API_KEY)


def _build_message(to_email: str, template_id: str, dynamic_data: dict) -> Mail:
    msg = Mail(
        from_email=From(SENDGRID_FROM_EMAIL, "Sage Consulting"),
        to_emails=To(to_email),
    )
    msg.template_id = template_id
    msg.dynamic_template_data = dynamic_data
    return msg


def _send(message: Mail, context: str) -> None:
    response = _client().send(message)
    logger.info("%s sent, status=%s", context, response.status_code)


async def send_internal_alert(
    *,
    lead_id: str,
    name: str,
    email: str,
    company: str,
    service_interest: str,
) -> None:
    if not SENDGRID_API_KEY or not TEMPLATE_LEAD_INTERNAL:
        logger.warning("SendGrid not configured — skipping internal alert for lead_id=%s", lead_id)
        return

    try:
        msg = _build_message(
            INTERNAL_ALERT_EMAIL,
            TEMPLATE_LEAD_INTERNAL,
            {
                "lead_id": lead_id,
                "name": name,
                "email": email,
                "company": company,
                "service_interest": service_interest,
            },
        )
        _send(msg, f"internal-alert lead_id={lead_id}")
    except Exception as exc:
        logger.error("Internal alert failed for lead_id=%s: %s: %s", lead_id, type(exc).__name__, exc)
        raise


async def send_lead_autoreply(*, name: str, email: str) -> None:
    if not SENDGRID_API_KEY or not TEMPLATE_LEAD_AUTOREPLY:
        logger.warning("SendGrid not configured — skipping auto-reply")
        return

    try:
        first_name = name.split()[0] if name else "there"
        msg = _build_message(
            email,
            TEMPLATE_LEAD_AUTOREPLY,
            {"first_name": first_name},
        )
        _send(msg, "lead-autoreply")
    except Exception as exc:
        logger.error("Auto-reply failed: %s: %s", type(exc).__name__, exc)
        raise


async def send_deliverable_uploaded(*, recipient_email: str, engagement_title: str, file_name: str) -> None:
    if not SENDGRID_API_KEY or not TEMPLATE_DELIVERABLE_UPLOADED:
        return
    msg = _build_message(
        recipient_email,
        TEMPLATE_DELIVERABLE_UPLOADED,
        {"engagement_title": engagement_title, "file_name": file_name},
    )
    _send(msg, "deliverable-uploaded")


async def send_milestone_updated(*, recipient_email: str, engagement_title: str, milestone_title: str, milestone_status: str) -> None:
    if not SENDGRID_API_KEY or not TEMPLATE_MILESTONE_UPDATED:
        return
    msg = _build_message(
        recipient_email,
        TEMPLATE_MILESTONE_UPDATED,
        {
            "engagement_title": engagement_title,
            "milestone_title": milestone_title,
            "milestone_status": milestone_status,
        },
    )
    _send(msg, "milestone-updated")


async def send_consultation_confirmed(*, recipient_email: str, attendee_name: str, start_time: str, meeting_url: str) -> None:
    if not SENDGRID_API_KEY or not TEMPLATE_CONSULTATION_CONFIRMED:
        return
    msg = _build_message(
        recipient_email,
        TEMPLATE_CONSULTATION_CONFIRMED,
        {
            "attendee_name": attendee_name,
            "start_time": start_time,
            "meeting_url": meeting_url,
        },
    )
    _send(msg, "consultation-confirmed")
