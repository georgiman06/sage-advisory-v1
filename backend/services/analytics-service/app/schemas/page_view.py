from typing import Optional

from pydantic import BaseModel, ConfigDict, field_validator


class TrackRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    vid: str
    sid: str
    path: str

    @field_validator("vid", "sid", "path")
    @classmethod
    def strip_and_require(cls, v: str) -> str:
        stripped = v.strip()
        if not stripped:
            raise ValueError("must not be blank")
        return stripped

    @field_validator("vid", "sid")
    @classmethod
    def max_id_length(cls, v: str) -> str:
        if len(v) > 64:
            raise ValueError("must be at most 64 characters")
        return v

    @field_validator("path")
    @classmethod
    def max_path_length(cls, v: str) -> str:
        if len(v) > 500:
            raise ValueError("must be at most 500 characters")
        return v


class TrackResponse(BaseModel):
    status: str


class TopPage(BaseModel):
    path: str
    views: int


class StatsResponse(BaseModel):
    total_page_views: int
    unique_visitors: int
    total_sessions: int
    top_pages: list[TopPage]


class Empty(BaseModel):
    pass
