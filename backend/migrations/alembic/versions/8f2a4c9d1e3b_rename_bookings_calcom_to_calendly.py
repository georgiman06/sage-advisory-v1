"""rename_bookings_calcom_to_calendly

Revision ID: 8f2a4c9d1e3b
Revises: 7a1f9c2e4b8d
Create Date: 2026-09-13 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = '8f2a4c9d1e3b'
down_revision: Union[str, None] = '7a1f9c2e4b8d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.drop_index(op.f('ix_bookings_calcom_uid'), table_name='bookings')
    op.drop_index(op.f('ix_bookings_calcom_booking_id'), table_name='bookings')

    op.alter_column('bookings', 'calcom_booking_id', new_column_name='calendly_invitee_uri', type_=sa.String(length=255))
    op.alter_column('bookings', 'calcom_uid', new_column_name='calendly_event_uri', type_=sa.String(length=255))

    op.create_index(op.f('ix_bookings_calendly_invitee_uri'), 'bookings', ['calendly_invitee_uri'], unique=True)
    op.create_index(op.f('ix_bookings_calendly_event_uri'), 'bookings', ['calendly_event_uri'], unique=False)


def downgrade() -> None:
    op.drop_index(op.f('ix_bookings_calendly_event_uri'), table_name='bookings')
    op.drop_index(op.f('ix_bookings_calendly_invitee_uri'), table_name='bookings')

    op.alter_column('bookings', 'calendly_invitee_uri', new_column_name='calcom_booking_id', type_=sa.String(length=100))
    op.alter_column('bookings', 'calendly_event_uri', new_column_name='calcom_uid', type_=sa.String(length=100))

    op.create_index(op.f('ix_bookings_calcom_booking_id'), 'bookings', ['calcom_booking_id'], unique=True)
    op.create_index(op.f('ix_bookings_calcom_uid'), 'bookings', ['calcom_uid'], unique=False)
