"""add_bookings_table

Revision ID: 3d74633b03b6
Revises: 001
Create Date: 2026-05-21 18:44:48.344711

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '3d74633b03b6'
down_revision: Union[str, None] = '001'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'bookings',
        sa.Column('id', sa.UUID(), nullable=False),
        sa.Column('calcom_booking_id', sa.String(length=100), nullable=False),
        sa.Column('calcom_uid', sa.String(length=100), nullable=True),
        sa.Column('attendee_email', sa.String(length=320), nullable=False),
        sa.Column('attendee_name', sa.String(length=255), nullable=True),
        sa.Column('attendee_email_hash', sa.String(length=64), nullable=True),
        sa.Column('event_type_slug', sa.String(length=100), nullable=True),
        sa.Column('start_time', postgresql.TIMESTAMP(timezone=True), nullable=True),
        sa.Column('end_time', postgresql.TIMESTAMP(timezone=True), nullable=True),
        sa.Column('status', sa.String(length=20), nullable=False),
        sa.Column('meeting_url', sa.String(length=500), nullable=True),
        sa.Column('raw_payload', postgresql.JSONB(astext_type=sa.Text()), nullable=True),
        sa.Column('created_at', postgresql.TIMESTAMP(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', postgresql.TIMESTAMP(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.PrimaryKeyConstraint('id'),
    )
    op.create_index(op.f('ix_bookings_attendee_email_hash'), 'bookings', ['attendee_email_hash'], unique=False)
    op.create_index(op.f('ix_bookings_calcom_booking_id'), 'bookings', ['calcom_booking_id'], unique=True)
    op.create_index(op.f('ix_bookings_calcom_uid'), 'bookings', ['calcom_uid'], unique=False)


def downgrade() -> None:
    op.drop_index(op.f('ix_bookings_calcom_uid'), table_name='bookings')
    op.drop_index(op.f('ix_bookings_calcom_booking_id'), table_name='bookings')
    op.drop_index(op.f('ix_bookings_attendee_email_hash'), table_name='bookings')
    op.drop_table('bookings')
