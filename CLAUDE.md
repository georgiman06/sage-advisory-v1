# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Repository Layout

```
project-root/
├── frontend/          Next.js 16 marketing site + contact form
├── backend/
│   ├── services/
│   │   ├── lead-service/          FastAPI — lead capture, HubSpot sync (Phase 1 ✓)
│   │   ├── notification-service/  FastAPI — Redis consumer, SendGrid, webhooks (Phase 1 ✓)
│   │   ├── content-service/       FastAPI — Sanity CMS proxy + cache (Phase 2)
│   │   ├── auth-service/          FastAPI — Auth0 JWT + sessions (Phase 3)
│   │   └── portal-service/        FastAPI — engagements, deliverables, milestones (Phase 3)
│   ├── shared/        Python package shared by all services (auth middleware, DB session)
│   ├── migrations/    Single Alembic project covering all service schemas
│   ├── docker-compose.yml
│   ├── Makefile
│   └── .env.example
├── .github/workflows/ CI (test.yml) + CD (deploy.yml)
└── CLAUDE.md
```

---

## Commands

### Frontend (run from `frontend/`)

```bash
pnpm dev        # dev server → http://localhost:3000
pnpm build      # production build
pnpm lint       # ESLint
```

### Backend (run from `backend/`)

```bash
make dev             # docker-compose up --build (all services + postgres + redis)
make dev-down        # docker-compose down -v

make test-lead       # pytest for lead-service (needs local postgres + redis)
make test-notification

# Single test
cd backend/services/lead-service
PYTHONPATH=/absolute/path/to/backend pytest tests/test_leads.py::test_submit_lead_success -v

make migrate-local   # run Alembic migrations (needs DATABASE_URL env var)
make lint            # ruff check
make format          # ruff format
```

---

## Frontend Architecture

**Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, shadcn/ui (Radix UI)  
**Path alias:** `@/` → `frontend/` root  
**UI primitives:** `frontend/components/ui/` — never edit these; they are shadcn-generated  
**Shared layout:** `frontend/components/shared/header.tsx` + `footer.tsx`. Pass `variant="dark"` on pages with a dark hero, plus the `activePage` prop for nav highlighting.

**API client (`frontend/lib/api.ts`):**
- `NEXT_PUBLIC_API_URL` — client-side calls (e.g. contact form → lead-service at port 8001)
- `INTERNAL_API_URL` — server-side RSC calls (content service, stays within the network)
- All fetch calls go through `apiFetch`; never call `fetch` directly from pages

**Contact form field names** differ from the backend schema: the frontend uses `full_name` / `work_email` while the backend schema uses `name` / `email`. The `submitLead` function in `api.ts` is the bridge — if you rename a backend field, update both the Zod schema and the `LeadPayload` type.

---

## Backend Architecture

### Shared package (`backend/shared/`)

Copied into every service container at `/app/shared/`. All Dockerfiles set `ENV PYTHONPATH=/app` so `from shared.xxx import yyy` resolves. For local test runs, set `PYTHONPATH` to the `backend/` directory (not the repo root):

```bash
PYTHONPATH=/path/to/backend pytest ...
```

**`shared/database/connection.py`** — `get_db` is an async SQLAlchemy session FastAPI dependency. It auto-commits on success and rolls back on exception. Call `session.flush()` inside a route when you need the assigned PK before the route returns; never call `session.commit()` manually.

**`shared/auth/middleware.py`** — `require_auth(roles: list[str])` is a dependency factory:
```python
user: dict = Depends(require_auth(["admin", "consultant"]))
# returns {"user_id": ..., "role": ..., "client_id": ...}
```
Fetches Auth0 JWKS from `https://{AUTH0_DOMAIN}/.well-known/jwks.json`, caches in Redis at `auth0:jwks` for 1 hr, validates RS256 JWT, checks the `https://sageconsulting.com/role` custom claim. Raises 401 for bad token, 403 for wrong role.

### Service conventions

**Rate limiting:** The `Limiter` lives in `app/limiter.py` (not `main.py`) to avoid circular imports. Apply as:
```python
@router.post("/leads/submit")
@limiter.limit("5/hour")
async def submit_lead(request: Request, ...):
```

