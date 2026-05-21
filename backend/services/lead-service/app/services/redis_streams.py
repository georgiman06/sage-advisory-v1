import logging
import os

import redis.asyncio as aioredis

logger = logging.getLogger(__name__)

REDIS_URL = os.environ.get("REDIS_URL", "redis://localhost:6379")
HUBSPOT_RETRY_QUEUE = "lead:hubspot_retry"
LEAD_STREAM = "stream:lead_received"


async def publish_lead_received(
    *,
    lead_id: str,
    name: str,
    email: str,
    company: str,
    service_interest: str | None,
) -> None:
    r = aioredis.from_url(REDIS_URL, decode_responses=True)
    try:
        await r.xadd(
            LEAD_STREAM,
            {
                "lead_id": lead_id,
                "name": name,
                "email": email,
                "company": company,
                "service_interest": service_interest or "",
            },
        )
        logger.info("[lead:%s] Published to %s", lead_id, LEAD_STREAM)
    finally:
        await r.aclose()


async def enqueue_hubspot_retry(lead_id: str) -> None:
    r = aioredis.from_url(REDIS_URL, decode_responses=True)
    try:
        await r.rpush(HUBSPOT_RETRY_QUEUE, lead_id)
        logger.info("[lead:%s] Added to HubSpot retry queue", lead_id)
    except Exception as exc:
        logger.error("[lead:%s] Failed to enqueue HubSpot retry: %s", lead_id, exc)
    finally:
        await r.aclose()
