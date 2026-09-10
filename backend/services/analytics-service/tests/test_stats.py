import uuid

from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.page_view import PageView


async def _seed(db_session: AsyncSession, path: str, vid: str, sid: str) -> None:
    db_session.add(PageView(id=uuid.uuid4(), vid=vid, sid=sid, path=path))
    await db_session.flush()


async def test_stats_requires_auth(client: AsyncClient):
    resp = await client.get("/admin/stats")
    assert resp.status_code in (401, 403)


async def test_stats_aggregates_correctly(client: AsyncClient, db_session: AsyncSession):
    from app.main import app
    from app.routes.stats import require_admin

    async def _fake_admin():
        return {"user_id": "u1", "role": "admin", "client_id": None}

    app.dependency_overrides[require_admin] = _fake_admin

    vid_a, vid_b = str(uuid.uuid4()), str(uuid.uuid4())
    sid_a, sid_b, sid_c = str(uuid.uuid4()), str(uuid.uuid4()), str(uuid.uuid4())

    await _seed(db_session, "/", vid_a, sid_a)
    await _seed(db_session, "/", vid_a, sid_a)
    await _seed(db_session, "/about", vid_a, sid_b)
    await _seed(db_session, "/about", vid_b, sid_c)
    await _seed(db_session, "/contact", vid_b, sid_c)

    resp = await client.get("/admin/stats")
    app.dependency_overrides.clear()

    assert resp.status_code == 200
    data = resp.json()["data"]
    assert data["total_page_views"] == 5
    assert data["unique_visitors"] == 2
    assert data["total_sessions"] == 3
    top = {p["path"]: p["views"] for p in data["top_pages"]}
    assert top["/"] == 2
    assert top["/about"] == 2
    assert top["/contact"] == 1
