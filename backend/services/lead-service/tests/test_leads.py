import uuid

import pytest
from httpx import AsyncClient
from unittest.mock import AsyncMock, patch

pytestmark = pytest.mark.asyncio


# ---------------------------------------------------------------------------
# Health check
# ---------------------------------------------------------------------------

async def test_health(client: AsyncClient):
    resp = await client.get("/health")
    assert resp.status_code == 200
    assert resp.json() == {"status": "ok", "service": "lead-service"}


# ---------------------------------------------------------------------------
# POST /api/leads/submit — happy path
# ---------------------------------------------------------------------------

async def test_submit_lead_success(client: AsyncClient):
    with (
        patch(
            "app.routes.leads.create_hubspot_contact_and_deal",
            new_callable=AsyncMock,
            return_value=("hs_contact_1", "hs_deal_1"),
        ),
        patch("app.routes.leads.publish_lead_received", new_callable=AsyncMock),
    ):
        resp = await client.post(
            "/api/leads/submit",
            json={
                "name": "Jane Smith",
                "email": "jane@example.com",
                "company": "Acme Corp",
                "message": "Interested in enterprise data strategy.",
            },
        )

    assert resp.status_code == 201
    body = resp.json()
    assert body["status"] == "received"
    assert "Thank you" in body["message"]
    assert uuid.UUID(body["id"])


async def test_submit_lead_with_all_optional_fields(client: AsyncClient):
    with (
        patch(
            "app.routes.leads.create_hubspot_contact_and_deal",
            new_callable=AsyncMock,
            return_value=(None, None),
        ),
        patch("app.routes.leads.publish_lead_received", new_callable=AsyncMock),
    ):
        resp = await client.post(
            "/api/leads/submit",
            json={
                "name": "John Doe",
                "email": "john@bigco.com",
                "company": "BigCo",
                "title": "VP Data",
                "message": "Tell me more about your services.",
                "source_page": "/services",
                "service_interest": "Enterprise Data Strategy",
                "utm_source": "google",
                "utm_medium": "cpc",
                "utm_campaign": "spring-2024",
            },
        )

    assert resp.status_code == 201


# ---------------------------------------------------------------------------
# POST /api/leads/submit — validation errors
# ---------------------------------------------------------------------------

async def test_submit_missing_required_field(client: AsyncClient):
    resp = await client.post(
        "/api/leads/submit",
        json={"name": "Jane", "email": "jane@example.com"},  # missing company + message
    )
    assert resp.status_code == 400
    assert resp.json()["error"]["code"] == "VALIDATION_ERROR"


async def test_submit_invalid_email(client: AsyncClient):
    resp = await client.post(
        "/api/leads/submit",
        json={
            "name": "Jane",
            "email": "not-an-email",
            "company": "Corp",
            "message": "Hi",
        },
    )
    assert resp.status_code == 400


async def test_submit_extra_fields_rejected(client: AsyncClient):
    resp = await client.post(
        "/api/leads/submit",
        json={
            "name": "Jane",
            "email": "jane@example.com",
            "company": "Corp",
            "message": "Hi",
            "injected_field": "evil",
        },
    )
    assert resp.status_code == 400


async def test_submit_blank_name_rejected(client: AsyncClient):
    resp = await client.post(
        "/api/leads/submit",
        json={
            "name": "   ",
            "email": "jane@example.com",
            "company": "Corp",
            "message": "Hi",
        },
    )
    assert resp.status_code == 400


# ---------------------------------------------------------------------------
# POST /api/leads/submit — resilience: third-party failures
# ---------------------------------------------------------------------------

async def test_submit_still_201_when_hubspot_fails(client: AsyncClient):
    with (
        patch(
            "app.routes.leads.create_hubspot_contact_and_deal",
            side_effect=Exception("HubSpot timeout"),
        ),
        patch("app.routes.leads.publish_lead_received", new_callable=AsyncMock),
        patch("app.routes.leads.enqueue_hubspot_retry", new_callable=AsyncMock),
    ):
        resp = await client.post(
            "/api/leads/submit",
            json={
                "name": "Bob Jones",
                "email": "bob@corp.com",
                "company": "Corp",
                "message": "Help needed.",
            },
        )

    assert resp.status_code == 201


async def test_submit_still_201_when_redis_fails(client: AsyncClient):
    with (
        patch(
            "app.routes.leads.create_hubspot_contact_and_deal",
            new_callable=AsyncMock,
            return_value=("c1", "d1"),
        ),
        patch(
            "app.routes.leads.publish_lead_received",
            side_effect=Exception("Redis down"),
        ),
    ):
        resp = await client.post(
            "/api/leads/submit",
            json={
                "name": "Alice",
                "email": "alice@co.com",
                "company": "Co",
                "message": "Query.",
            },
        )

    assert resp.status_code == 201


# ---------------------------------------------------------------------------
# Admin endpoints require authentication
# ---------------------------------------------------------------------------

async def test_list_leads_requires_auth(client: AsyncClient):
    resp = await client.get("/api/leads")
    assert resp.status_code in (401, 403)


async def test_get_lead_requires_auth(client: AsyncClient):
    resp = await client.get(f"/api/leads/{uuid.uuid4()}")
    assert resp.status_code in (401, 403)


async def test_update_status_requires_auth(client: AsyncClient):
    resp = await client.patch(
        f"/api/leads/{uuid.uuid4()}/status", json={"status": "contacted"}
    )
    assert resp.status_code in (401, 403)


# ---------------------------------------------------------------------------
# PATCH /api/leads/{id}/status — status validation
# ---------------------------------------------------------------------------

async def test_invalid_status_rejected():
    from app.schemas.lead import LeadStatusUpdate
    import pytest

    with pytest.raises(Exception):
        LeadStatusUpdate(status="unknown_status")
