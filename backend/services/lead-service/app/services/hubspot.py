import logging
import os

import httpx

logger = logging.getLogger(__name__)

HUBSPOT_API_KEY = os.environ.get("HUBSPOT_API_KEY", "")
HUBSPOT_PIPELINE_ID = os.environ.get("HUBSPOT_PIPELINE_ID", "")
HUBSPOT_STAGE_NEW_LEAD = os.environ.get("HUBSPOT_STAGE_NEW_LEAD", "")
HUBSPOT_BASE_URL = "https://api.hubapi.com"


def _auth_headers() -> dict:
    return {
        "Authorization": f"Bearer {HUBSPOT_API_KEY}",
        "Content-Type": "application/json",
    }


async def _upsert_contact(client: httpx.AsyncClient, name: str, email: str, company: str, title: str | None) -> str:
    parts = name.strip().split(maxsplit=1)
    first = parts[0]
    last = parts[1] if len(parts) > 1 else ""

    contact_payload = {
        "properties": {
            "firstname": first,
            "lastname": last,
            "email": email,
            "company": company,
            "jobtitle": title or "",
        }
    }

    resp = await client.post(
        f"{HUBSPOT_BASE_URL}/crm/v3/objects/contacts",
        json=contact_payload,
        headers=_auth_headers(),
    )

    if resp.status_code == 201:
        return resp.json()["id"]

    if resp.status_code == 409:
        # Contact already exists — search by email
        search_resp = await client.post(
            f"{HUBSPOT_BASE_URL}/crm/v3/objects/contacts/search",
            json={
                "filterGroups": [
                    {
                        "filters": [
                            {"propertyName": "email", "operator": "EQ", "value": email}
                        ]
                    }
                ],
                "limit": 1,
            },
            headers=_auth_headers(),
        )
        search_resp.raise_for_status()
        results = search_resp.json().get("results", [])
        if not results:
            raise ValueError(f"Contact conflict but not found for email lookup")
        return results[0]["id"]

    resp.raise_for_status()
    return resp.json()["id"]


async def _create_deal(client: httpx.AsyncClient, company: str, service_interest: str | None, message: str) -> str:
    deal_name = f"{company} — {service_interest or 'Inbound Inquiry'}"
    deal_payload = {
        "properties": {
            "dealname": deal_name,
            "pipeline": HUBSPOT_PIPELINE_ID,
            "dealstage": HUBSPOT_STAGE_NEW_LEAD,
            "description": message,
        }
    }

    resp = await client.post(
        f"{HUBSPOT_BASE_URL}/crm/v3/objects/deals",
        json=deal_payload,
        headers=_auth_headers(),
    )
    resp.raise_for_status()
    return resp.json()["id"]


async def _associate_contact_deal(client: httpx.AsyncClient, contact_id: str, deal_id: str) -> None:
    resp = await client.put(
        f"{HUBSPOT_BASE_URL}/crm/v4/objects/contacts/{contact_id}/associations/deals/{deal_id}/labels",
        json=[{"associationCategory": "HUBSPOT_DEFINED", "associationTypeId": 3}],
        headers=_auth_headers(),
    )
    resp.raise_for_status()


async def create_hubspot_contact_and_deal(
    *,
    lead_id: str,
    name: str,
    email: str,
    company: str,
    title: str | None,
    message: str,
    service_interest: str | None,
) -> tuple[str | None, str | None]:
    if not HUBSPOT_API_KEY:
        logger.warning("[lead:%s] HubSpot API key not configured — skipping", lead_id)
        return None, None

    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            contact_id = await _upsert_contact(client, name, email, company, title)
            deal_id = await _create_deal(client, company, service_interest, message)
            await _associate_contact_deal(client, contact_id, deal_id)
            logger.info("[lead:%s] HubSpot contact=%s deal=%s", lead_id, contact_id, deal_id)
            return contact_id, deal_id

    except Exception as exc:
        logger.error("[lead:%s] HubSpot error: %s: %s", lead_id, type(exc).__name__, exc)
        raise
