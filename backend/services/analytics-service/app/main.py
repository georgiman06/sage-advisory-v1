import logging
import os
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from uvicorn.middleware.proxy_headers import ProxyHeadersMiddleware

from app.limiter import limiter
from app.routes.stats import router as stats_router
from app.routes.track import router as track_router

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(name)s %(levelname)s %(message)s",
)
logger = logging.getLogger(__name__)

CORS_ORIGINS = [o.strip() for o in os.environ.get("CORS_ORIGINS", "*").split(",")]

# Railway (and most PaaS load balancers) terminate TLS and proxy requests
# internally, so the raw ASGI connection is from the proxy, not the visitor.
# TRUSTED_PROXY_HOSTS="*" trusts the X-Forwarded-For/X-Forwarded-Proto headers
# set by that proxy so request.client.host reflects the real visitor IP.
TRUSTED_PROXY_HOSTS = os.environ.get("TRUSTED_PROXY_HOSTS", "*")


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("analytics-service starting")
    yield
    logger.info("analytics-service stopping")


app = FastAPI(
    title="Sage Consulting — Analytics Service",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(
    request: Request, exc: RequestValidationError
) -> JSONResponse:
    errors = exc.errors()
    first = errors[0] if errors else {}
    loc = first.get("loc", [])
    field = ".".join(str(x) for x in loc[1:]) if len(loc) > 1 else None
    return JSONResponse(
        status_code=400,
        content={
            "error": {
                "code": "VALIDATION_ERROR",
                "message": str(first.get("msg", "Validation failed.")),
                "field": field,
            }
        },
    )


@app.get("/health", tags=["ops"])
async def health():
    return {"status": "ok", "service": "analytics-service"}


app.include_router(track_router, prefix="/api")
app.include_router(stats_router, prefix="/admin")

# `app` stays the plain FastAPI instance (tests/dependency_overrides need
# this). `application` is the ASGI entrypoint actually served — it wraps
# `app` so X-Forwarded-For/X-Forwarded-Proto from Railway's edge proxy are
# trusted and downstream code sees the visitor's real connection details.
application = ProxyHeadersMiddleware(app, trusted_hosts=TRUSTED_PROXY_HOSTS)
