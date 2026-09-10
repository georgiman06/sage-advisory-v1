import uuid

from httpx import AsyncClient
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.page_view import PageView


async def test_track_page_view_recorded(client: AsyncClient, db_session: AsyncSession):
    resp = await client.post(
        "/api/track",
        json={"vid": str(uuid.uuid4()), "sid": str(uuid.uuid4()), "path": "/about"},
        headers={"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"},
    )
    assert resp.status_code == 202
    assert resp.json()["status"] == "recorded"

    rows = (await db_session.execute(select(PageView))).scalars().all()
    assert len(rows) == 1
    assert rows[0].path == "/about"


async def test_track_ignores_bot_user_agent(client: AsyncClient, db_session: AsyncSession):
    resp = await client.post(
        "/api/track",
        json={"vid": str(uuid.uuid4()), "sid": str(uuid.uuid4()), "path": "/"},
        headers={"user-agent": "Googlebot/2.1 (+http://www.google.com/bot.html)"},
    )
    assert resp.status_code == 202
    assert resp.json()["status"] == "ignored"

    rows = (await db_session.execute(select(PageView))).scalars().all()
    assert len(rows) == 0


async def test_track_ignores_asset_path(client: AsyncClient, db_session: AsyncSession):
    resp = await client.post(
        "/api/track",
        json={"vid": str(uuid.uuid4()), "sid": str(uuid.uuid4()), "path": "/logo.png"},
        headers={"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"},
    )
    assert resp.status_code == 202
    assert resp.json()["status"] == "ignored"

    rows = (await db_session.execute(select(PageView))).scalars().all()
    assert len(rows) == 0


async def test_track_rejects_extra_fields(client: AsyncClient):
    resp = await client.post(
        "/api/track",
        json={
            "vid": str(uuid.uuid4()),
            "sid": str(uuid.uuid4()),
            "path": "/",
            "unexpected": "field",
        },
        headers={"user-agent": "Mozilla/5.0"},
    )
    assert resp.status_code == 400


async def test_track_rejects_blank_path(client: AsyncClient):
    resp = await client.post(
        "/api/track",
        json={"vid": str(uuid.uuid4()), "sid": str(uuid.uuid4()), "path": "  "},
        headers={"user-agent": "Mozilla/5.0"},
    )
    assert resp.status_code == 400
