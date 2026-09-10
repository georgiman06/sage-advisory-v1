import os

from slowapi import Limiter
from slowapi.util import get_remote_address

REDIS_URL = os.environ.get("REDIS_URL", "redis://localhost:6379")

limiter = Limiter(key_func=get_remote_address, storage_uri=REDIS_URL)
