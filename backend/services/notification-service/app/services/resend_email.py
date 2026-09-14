import logging
import os

import resend

logger = logging.getLogger(__name__)

RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "")
RESEND_FROM_EMAIL = os.environ.get("RESEND_FROM_EMAIL", "Sage Advisory <advisorysage@gmail.com>")
INTERNAL_ALERT_EMAIL = os.environ.get("INTERNAL_ALERT_EMAIL", "strategy@sageconsulting.com")

resend.api_key = RESEND_API_KEY


def _send(to_email: str, subject: str, html: str, context: str) -> None:
    if not RESEND_API_KEY:
        logger.warning("RESEND_API_KEY not set — skipping %s", context)
        return
    try:
        resend.Emails.send(
            {
                "from": RESEND_FROM_EMAIL,
                "to": [to_email],
                "subject": subject,
                "html": html,
            }
        )
        logger.info("%s sent", context)
    except Exception as exc:
        logger.error("%s failed: %s: %s", context, type(exc).__name__, exc)
        raise


async def send_internal_alert(
    *,
    lead_id: str,
    name: str,
    email: str,
    company: str,
    service_interest: str,
    message: str = "",
) -> None:
    if not RESEND_API_KEY:
        logger.warning("Resend not configured — skipping internal alert for lead_id=%s", lead_id)
        return

    html = f"""
    <h2>New lead received</h2>
    <p><strong>Name:</strong> {name}</p>
    <p><strong>Email:</strong> {email}</p>
    <p><strong>Company:</strong> {company}</p>
    <p><strong>Interested in:</strong> {service_interest or "—"}</p>
    <p><strong>Message:</strong><br/>{(message or "—").replace(chr(10), "<br/>")}</p>
    <p style="color:#888;font-size:12px;">Lead ID: {lead_id}</p>
    """
    _send(
        INTERNAL_ALERT_EMAIL,
        f"New lead: {name} ({company})",
        html,
        f"internal-alert lead_id={lead_id}",
    )


async def send_lead_autoreply(*, name: str, email: str) -> None:
    if not RESEND_API_KEY:
        logger.warning("Resend not configured — skipping auto-reply")
        return

    first_name = name.split()[0] if name else "there"
    html = f"""
    <p>Hi {first_name},</p>
    <p>Thanks for reaching out to Sage Advisory — a member of our team will be in touch within one business day.</p>
    <p>— Sage Advisory</p>
    """
    _send(email, "Thanks for reaching out to Sage Advisory", html, "lead-autoreply")


async def send_deliverable_uploaded(*, recipient_email: str, engagement_title: str, file_name: str) -> None:
    if not RESEND_API_KEY:
        return
    html = f"""
    <p>A new file, <strong>{file_name}</strong>, has been uploaded to your engagement
    "<strong>{engagement_title}</strong>".</p>
    """
    _send(recipient_email, f"New deliverable for {engagement_title}", html, "deliverable-uploaded")


async def send_milestone_updated(
    *, recipient_email: str, engagement_title: str, milestone_title: str, milestone_status: str
) -> None:
    if not RESEND_API_KEY:
        return
    html = f"""
    <p>The milestone <strong>{milestone_title}</strong> for <strong>{engagement_title}</strong>
    is now <strong>{milestone_status}</strong>.</p>
    """
    _send(recipient_email, f"Milestone update: {milestone_title}", html, "milestone-updated")


async def send_consultation_confirmed(
    *, recipient_email: str, attendee_name: str, start_time: str, meeting_url: str
) -> None:
    if not RESEND_API_KEY:
        return
    html = f"""
    <p>Hi {attendee_name},</p>
    <p>Your consultation is confirmed for <strong>{start_time}</strong>.</p>
    <p>Meeting link: <a href="{meeting_url}">{meeting_url}</a></p>
    """
    _send(recipient_email, "Your consultation is confirmed", html, "consultation-confirmed")