**Response shapes — always wrap:**
```python
{"data": ..., "meta": {"page": 1, "limit": 10, "total": 47}}   # paginated list
{"data": ...}                                                    # single resource
{"error": {"code": "SOME_CODE", "message": "...", "field": "..."}}  # errors
```

**Third-party failure policy:** The DB write must succeed before any 2xx is returned. HubSpot and Redis stream publish run via `asyncio.gather(return_exceptions=True)` — failures are logged and queued for retry, never surfaced as 5xx to the caller.

**PII in logs:** Log UUIDs only (e.g. `[lead:{id}]`). Never log email, name, or phone.

**Pydantic models:** All request bodies use `model_config = ConfigDict(extra="forbid")`.

### `lead-service` specifics

- `POST /api/leads/submit`: flush the ORM lead to get its UUID, then `asyncio.gather` HubSpot + Redis publish. On HubSpot failure, enqueue to `lead:hubspot_retry` Redis list.
- Admin endpoints require `require_auth(["admin"])`.

### `notification-service` specifics

- `worker_loop()` starts as an `asyncio.create_task` inside FastAPI lifespan — the same process is both HTTP server (webhooks) and Redis consumer.
- Consumer group: `notification-service`. Stream: `stream:lead_received`. Dead-letters to `stream:notification_dead_letter` after 3 retries.
- All SendGrid calls go through `backend/services/notification-service/app/services/sendgrid.py` only.
- To add a new stream: append to `STREAMS` in `worker.py`, add a `_handle_{event}` function, add it to `HANDLERS`.

### Alembic migrations (`backend/migrations/alembic/`)

One Alembic project covers all service schemas. `env.py` uses `importlib.util` to load ORM models from directories with dashes in their names. When adding a new service model, add an `_load_module_from_path` call in `env.py`.

Run from `backend/`:
```bash
# Generate
alembic -c migrations/alembic/alembic.ini revision --autogenerate -m "add_clients_table"
# Apply
alembic -c migrations/alembic/alembic.ini upgrade head
```

### Docker / Railway

Each Dockerfile's **build context is `backend/`** — not the repo root and not the service subdirectory. In Railway dashboard, set each service's **Root Directory to `backend/`**; the `dockerfilePath` in `railway.json` is then relative to `backend/` (e.g. `services/lead-service/Dockerfile`).

The Dockerfile structure:
```dockerfile
COPY services/lead-service/requirements.txt .   # relative to backend/
COPY shared/ ./shared/                           # relative to backend/
COPY services/lead-service/app/ ./app/
ENV PYTHONPATH=/app
```

`docker-compose.yml` sets `context: .` from within `backend/`, so the same paths apply locally.

### Environment variables

All values come from Railway environment variables (production) or `backend/.env.example` (reference). `DATABASE_URL` must use the `postgresql+asyncpg://` driver prefix for async SQLAlchemy.

---

## Testing

Each service's `conftest.py` overrides the `get_db` dependency with a test session and creates schema via `Base.metadata.create_all`. **All ORM models must be imported in `conftest.py`** before `create_all` runs or their tables won't be created.

Patch module-level constants with `patch()`, not `os.environ`:
```python
# Correct
patch("app.routes.webhooks.CALCOM_WEBHOOK_SECRET", "test-secret")
patch("app.routes.leads.create_hubspot_contact_and_deal", new_callable=AsyncMock)

# Wrong — module constant is already evaluated at import time
os.environ["CALCOM_WEBHOOK_SECRET"] = "test-secret"
```

---

## Build Phases

- **Phase 1 (complete):** `lead-service` + `notification-service` (lead stream only)
- **Phase 2:** `content-service` — Sanity GROQ proxy, Redis caching, cache-purge webhook
- **Phase 3:** `auth-service` + `portal-service` — Auth0, S3 presigned URLs, full audit log
- **Phase 4:** Remaining notification streams, `digest-cron` Railway cron service, Cal.com full wiring

When adding a new service, follow the existing pattern: `app/{main,limiter,models,schemas,routes,services}/`, `Dockerfile`, `railway.json`, `requirements.txt`, `pytest.ini`, `tests/conftest.py`. Register its ORM models in `backend/migrations/alembic/env.py`.
