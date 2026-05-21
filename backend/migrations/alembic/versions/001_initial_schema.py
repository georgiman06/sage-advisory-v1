"""initial schema — leads and email_events tables

Revision ID: 001
Revises:
Create Date: 2026-05-21 00:00:00.000000
"""
from typing import Sequence, Union

from alembic import op

revision: str = "001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("""
        CREATE TABLE IF NOT EXISTS leads (
            id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name            VARCHAR(255)  NOT NULL,
            email           VARCHAR(255)  NOT NULL,
            company         VARCHAR(255)  NOT NULL,
            title           VARCHAR(255),
            message         TEXT          NOT NULL,
            source_page     VARCHAR(500),
            service_interest VARCHAR(255),
            utm_source      VARCHAR(255),
            utm_medium      VARCHAR(255),
            utm_campaign    VARCHAR(255),
            ip_hash         VARCHAR(64),
            user_agent      TEXT,
            status          VARCHAR(50)   NOT NULL DEFAULT 'new',
            hubspot_contact_id VARCHAR(100),
            hubspot_deal_id    VARCHAR(100),
            created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
            updated_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW()
        )
    """)
    op.execute("CREATE INDEX IF NOT EXISTS idx_leads_email      ON leads(email)")
    op.execute("CREATE INDEX IF NOT EXISTS idx_leads_status     ON leads(status)")
    op.execute("CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at)")

    op.execute("""
        CREATE TABLE IF NOT EXISTS email_events (
            id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            event_type            VARCHAR(100),
            recipient_email_hash  VARCHAR(64),
            sendgrid_message_id   VARCHAR(255),
            status                VARCHAR(50),
            metadata              JSONB,
            created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
    """)


def downgrade() -> None:
    op.execute("DROP TABLE IF EXISTS email_events")
    op.execute("DROP INDEX IF EXISTS idx_leads_created_at")
    op.execute("DROP INDEX IF EXISTS idx_leads_status")
    op.execute("DROP INDEX IF EXISTS idx_leads_email")
    op.execute("DROP TABLE IF EXISTS leads")
