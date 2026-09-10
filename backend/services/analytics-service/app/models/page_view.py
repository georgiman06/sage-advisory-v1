import uuid

from sqlalchemy import Index, String, func
from sqlalchemy.dialects.postgresql import TIMESTAMP, UUID
from sqlalchemy.orm import Mapped, mapped_column

from shared.database.base import Base


class PageView(Base):
    """One row per valid (non-bot, non-asset) page view."""

    __tablename__ = "page_views"
    __table_args__ = (
        Index("ix_page_views_path", "path"),
        Index("ix_page_views_vid", "vid"),
        Index("ix_page_views_sid", "sid"),
        Index("ix_page_views_created_at", "created_at"),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    vid: Mapped[str] = mapped_column(String(64), nullable=False)
    sid: Mapped[str] = mapped_column(String(64), nullable=False)
    path: Mapped[str] = mapped_column(String(500), nullable=False)
    user_agent: Mapped[str | None] = mapped_column(String(500))
    created_at: Mapped[str | None] = mapped_column(
        TIMESTAMP(timezone=True), server_default=func.now()
    )
