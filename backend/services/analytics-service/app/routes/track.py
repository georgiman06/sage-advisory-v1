import logging
import uuid

from fastapi import APIRouter, Depends, Request, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.limiter import limiter
from app.models.page_view import PageView
from app.schemas.page_view import TrackRequest, TrackResponse
from app.services.bot_filter import is_trackable
from shared.database.connection import get_db

logger = logging.getLogger(__name__)

router = APIRouter(tags=["track"])


@router.post(
    "/track",
    status_code=status.HTTP_202_ACCEPTED,
    response_model=TrackResponse,
)
@limiter.limit("120/minute")
async def track_page_view(
    request: Request,
    body: TrackRequest,
    db: AsyncSession = Depends(get_db),
) -> TrackResponse:
    user_agent = request.headers.get("user-agent", "")

    # Defense-in-depth bot/asset filtering — the frontend middleware already
    # filters most of this before ever calling the endpoint. We always
    # respond 202 so the fire-and-forget beacon never surfaces an error.
    if not is_trackable(body.path, user_agent):
        return TrackResponse(status="ignored")

    page_view = PageView(
        id=uuid.uuid4(),
        vid=body.vid,
        sid=body.sid,
        path=body.path,
        user_agent=user_agent[:500] if user_agent else None,
    )
    db.add(page_view)
    await db.flush()

    return TrackResponse(status="recorded")
