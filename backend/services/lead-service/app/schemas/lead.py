import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, EmailStr, field_validator

VALID_STATUSES = {"new", "contacted", "qualified", "disqualified"}


class LeadSubmitRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    name: str
    email: EmailStr
    company: str
    title: Optional[str] = None
    message: str
    source_page: Optional[str] = None
    service_interest: Optional[str] = None
    utm_source: Optional[str] = None
    utm_medium: Optional[str] = None
    utm_campaign: Optional[str] = None

    @field_validator("name", "company", "message")
    @classmethod
    def strip_and_require(cls, v: str) -> str:
        stripped = v.strip()
        if not stripped:
            raise ValueError("must not be blank")
        return stripped


class LeadSubmitResponse(BaseModel):
    id: uuid.UUID
    status: str
    message: str


class LeadStatusUpdate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    status: str

    @field_validator("status")
    @classmethod
    def valid_status(cls, v: str) -> str:
        if v not in VALID_STATUSES:
            raise ValueError(f"status must be one of {sorted(VALID_STATUSES)}")
        return v


class LeadResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    name: str
    email: str
    company: str
    title: Optional[str]
    message: str
    source_page: Optional[str]
    service_interest: Optional[str]
    utm_source: Optional[str]
    utm_medium: Optional[str]
    utm_campaign: Optional[str]
    status: str
    hubspot_contact_id: Optional[str]
    hubspot_deal_id: Optional[str]
    created_at: Optional[datetime]
    updated_at: Optional[datetime]
