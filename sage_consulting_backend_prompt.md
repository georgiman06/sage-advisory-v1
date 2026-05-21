# Sage Consulting — Backend Build Prompt for Claude Code (Railway Deployment)

## Overview & Context

You are building the complete backend for **Sage Consulting**, an enterprise data & AI advisory firm that works with clients at the scale of $6T asset managers and 60,000+ user organizations. There is no existing frontend, no domain, and no live site yet. You are building the backend API from scratch, deployed entirely on **Railway**. The frontend will be built separately later and will connect to this API.

Your job is to produce a clean, production-grade backend that is ready for a future frontend to consume — with well-documented API contracts, consistent response shapes, and no assumptions about the frontend stack.

---

## Tech Stack (Non-Negotiable)

| Layer | Choice | Reason |
|---|---|---|
| API framework | **Python + FastAPI** | Aligns with firm's Python/data engineering expertise; async-native; auto-generates OpenAPI docs |
| Primary database | **PostgreSQL 15+** | Railway-managed Postgres plugin; relational, ACID-compliant for leads, clients, projects |
| Cache / sessions | **Redis** | Railway-managed Redis plugin; session tokens, API response caching, rate limiting |
| File storage | **AWS S3** | Deliverables, proposals, reports — Railway has no object storage; S3 is the standard |
| Auth | **Auth0** | Enterprise SSO/SAML, RBAC, supports Okta/Microsoft IdP federation for enterprise clients |
| CMS | **Sanity.io** (headless) | Non-engineers can update content; GROQ query API; CDN-backed image pipeline |
| Transactional email | **SendGrid** | Reliable deliverability, Dynamic Templates, event webhooks |
| Marketing email | **HubSpot** | CRM + email in one; enterprise clients recognise it |
| CRM | **HubSpot CRM** | Integrated with marketing email; contact/deal pipeline management |
| Scheduling | **Cal.com** (cloud) | Open-source Calendly alternative; webhook support |
| Deployment | **Railway** | All services deployed as Railway services within one project |
| Containerisation | **Docker** | Each service has a Dockerfile; Railway builds from it |
| CI/CD | **GitHub Actions → Railway** | Push to `main` triggers Railway deploy via `railway up` |
| Secrets | **Railway Environment Variables** | Set per-service in Railway dashboard or via `railway variables set` |

---

## Railway Project Structure

The entire backend lives in **one Railway project** called `sage-consulting-backend`. Within it, deploy the following Railway services:

| Railway Service Name | Type | Description |
|---|---|---|
| `lead-service` | Web service | Contact form & lead capture API |
| `content-service` | Web service | Sanity CMS proxy + caching |
| `auth-service` | Web service | Auth0 JWT validation + session management |
| `portal-service` | Web service | Client portal API (engagements, deliverables) |
| `notification-service` | Worker service | Redis event consumer, all outbound email |
| `postgres` | Railway Plugin | Shared PostgreSQL database |
| `redis` | Railway Plugin | Shared Redis instance |

Each web service exposes its own Railway-generated public URL (e.g. `lead-service-production.up.railway.app`). Later, when a domain is acquired, these will sit behind a reverse proxy or be consolidated behind a single API gateway.

**Important Railway-specific requirements for every service:**
- Read `PORT` from the environment variable (`os.environ.get("PORT", 8000)`) — Railway assigns the port dynamically
- Bind to `0.0.0.0`, not `127.0.0.1`
- Add a `railway.json` or `Dockerfile` to each service directory for Railway to detect the build
- Health check endpoint at `GET /health` returning `{"status": "ok", "service": "<service-name>"}` — Railway uses this for deployment health checks
- All environment variables are set in Railway dashboard per-service; never hardcode anything

---

## Architecture: Service Breakdown

Build the following five independent services. Each is its own FastAPI application in its own subdirectory of the monorepo.

---

### 1. `lead-service` — Contact Form & Lead Capture

**Purpose:** Handle all inbound contact form submissions from any future frontend. This is the highest-priority service — no lead can ever be lost.

**Endpoints:**

```
GET  /health
POST /api/leads/submit
GET  /api/leads/{lead_id}     (admin only, RBAC-protected)
GET  /api/leads               (admin only, paginated)
PATCH /api/leads/{lead_id}/status  (admin only)
```

**`POST /api/leads/submit` — full spec:**

