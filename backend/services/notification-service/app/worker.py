"""
Redis Streams consumer for the notification service.
Runs as a background asyncio task alongside the FastAPI webhook server.
"""
import asyncio
import json
import logging
import os

import redis.asyncio as aioredis

from app.services.sendgrid import send_internal_alert, send_lead_autoreply

logger = logging.getLogger(__name__)

REDIS_URL = os.environ.get("REDIS_URL", "redis://localhost:6379")
CONSUMER_GROUP = os.environ.get("REDIS_CONSUMER_GROUP", "notification-service")
CONSUMER_NAME = os.environ.get("HOSTNAME", "notification-worker-1")

STREAMS = ["stream:lead_received"]
DEAD_LETTER_STREAM = "stream:notification_dead_letter"
MAX_RETRIES = 3
BLOCK_MS = 5000


async def _ensure_groups(r: aioredis.Redis) -> None:
    for stream in STREAMS:
        try:
            await r.xgroup_create(stream, CONSUMER_GROUP, id="0", mkstream=True)
            logger.info("Consumer group '%s' created for stream '%s'", CONSUMER_GROUP, stream)
        except aioredis.ResponseError as exc:
            if "BUSYGROUP" not in str(exc):
                raise


async def _handle_lead_received(message_id: str, data: dict, r: aioredis.Redis) -> None:
    lead_id = data.get("lead_id", "unknown")
    name = data.get("name", "")
    email = data.get("email", "")
    company = data.get("company", "")
    service_interest = data.get("service_interest", "")

    await asyncio.gather(
        send_internal_alert(
            lead_id=lead_id,
            name=name,
            email=email,
            company=company,
            service_interest=service_interest,
        ),
        send_lead_autoreply(name=name, email=email),
    )
    logger.info("Handled lead_received lead_id=%s", lead_id)


HANDLERS = {
    "stream:lead_received": _handle_lead_received,
}


async def worker_loop() -> None:
    r = aioredis.from_url(REDIS_URL, decode_responses=True)
    await _ensure_groups(r)

    retry_counts: dict[str, int] = {}

    logger.info("Notification worker started. Consuming: %s", STREAMS)

    while True:
        try:
            results = await r.xreadgroup(
                CONSUMER_GROUP,
                CONSUMER_NAME,
                {stream: ">" for stream in STREAMS},
                count=10,
                block=BLOCK_MS,
            )

            if not results:
                continue

            for stream_name, messages in results:
                handler = HANDLERS.get(stream_name)
                if handler is None:
                    logger.warning("No handler registered for stream: %s", stream_name)
                    continue

                for message_id, data in messages:
                    try:
                        await handler(message_id, data, r)
                        await r.xack(stream_name, CONSUMER_GROUP, message_id)
                        retry_counts.pop(message_id, None)

                    except Exception as exc:
                        retries = retry_counts.get(message_id, 0) + 1
                        retry_counts[message_id] = retries
                        logger.error(
                            "Handler failed for %s (attempt %d/%d): %s",
                            message_id, retries, MAX_RETRIES, exc,
                        )

                        if retries >= MAX_RETRIES:
                            try:
                                await r.xadd(
                                    DEAD_LETTER_STREAM,
                                    {
                                        "original_stream": stream_name,
                                        "message_id": message_id,
                                        "error": str(exc),
                                        "data": json.dumps(data),
                                    },
                                )
                                await r.xack(stream_name, CONSUMER_GROUP, message_id)
                                retry_counts.pop(message_id, None)
                                logger.warning(
                                    "Message %s dead-lettered after %d retries",
                                    message_id, retries,
                                )
                            except Exception as dl_exc:
                                logger.error("Dead-letter write failed: %s", dl_exc)

        except aioredis.ConnectionError as exc:
            logger.error("Redis connection lost: %s — retrying in 5s", exc)
            await asyncio.sleep(5)
        except asyncio.CancelledError:
            logger.info("Worker loop cancelled — shutting down")
            break
        except Exception as exc:
            logger.error("Unexpected worker error: %s — retrying in 1s", exc)
            await asyncio.sleep(1)

    await r.aclose()
