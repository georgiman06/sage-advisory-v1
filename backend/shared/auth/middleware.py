import json
import logging
import os

import httpx
import redis.asyncio as aioredis
from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt

logger = logging.getLogger(__name__)

AUTH0_DOMAIN = os.environ.get("AUTH0_DOMAIN", "sageconsulting.auth0.com")
AUTH0_AUDIENCE = os.environ.get("AUTH0_AUDIENCE", "https://sage-api")
REDIS_URL = os.environ.get("REDIS_URL", "redis://localhost:6379")

JWKS_CACHE_KEY = "auth0:jwks"
JWKS_CACHE_TTL = 3600  # 1 hour

ROLE_CLAIM = "https://sageconsulting.com/role"
CLIENT_ID_CLAIM = "https://sageconsulting.com/client_id"

security = HTTPBearer(auto_error=False)


async def _get_jwks() -> dict:
    r = aioredis.from_url(REDIS_URL, decode_responses=True)
    try:
        cached = await r.get(JWKS_CACHE_KEY)
        if cached:
            return json.loads(cached)

        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.get(
                f"https://{AUTH0_DOMAIN}/.well-known/jwks.json"
            )
            resp.raise_for_status()
            jwks = resp.json()

        await r.setex(JWKS_CACHE_KEY, JWKS_CACHE_TTL, json.dumps(jwks))
        return jwks
    finally:
        await r.aclose()


def _extract_rsa_key(jwks: dict, kid: str) -> dict | None:
    for key in jwks.get("keys", []):
        if key.get("kid") == kid:
            return {
                "kty": key["kty"],
                "kid": key["kid"],
                "use": key["use"],
                "n": key["n"],
                "e": key["e"],
            }
    return None


def require_auth(roles: list[str] = []):
    """
    FastAPI dependency factory for JWT validation.
    Usage: user = Depends(require_auth(["admin", "consultant"]))
    Returns decoded payload dict with user_id, role, client_id.
    Raises 401 for invalid token, 403 for insufficient role.
    """

    async def _auth(
        credentials: HTTPAuthorizationCredentials = Depends(security),
    ) -> dict:
        if credentials is None:
            raise HTTPException(
                status_code=401,
                detail={
                    "error": {
                        "code": "MISSING_TOKEN",
                        "message": "Authorization header is required.",
                    }
                },
            )

        token = credentials.credentials

        try:
            jwks = await _get_jwks()
            header = jwt.get_unverified_header(token)
            kid = header.get("kid", "")

            rsa_key = _extract_rsa_key(jwks, kid)
            if not rsa_key:
                raise HTTPException(
                    status_code=401,
                    detail={
                        "error": {
                            "code": "INVALID_TOKEN",
                            "message": "Unable to find matching signing key.",
                        }
                    },
                )

            payload = jwt.decode(
                token,
                rsa_key,
                algorithms=["RS256"],
                audience=AUTH0_AUDIENCE,
                issuer=f"https://{AUTH0_DOMAIN}/",
            )

        except HTTPException:
            raise
        except JWTError as exc:
            logger.warning("JWT validation failed: %s", type(exc).__name__)
            raise HTTPException(
                status_code=401,
                detail={
                    "error": {
                        "code": "INVALID_TOKEN",
                        "message": "Invalid or expired token.",
                    }
                },
            )
        except Exception as exc:
            logger.error("Auth middleware unexpected error: %s", type(exc).__name__)
            raise HTTPException(
                status_code=401,
                detail={
                    "error": {
                        "code": "AUTH_ERROR",
                        "message": "Authentication failed.",
                    }
                },
            )

        token_role = payload.get(ROLE_CLAIM, "")
        if roles and token_role not in roles:
            raise HTTPException(
                status_code=403,
                detail={
                    "error": {
                        "code": "INSUFFICIENT_ROLE",
                        "message": "You do not have permission to access this resource.",
                    }
                },
            )

        return {
            "user_id": payload.get("sub"),
            "role": token_role,
            "client_id": payload.get(CLIENT_ID_CLAIM),
        }

    return _auth