Request body:
```json
{
  "name": "string (required)",
  "email": "string (required, validated)",
  "company": "string (required)",
  "title": "string (optional)",
  "message": "string (required)",
  "source_page": "string (optional — passed by frontend)",
  "service_interest": "string (optional — e.g. 'Enterprise Data Strategy')",
  "utm_source": "string (optional)",
  "utm_medium": "string (optional)",
  "utm_campaign": "string (optional)"
}
```

Response (201):
```json
{
  "id": "uuid",
  "status": "received",
  "message": "Thank you — a member of our team will be in touch within one business day."
}
```

On receipt, execute all of the following **in parallel** using `asyncio.gather`:

1. **Write to PostgreSQL** — persist the full lead record with timestamp, IP hash (SHA-256 of IP + salt), user agent, source page, and UTM params. Status defaults to `new`.
2. **Create HubSpot contact + deal** — use HubSpot Contacts API v3 to upsert the contact (deduplicate by email), then create a Deal in the "Inbound Inquiries" pipeline at stage "New Lead". Attach all lead fields as deal properties.
3. **Publish `lead_received` event to Redis stream** — the notification-service consumes this and fires both the internal alert email and the prospect auto-reply.

Error handling: PostgreSQL write must succeed before the endpoint returns 201. If HubSpot fails, log the error and add the lead ID to a Redis retry queue (`lead:hubspot_retry`). If Redis event publish fails, log and continue — the lead is already in Postgres. Never return 500 to the caller due to a third-party failure.

Rate limiting: Max 5 submissions per IP per hour via Redis (`slowapi` library with Redis backend).

**Database schema — `leads` table:**
```sql
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    title VARCHAR(255),
    message TEXT NOT NULL,
    source_page VARCHAR(500),
    service_interest VARCHAR(255),
    utm_source VARCHAR(255),
    utm_medium VARCHAR(255),
    utm_campaign VARCHAR(255),
    ip_hash VARCHAR(64),
    user_agent TEXT,
    status VARCHAR(50) DEFAULT 'new',  -- new | contacted | qualified | disqualified
    hubspot_contact_id VARCHAR(100),
    hubspot_deal_id VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at);
```

---

### 2. `content-service` — CMS API Layer

**Purpose:** Proxy and cache Sanity CMS content. The future frontend fetches all dynamic content (insights, case studies, capabilities) from this service, not directly from Sanity. This decouples the frontend from the CMS and keeps query logic server-side.

**Endpoints:**

```
GET /health
GET /api/content/insights                    — list published insights (paginated, ?page=1&limit=10)
GET /api/content/insights/{slug}             — single insight article
GET /api/content/case-studies                — list published case studies
GET /api/content/case-studies/{slug}         — single case study
GET /api/content/capabilities                — capabilities list
GET /api/content/home                        — homepage dynamic data (stats, hero text)
POST /api/content/cache/purge                — Sanity webhook: invalidate cache on publish (webhook secret validated)
```

**Caching strategy:**
- All `GET` content responses cached in Redis with a 10-minute TTL
- Cache key format: `content:{endpoint_path}:{sha256(query_params)}`
- On cache miss: query Sanity GROQ API, store result, return result
- On Sanity webhook `POST /api/content/cache/purge`: delete matching cache keys by document type + slug

**Sanity schemas to build (define in `sanity/schemas/`):**

`insight.js`:
```js
{
  name: 'insight',
  title: 'Insight Article',
  fields: [
    { name: 'title', type: 'string', validation: Rule => Rule.required() },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'category', type: 'string', options: {
        list: ['AI & ROI', 'Governance', 'Automation', 'Data Strategy', 'Cloud']
    }},
    { name: 'summary', type: 'text', rows: 3 },
    { name: 'body', type: 'array', of: [{ type: 'block' }, { type: 'image' }, { type: 'code' }] },
    { name: 'author', type: 'reference', to: [{ type: 'author' }] },
    { name: 'publishedAt', type: 'datetime' },
    { name: 'seoTitle', type: 'string' },
    { name: 'seoDescription', type: 'text', rows: 2 },
    { name: 'featuredImage', type: 'image', options: { hotspot: true } },
    { name: 'published', type: 'boolean', initialValue: false }
  ]
}
```

`caseStudy.js` — same base fields as insight, plus: `client_industry`, `client_scale`, `outcomes` (array of `{metric, value, description}`), `v2v_stages_used` (array of stage enum values), `testimonial_quote`, `testimonial_author`, `testimonial_title`.

`author.js` — `name`, `title`, `bio`, `photo`, `linkedin`.

`capability.js` — `title`, `slug`, `description`, `bullets` (array of strings), `icon_name`, `display_order`.

`homepageStats.js` — `operational_savings`, `enterprise_adoption_pct`, `labor_hours_saved`, `time_to_insight_hours` (all strings so non-engineers can update copy).

---

### 3. `auth-service` — Authentication & Authorization

**Purpose:** Handle all authentication flows via Auth0. Issue and validate JWTs used by the portal. Manage RBAC roles.

**Auth0 configuration (document setup steps in `auth-service/README.md`):**

- Tenant: `sageconsulting.auth0.com` (create this in Auth0 dashboard)
- Applications:
  - `sage-portal-spa` — Single Page Application type (for future portal frontend)
  - `sage-api-m2m` — Machine-to-Machine type (for service-to-service calls)
- Connections:
  - Username/Password (internal Sage staff)
  - SAML (enterprise client SSO — add one connection per enterprise client at deal time)
- Auth0 Action (Post Login): attach `role` and `client_id` claims to the JWT access token from app_metadata

**RBAC roles:**
```
admin          — Sage internal staff, full access to all data
consultant     — Sage internal staff, scoped to their assigned engagements
client_viewer  — Enterprise client user, read-only access to their own portal data
```

**Endpoints:**

```
GET  /health
POST /api/auth/callback     — Auth0 redirect callback; exchange code for tokens; set HTTP-only cookie
POST /api/auth/refresh      — Refresh access token using refresh token cookie
POST /api/auth/logout       — Clear session, revoke refresh token
GET  /api/auth/me           — Return current user's profile + roles (requires valid access token)
```

**Shared JWT validation middleware** — build as a reusable FastAPI dependency `require_auth(roles: list[str])` and export it from a `shared/auth/` directory that all other services import:

```python
# shared/auth/middleware.py
async def require_auth(roles: list[str] = [], token: str = Depends(oauth2_scheme)):
    # 1. Fetch Auth0 JWKS (cache in Redis for 1hr, key: auth0:jwks)
    # 2. Decode and validate JWT signature
    # 3. Check token expiry
    # 4. Extract role claim; check against required roles list
    # 5. Return decoded payload (user_id, role, client_id) as dependency injection
    # Raise 401 for invalid token, 403 for insufficient role
```

---

### 4. `portal-service` — Client Portal API

**Purpose:** Power the authenticated client portal. Enterprise clients track engagement progress, download deliverables, and view project status. Sage consultants manage milestones and upload deliverables.

**Database schemas:**

