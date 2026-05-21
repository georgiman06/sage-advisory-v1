import asyncio
import logging
import os
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from app.routes.webhooks import router as webhooks_router
from app.worker import worker_loop

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(name)s %(levelname)s %(message)s",
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    worker_task = asyncio.create_task(worker_loop())
    logger.info("notification-service starting — worker task created")
    try:
        yield
    finally:
        worker_task.cancel()
        try:
            await worker_task
        except asyncio.CancelledError:
            pass
        logger.info("notification-service stopped")


app = FastAPI(
    title="Sage Consulting — Notification Service",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)


@app.get("/health", tags=["ops"])
async def health():
    return {"status": "ok", "service": "notification-service"}


app.include_router(webhooks_router, prefix="/api")
