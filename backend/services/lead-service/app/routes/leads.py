import asyncio
import hashlib
import logging
import os
import uuid
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query, Request, status
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.limiter import limiter
from app.models.lead import Lead
from app.schemas.lead import (
    LeadResponse,
    LeadStatusUpdate,
    LeadSubmitRequest,
    LeadSubmitResponse,
)
from app.services.hubspot import create_hubspot_contact_and_deal
from app.services.redis_streams import enqueue_hubspot_retry, publish_lead_received
from shared.auth.middleware import require_auth
from shared.database.connection import get_db

logger = logging.getLogger(__name__)

IP_HASH_SALT = os.environ.get("IP_HASH_SALT", "changeme-set-this-in-railway")

router = APIRouter(tags=["leads"])


def _hash_ip(ip: str) -> str:
    return hashlib.sha256(f"{IP_HASH_SALT}{ip}".encode()).hexdigest()


@router.post(
    "/leads/submit",
    status_code=status.HTTP_201_CREATED,
    response_model=LeadSubmitResponse,
)
@limiter.limit("5/hour")
async def submit_lead(
    request: Request,
    body: LeadSubmitRequest,
    db: AsyncSession = Depends(get_db),
) -> LeadSubmitResponse:
    ip = request.client.host if request.client else "unknown"
    user_agent = request.headers.get("user-agent", "")

    lead = Lead(
        id=uuid.uuid4(),
        name=body.name,
        email=body.email,
        company=body.company,
        title=body.title,
        message=body.message,
        source_page=body.source_page,
        service_interest=body.service_interest,
        utm_source=body.utm_source,
        utm_medium=body.utm_medium,
        utm_campaign=body.utm_campaign,
        ip_hash=_hash_ip(ip),
        user_agent=user_agent,
        status="new",
    )

    db.add(lead)
    await db.flush()  # assigns PK; still in transaction
    lead_id = str(lead.id)

    async def _hubspot_task() -> None:
        contact_id, deal_id = await create_hubspot_contact_and_deal(
            lead_id=lead_id,
            name=body.name,
            email=body.email,
            company=body.company,
            title=body.title,
            message=body.message,
            service_interest=body.service_interest,
        )
        if contact_id:
            lead.hubspot_contact_id = contact_id
        if deal_id:
            lead.hubspot_deal_id = deal_id

    async def _redis_task() -> None:
        await publish_lead_received(
            lead_id=lead_id,
            name=body.name,
            email=body.email,
            company=body.company,
            service_interest=body.service_interest,
        )

    results = await asyncio.gather(_hubspot_task(), _redis_task(), return_exceptions=True)

    if isinstance(results[0], Exception):
        logger.error("[lead:%s] HubSpot failed: %s", lead_id, results[0])
        await enqueue_hubspot_retry(lead_id)

    if isinstance(results[1], Exception):
        logger.error("[lead:%s] Redis stream publish failed: %s", lead_id, results[1])

    return LeadSubmitResponse(
        id=lead.id,
        status="received",
        message="Thank you — a member of our team will be in touch within one business day.",
    )


@router.get("/leads", response_model=dict)
async def list_leads(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    lead_status: Optional[str] = Query(None, alias="status"),
    db: AsyncSession = Depends(get_db),
    _user: dict = Depends(require_auth(["admin"])),
) -> dict:
    offset = (page - 1) * limit
    base_q = select(Lead)
    count_q = select(func.count(Lead.id))

    if lead_status:
        base_q = base_q.where(Lead.status == lead_status)
        count_q = count_q.where(Lead.status == lead_status)

    total = (await db.execute(count_q)).scalar_one()
    rows = (
        await db.execute(
            base_q.order_by(Lead.created_at.desc()).offset(offset).limit(limit)
        )
    ).scalars().all()

    return {
        "data": [LeadResponse.model_validate(r).model_dump() for r in rows],
        "meta": {"page": page, "limit": limit, "total": total},
    }


@router.get("/leads/{lead_id}", response_model=dict)
async def get_lead(
    lead_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    _user: dict = Depends(require_auth(["admin"])),
) -> dict:
    lead = (
        await db.execute(select(Lead).where(Lead.id == lead_id))
    ).scalar_one_or_none()

    if lead is None:
        raise HTTPException(
            status_code=404,
            detail={"error": {"code": "NOT_FOUND", "message": "Lead not found."}},
        )

    return {"data": LeadResponse.model_validate(lead).model_dump()}


@router.patch("/leads/{lead_id}/status", response_model=dict)
async def update_lead_status(
    lead_id: uuid.UUID,
    body: LeadStatusUpdate,
    db: AsyncSession = Depends(get_db),
    _user: dict = Depends(require_auth(["admin"])),
) -> dict:
    lead = (
        await db.execute(select(Lead).where(Lead.id == lead_id))
    ).scalar_one_or_none()

    if lead is None:
        raise HTTPException(
            status_code=404,
            detail={"error": {"code": "NOT_FOUND", "message": "Lead not found."}},
        )

    lead.status = body.status
    await db.flush()

    return {"data": LeadResponse.model_validate(lead).model_dump()}