```sql
CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name VARCHAR(255) NOT NULL,
    industry VARCHAR(100),
    hubspot_company_id VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE engagements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    v2v_stage VARCHAR(50),
      -- foundational_integrity | unified_integration | advanced_intelligence | cognitive_autonomy
    status VARCHAR(50) DEFAULT 'active',
      -- active | on_hold | completed
    start_date DATE,
    expected_end_date DATE,
    actual_end_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE milestones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    engagement_id UUID REFERENCES engagements(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending',
      -- pending | in_progress | completed | blocked
    due_date DATE,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE deliverables (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    engagement_id UUID REFERENCES engagements(id) ON DELETE CASCADE,
    milestone_id UUID REFERENCES milestones(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    s3_bucket VARCHAR(255) NOT NULL,
    s3_key VARCHAR(500) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_size_bytes BIGINT,
    content_type VARCHAR(100),
    uploaded_by_user_id UUID,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE portal_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth0_user_id VARCHAR(255) UNIQUE NOT NULL,
    client_id UUID REFERENCES clients(id),
    name VARCHAR(255),
    email VARCHAR(255),
    role VARCHAR(50),   -- admin | consultant | client_viewer
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    action VARCHAR(100),          -- milestone_updated | deliverable_uploaded | engagement_viewed etc.
    resource_type VARCHAR(50),
    resource_id UUID,
    ip_hash VARCHAR(64),
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Endpoints:**

```
GET  /health
GET  /api/portal/engagements                            — list engagements (scoped to client_id from JWT)
GET  /api/portal/engagements/{id}                       — detail + milestones + progress % calculation
GET  /api/portal/engagements/{id}/milestones            — milestone list with statuses
GET  /api/portal/engagements/{id}/deliverables          — deliverable list
GET  /api/portal/deliverables/{id}/download             — generate presigned S3 GET URL (15 min expiry)
POST /api/portal/upload-url                             — generate presigned S3 PUT URL for direct upload (consultant/admin)
POST /api/portal/engagements/{id}/deliverables          — confirm upload + write deliverable record (consultant/admin)
POST /api/portal/engagements/{id}/milestones            — create milestone (consultant/admin)
PATCH /api/portal/milestones/{id}                       — update milestone status (consultant/admin)
POST /api/portal/clients                                — create client (admin only)
POST /api/portal/engagements                            — create engagement (admin only)
```

**S3 upload flow for deliverables:**
1. Consultant calls `POST /api/portal/upload-url` with `{file_name, content_type, engagement_id}`
2. Service generates a presigned S3 PUT URL (15 min expiry) at key `deliverables/{engagement_id}/{uuid}/{file_name}` and returns it with an `upload_id`
3. Consultant's client uploads the file directly to S3 — never routes through the API
4. Consultant calls `POST /api/portal/engagements/{id}/deliverables` with the `upload_id` + metadata to confirm
5. Service writes the deliverable record to Postgres and publishes a `deliverable_uploaded` event to Redis

**Progress calculation:** `GET /api/portal/engagements/{id}` returns a computed `progress_pct` field: count of milestones with status `completed` divided by total milestones × 100, rounded to nearest integer.

---

### 5. `notification-service` — All Outbound Messaging

**Purpose:** Centralised consumer for all email sending. This is a Railway **Worker** service (no public HTTP port needed). It subscribes to Redis streams and handles all SendGrid calls. No other service calls SendGrid directly.

**Redis streams to consume:**

| Stream Key | Published by | Action |
|---|---|---|
| `stream:lead_received` | lead-service | Send internal alert + prospect auto-reply |
| `stream:deliverable_uploaded` | portal-service | Email client users on the engagement |
| `stream:milestone_updated` | portal-service | Email client users on the engagement |
| `stream:consultation_scheduled` | Cal.com webhook handler | Send calendar confirmation + prep materials |

**Worker loop:**

```python
# Uses Redis Streams with consumer groups for reliability
# Group name: notification-service
# If a message is not ACK'd within 30s, another worker instance can claim it
# Dead letter after 3 failed attempts: write to `stream:notification_dead_letter`
```

**Additional endpoints (the worker also runs a minimal FastAPI app for webhooks):**

```
GET  /health
POST /api/notifications/cal-webhook       — Cal.com booking confirmed webhook
POST /api/notifications/sendgrid-webhook  — SendGrid delivery event webhook (delivered, bounced, spam_report)
```

**Email events table:**
```sql
CREATE TABLE email_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type VARCHAR(100),
    recipient_email_hash VARCHAR(64),   -- hash only, never store plaintext
    sendgrid_message_id VARCHAR(255),
    status VARCHAR(50),   -- sent | delivered | bounced | spam_report | failed
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**SendGrid template IDs** (store in Railway env vars, not code):
```
SENDGRID_TEMPLATE_LEAD_INTERNAL
SENDGRID_TEMPLATE_LEAD_AUTOREPLY
SENDGRID_TEMPLATE_DELIVERABLE_UPLOADED
SENDGRID_TEMPLATE_MILESTONE_UPDATED
SENDGRID_TEMPLATE_CONSULTATION_CONFIRMED
SENDGRID_TEMPLATE_WEEKLY_DIGEST
```

**Cron job** — Railway supports cron services natively. Add a separate Railway cron service called `digest-cron` that runs every Monday at 9:00 AM ET (`0 14 * * 1` UTC). It publishes a `weekly_digest_trigger` event to Redis with a list of all active engagement IDs, which the notification worker picks up and fans out into per-client digest emails.

---

## Project Repository Structure

```
sage-consulting-backend/
├── services/
│   ├── lead-service/
│   │   ├── app/
│   │   │   ├── main.py              (FastAPI app, mounts router, reads PORT from env)
│   │   │   ├── routes/
│   │   │   │   └── leads.py
│   │   │   ├── models/
│   │   │   │   └── lead.py          (SQLAlchemy ORM model)
│   │   │   ├── schemas/
│   │   │   │   └── lead.py          (Pydantic request/response schemas)
│   │   │   └── services/
│   │   │       ├── hubspot.py
│   │   │       └── redis_streams.py
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── railway.json
│   │   └── tests/
│   ├── content-service/
│   ├── auth-service/
│   ├── portal-service/
│   └── notification-service/
├── shared/
│   ├── auth/
│   │   └── middleware.py            (require_auth dependency — imported by all services)
│   └── database/
│       ├── connection.py            (async SQLAlchemy engine factory using DATABASE_URL)
│       └── base.py                  (declarative base)
├── sanity/
│   ├── schemas/
│   │   ├── insight.js
│   │   ├── caseStudy.js
│   │   ├── author.js
│   │   ├── capability.js
│   │   └── homepageStats.js
│   └── sanity.config.ts
├── migrations/
│   └── alembic/                     (one Alembic project for shared schema)
│       ├── alembic.ini
│       └── versions/
├── .github/
│   └── workflows/
│       ├── test.yml                 (runs pytest on PR)
│       └── deploy.yml               (runs railway up on push to main)
├── docker-compose.yml               (local dev: all 5 services + postgres + redis)
├── Makefile
└── README.md
```

