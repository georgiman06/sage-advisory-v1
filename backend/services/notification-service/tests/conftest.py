import os

import pytest_asyncio
from httpx import ASGITransport, AsyncClient
from unittest.mock import AsyncMock, patch

os.environ.setdefault("REDIS_URL", "redis://localhost:6379")
os.environ.setdefault("SENDGRID_API_KEY", "test-key")
os.environ.setdefault("REDIS_CONSUMER_GROUP", "notification-service-test")


@pytest_asyncio.fixture
async def client():
    # Patch worker_loop so it doesn't actually connect to Redis in tests
    with patch("app.main.worker_loop", new_callable=AsyncMock):
        from app.main import app

        async with AsyncClient(
            transport=ASGITransport(app=app), base_url="http://test"
        ) as ac:
            yield ac
