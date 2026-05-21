import asyncio
import importlib.util
import os
import sys
from logging.config import fileConfig
from pathlib import Path

from alembic import context
from sqlalchemy import pool
from sqlalchemy.ext.asyncio import create_async_engine

# Add project root to path so `shared` package is importable
PROJECT_ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(PROJECT_ROOT))

from shared.database.base import Base  # noqa: E402


def _load_module_from_path(name: str, path: Path):
    """Load a Python module from a file path — handles dirs with dashes in name."""
    spec = importlib.util.spec_from_file_location(name, str(path))
    mod = importlib.util.module_from_spec(spec)
    sys.modules[name] = mod
    spec.loader.exec_module(mod)
    return mod


# Import ORM models so Alembic autogenerate can detect them
_load_module_from_path(
    "lead_model",
    PROJECT_ROOT / "services" / "lead-service" / "app" / "models" / "lead.py",
)
_load_module_from_path(
    "email_event_model",
    PROJECT_ROOT / "services" / "notification-service" / "app" / "models" / "email_event.py",
)
_load_module_from_path(
    "booking_model",
    PROJECT_ROOT / "services" / "notification-service" / "app" / "models" / "booking.py",
)

config = context.config

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = Base.metadata


def get_url() -> str:
    return (
        os.environ.get("DATABASE_URL")
        or config.get_main_option("sqlalchemy.url")
        or ""
    )


def run_migrations_offline() -> None:
    url = get_url()
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()


def _do_run_migrations(connection) -> None:
    context.configure(connection=connection, target_metadata=target_metadata)
    with context.begin_transaction():
        context.run_migrations()


async def run_migrations_online() -> None:
    url = get_url()
    connectable = create_async_engine(url, poolclass=pool.NullPool)
    async with connectable.connect() as connection:
        await connection.run_sync(_do_run_migrations)
    await connectable.dispose()


if context.is_offline_mode():
    run_migrations_offline()
else:
    asyncio.run(run_migrations_online())