---

## Railway Configuration

### `railway.json` (in each service directory)

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "DOCKERFILE",
    "dockerfilePath": "Dockerfile"
  },
  "deploy": {
    "healthcheckPath": "/health",
    "healthcheckTimeout": 30,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 3
  }
}
```

### `Dockerfile` (standard for all services)

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}
```

### `docker-compose.yml` (local development)

Spins up all five services + postgres + redis locally. Each service reads from `.env.local`. Postgres runs on `localhost:5432`, Redis on `localhost:6379`. Add `make dev` to Makefile that runs `docker-compose up --build`.

---

## Environment Variables

Set these per-service in the Railway dashboard (Settings → Variables). Use Railway's shared variable groups for variables common to all services.

**Shared across all services:**
```
DATABASE_URL=postgresql+asyncpg://${{Postgres.PGUSER}}:${{Postgres.PGPASSWORD}}@${{Postgres.PGHOST}}:${{Postgres.PGPORT}}/${{Postgres.PGDATABASE}}
REDIS_URL=redis://${{Redis.REDIS_HOST}}:${{Redis.REDIS_PORT}}
ENVIRONMENT=production
AUTH0_DOMAIN=sageconsulting.auth0.com
AUTH0_AUDIENCE=https://sage-api
```

**lead-service:**
```
HUBSPOT_API_KEY=
HUBSPOT_PIPELINE_ID=
HUBSPOT_STAGE_NEW_LEAD=
IP_HASH_SALT=          (random 32-char string, set once)
CORS_ORIGINS=*         (update to actual frontend URL once known)
```

**content-service:**
```
SANITY_PROJECT_ID=
SANITY_DATASET=production
SANITY_API_TOKEN=
SANITY_WEBHOOK_SECRET=
CACHE_TTL_SECONDS=600
```

**auth-service:**
```
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
JWT_COOKIE_DOMAIN=     (leave blank until domain acquired)
SESSION_SECRET=        (random 64-char string)
```

**portal-service:**
```
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=us-east-1
S3_DELIVERABLES_BUCKET=sage-consulting-deliverables
S3_PRESIGNED_URL_EXPIRY=900
```

**notification-service:**
```
SENDGRID_API_KEY=
SENDGRID_FROM_EMAIL=hello@sageconsulting.com   (update once domain acquired)
SENDGRID_TEMPLATE_LEAD_INTERNAL=
SENDGRID_TEMPLATE_LEAD_AUTOREPLY=
SENDGRID_TEMPLATE_DELIVERABLE_UPLOADED=
SENDGRID_TEMPLATE_MILESTONE_UPDATED=
SENDGRID_TEMPLATE_CONSULTATION_CONFIRMED=
SENDGRID_TEMPLATE_WEEKLY_DIGEST=
CALCOM_WEBHOOK_SECRET=
INTERNAL_ALERT_EMAIL=strategy@sageconsulting.com
REDIS_CONSUMER_GROUP=notification-service
```

---

## CI/CD Pipeline

### `.github/workflows/deploy.yml`

```yaml
name: Deploy to Railway

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: testpass
          POSTGRES_DB: sage_test
      redis:
        image: redis:7
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.11'
      - run: |
          for service in lead-service content-service auth-service portal-service notification-service; do
            cd services/$service
            pip install -r requirements.txt
            pytest tests/ --cov=app --cov-report=xml
            cd ../..
          done

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm install -g @railway/cli
      - run: railway up --service lead-service --detach
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
      # repeat for each service
```

---

## API Response Standards

All services must follow these response conventions so the future frontend has a consistent contract:

**Success response wrapper:**
```json
{
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 47
  }
}
```
(omit `meta` for non-paginated responses)

**Error response:**
```json
{
  "error": {
    "code": "LEAD_VALIDATION_ERROR",
    "message": "Email address is invalid.",
    "field": "email"
  }
}
```

