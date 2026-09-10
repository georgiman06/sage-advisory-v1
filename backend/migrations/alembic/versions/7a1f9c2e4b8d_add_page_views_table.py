"""add_page_views_table

Revision ID: 7a1f9c2e4b8d
Revises: 3d74633b03b6
Create Date: 2026-09-10 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '7a1f9c2e4b8d'
down_revision: Union[str, None] = '3d74633b03b6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'page_views',
        sa.Column('id', sa.UUID(), nullable=False),
        sa.Column('vid', sa.String(length=64), nullable=False),
        sa.Column('sid', sa.String(length=64), nullable=False),
        sa.Column('path', sa.String(length=500), nullable=False),
        sa.Column('user_agent', sa.String(length=500), nullable=True),
        sa.Column('created_at', postgresql.TIMESTAMP(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.PrimaryKeyConstraint('id'),
    )
    op.create_index(op.f('ix_page_views_path'), 'page_views', ['path'], unique=False)
    op.create_index(op.f('ix_page_views_vid'), 'page_views', ['vid'], unique=False)
    op.create_index(op.f('ix_page_views_sid'), 'page_views', ['sid'], unique=False)
    op.create_index(op.f('ix_page_views_created_at'), 'page_views', ['created_at'], unique=False)


def downgrade() -> None:
    op.drop_index(op.f('ix_page_views_created_at'), table_name='page_views')
    op.drop_index(op.f('ix_page_views_sid'), table_name='page_views')
    op.drop_index(op.f('ix_page_views_vid'), table_name='page_views')
    op.drop_index(op.f('ix_page_views_path'), table_name='page_views')
    op.drop_table('page_views')
