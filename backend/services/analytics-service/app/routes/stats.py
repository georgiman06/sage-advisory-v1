from fastapi import APIRouter, Depends, Query
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.page_view import PageView
from app.schemas.page_view import StatsResponse, TopPage
from shared.auth.middleware import require_auth
from shared.database.connection import get_db

router = APIRouter(tags=["stats"])

# Named at module level (not inline in the route signature) so tests can
# override this exact dependency object via app.dependency_overrides.
require_admin = require_auth(["admin"])


@router.get("/stats", response_model=dict)
async def get_stats(
    top_pages_limit: int = Query(10, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
    _user: dict = Depends(require_admin),
) -> dict:
    total_page_views = (
        await db.execute(select(func.count(PageView.id)))
    ).scalar_one()

    unique_visitors = (
        await db.execute(select(func.count(func.distinct(PageView.vid))))
    ).scalar_one()

    total_sessions = (
        await db.execute(select(func.count(func.distinct(PageView.sid))))
    ).scalar_one()

    top_pages_rows = (
        await db.execute(
            select(PageView.path, func.count(PageView.id).label("views"))
            .group_by(PageView.path)
            .order_by(func.count(PageView.id).desc())
            .limit(top_pages_limit)
        )
    ).all()

    stats = StatsResponse(
        total_page_views=total_page_views,
        unique_visitors=unique_visitors,
        total_sessions=total_sessions,
        top_pages=[TopPage(path=row.path, views=row.views) for row in top_pages_rows],
    )

    return {"data": stats.model_dump()}