**HTTP status codes:**
- `200` — successful GET
- `201` — successful POST (resource created)
- `204` — successful DELETE (no content)
- `400` — validation error (Pydantic)
- `401` — missing or invalid JWT
- `403` — valid JWT but insufficient role
- `404` — resource not found
- `429` — rate limit exceeded
- `500` — internal server error (never expose stack traces)

---

## Security Requirements

Non-negotiable for a firm handling enterprise client data:

1. **HTTPS only** — Railway provides HTTPS on all public URLs by default; never allow HTTP
2. **CORS** — set `CORS_ORIGINS` env var per-service; default to `*` during development, lock down to specific frontend origin before any client uses the system
3. **Rate limiting** — `slowapi` with Redis backend on all public endpoints: lead submission 5/hr/IP; content API 60/min/IP; auth endpoints 10/min/IP
4. **Input validation** — Pydantic v2 strict models on all request bodies; use `model_config = ConfigDict(extra='forbid')` to reject unknown fields
5. **SQL injection** — SQLAlchemy ORM only; zero raw SQL strings with user input
6. **Secrets** — zero secrets in code or git; all via Railway environment variables
7. **S3** — bucket private; all access via presigned URLs only; bucket policy denies all public GetObject
8. **PII in logs** — never log email addresses, names, or phone numbers; log UUIDs only
9. **Audit log** — every write action by an authenticated user goes to the `audit_log` table in portal-service
10. **JWT validation** — always validate signature against Auth0 JWKS; never trust the JWT payload without signature check; cache JWKS in Redis for 1hr

---

## Database Migrations

Use **Alembic** for all schema changes. Migrations live in `migrations/alembic/`. Run migrations as a Railway one-off job before deploying new service versions:

```bash
# In Railway dashboard or CLI before deploy
railway run --service lead-service alembic upgrade head
```

Generate migrations with:
```bash
alembic revision --autogenerate -m "add_leads_table"
```

Never make manual schema changes to the Railway Postgres instance.

---

## Build Order

Build in this exact sequence — each phase is independently deployable and testable:

**Phase 1 (Week 1–2): Lead Capture — highest revenue priority**
- `lead-service` with full Postgres schema + HubSpot integration
- `notification-service` wired to `stream:lead_received` — fires internal alert + auto-reply emails
- Railway project setup: Postgres plugin, Redis plugin, both services deployed
- Alembic migrations running
- SendGrid sender domain verified (use a Gmail or placeholder domain temporarily if no domain yet)

**Phase 2 (Week 3–4): Content**
- Sanity project created with all schemas
- `content-service` deployed to Railway with Redis caching
- Sanity Studio accessible for content entry
- All endpoints returning well-formed JSON ready for any frontend to consume

**Phase 3 (Week 5–7): Auth + Portal**
- Auth0 tenant set up with RBAC roles
- `auth-service` deployed
- `portal-service` deployed with full engagement + deliverable + audit log schemas
- S3 bucket created with correct IAM policy for presigned URLs
- First admin and consultant users created in Auth0

**Phase 4 (Week 8): Notifications Complete + Cron**
- All remaining notification-service event types wired up
- `digest-cron` Railway cron service deployed
- Cal.com webhook endpoint live
- SendGrid all Dynamic Templates built and tested

---

## Testing Requirements

Each service must include:

- Unit tests for all business logic (`pytest` + `pytest-asyncio`)
- Integration tests for Postgres operations using a test DB (spin up via `pytest` fixture with `asyncpg`)
- Mocked tests for all third-party calls (HubSpot, SendGrid, Sanity, Auth0) using `pytest-mock` and `respx` for async HTTP mocking
- Minimum 80% test coverage per service (`pytest-cov`)
- Tests for every error path: missing fields, duplicate email, HubSpot failure, S3 failure, expired JWT, wrong role

Run all tests locally with:
```bash
make test   # runs pytest across all services via docker-compose test profile
```

---

## Out of Scope for This Prompt

- The frontend / portal UI — separate project, builds against this API
- A custom CMS admin UI — use Sanity Studio (included free)
- Auth0 enterprise SAML setup per client — done at deal time, not at build time
- Marketing email campaigns — managed directly in HubSpot UI
- Custom domain setup — deferred until domain is acquired; all Railway URLs work as-is

---

*Sage Consulting backend build — Claude Code prompt v2.0 (Railway)*
*Model: `claude-opus-4-5` for architecture and planning, `claude-sonnet-4-5` for code generation.*
*Start Claude Code session with: `claude` then `> Read this file and begin Phase 1`*
