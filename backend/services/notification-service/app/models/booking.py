import uuid
from datetime import datetime

from sqlalchemy import String, func
from sqlalchemy.dialects.postgresql import JSONB, TIMESTAMP, UUID
from sqlalchemy.orm import Mapped, mapped_column

from shared.database.base import Base


class Booking(Base):
    __tablename__ = "bookings"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    calcom_booking_id: Mapped[str] = mapped_column(
        String(100), unique=True, index=True
    )
    calcom_uid: Mapped[str | None] = mapped_column(String(100), index=True)
    attendee_email: Mapped[str] = mapped_column(String(320))
    attendee_name: Mapped[str | None] = mapped_column(String(255))
    attendee_email_hash: Mapped[str | None] = mapped_column(String(64), index=True)
    event_type_slug: Mapped[str | None] = mapped_column(String(100))
    start_time: Mapped[datetime | None] = mapped_column(TIMESTAMP(timezone=True))
    end_time: Mapped[datetime | None] = mapped_column(TIMESTAMP(timezone=True))
    status: Mapped[str] = mapped_column(String(20), default="confirmed")
    meeting_url: Mapped[str | None] = mapped_column(String(500))
    raw_payload: Mapped[dict | None] = mapped_column(JSONB)
    created_at: Mapped[datetime | None] = mapped_column(
        TIMESTAMP(timezone=True), server_default=func.now()
    )
    updated_at: Mapped[datetime | None] = mapped_column(
        TIMESTAMP(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )
