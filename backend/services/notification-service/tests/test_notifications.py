import json
import pytest
from unittest.mock import AsyncMock, MagicMock, patch
from httpx import AsyncClient

pytestmark = pytest.mark.asyncio


async def test_health(client: AsyncClient):
    resp = await client.get("/health")
    assert resp.status_code == 200
    assert resp.json() == {"status": "ok", "service": "notification-service"}


async def test_sendgrid_webhook_returns_200(client: AsyncClient):
    payload = [{"event": "delivered", "sg_message_id": "abc123", "email": "test@example.com"}]
    resp = await client.post("/api/notifications/sendgrid-webhook", json=payload)
    assert resp.status_code == 200
    assert resp.json()["received"] is True


async def test_sendgrid_webhook_empty_list(client: AsyncClient):
    resp = await client.post("/api/notifications/sendgrid-webhook", json=[])
    assert resp.status_code == 200


async def test_calendly_webhook_invalid_signature(client: AsyncClient):
    with patch("app.routes.webhooks.CALENDLY_WEBHOOK_SECRET", "supersecret"):
        resp = await client.post(
            "/api/notifications/calendly-webhook",
            content=b'{"event":"invitee.created","payload":{}}',
            headers={
                "content-type": "application/json",
                "calendly-webhook-signature": "t=9999999999,v1=badsignature",
            },
        )
    assert resp.status_code == 401


async def test_calendly_webhook_no_secret_passes(client: AsyncClient):
    with (
        patch("app.routes.webhooks.CALENDLY_WEBHOOK_SECRET", ""),
        patch("app.routes.webhooks.send_consultation_confirmed", new_callable=AsyncMock),
    ):
        resp = await client.post(
            "/api/notifications/calendly-webhook",
            json={
                "event": "invitee.created",
                "payload": {
                    "uri": "https://api.calendly.com/scheduled_events/EVT/invitees/INV",
                    "name": "John",
                    "email": "john@example.com",
                    "scheduled_event": {
                        "uri": "https://api.calendly.com/scheduled_events/EVT",
                        "start_time": "2024-03-01T10:00:00Z",
                        "end_time": "2024-03-01T10:30:00Z",
                        "location": {"join_url": "https://meet.example.com/abc"},
                    },
                },
            },
        )

    assert resp.status_code == 200


async def test_lead_received_handler_calls_sendgrid():
    from unittest.mock import AsyncMock, patch

    mock_r = AsyncMock()
    data = {
        "lead_id": "abc-123",
        "name": "Jane Smith",
        "email": "jane@example.com",
        "company": "Corp",
        "service_interest": "Data Strategy",
    }

    with (
        patch("app.worker.send_internal_alert", new_callable=AsyncMock) as mock_alert,
        patch("app.worker.send_lead_autoreply", new_callable=AsyncMock) as mock_reply,
    ):
        from app.worker import _handle_lead_received
        await _handle_lead_received("msg-1", data, mock_r)

    mock_alert.assert_called_once_with(
        lead_id="abc-123",
        name="Jane Smith",
        email="jane@example.com",
        company="Corp",
        service_interest="Data Strategy",
    )
    mock_reply.assert_called_once_with(name="Jane Smith", email="jane@example.com")


async def test_send_internal_alert_skips_when_not_configured():
    import os
    os.environ.pop("SENDGRID_API_KEY", None)
    os.environ.pop("SENDGRID_TEMPLATE_LEAD_INTERNAL", None)

    from app.services import sendgrid as sg_module
    sg_module.SENDGRID_API_KEY = ""
    sg_module.TEMPLATE_LEAD_INTERNAL = ""

    # Should not raise — just logs a warning
    await sg_module.send_internal_alert(
        lead_id="test-id",
        name="Test",
        email="test@example.com",
        company="TestCo",
        service_interest="",
    )


async def test_send_autoreply_skips_when_not_configured():
    from app.services import sendgrid as sg_module
    sg_module.SENDGRID_API_KEY = ""
    sg_module.TEMPLATE_LEAD_AUTOREPLY = ""

    await sg_module.send_lead_autoreply(name="Test", email="test@example.com")
