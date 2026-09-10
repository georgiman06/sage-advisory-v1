import re

# Defense-in-depth: the Next.js middleware is the primary filter (it decides
# whether to call /api/track at all), but this service double-checks so that
# any direct/misbehaving client can't pollute the stats.

_BOT_UA_PATTERN = re.compile(
    r"bot|crawl|spider|slurp|mediapartners|facebookexternalhit|"
    r"pingdom|uptimerobot|statuscake|site24x7|newrelic|datadog|"
    r"headlesschrome|phantomjs|puppeteer|playwright|curl|wget|"
    r"python-requests|go-http-client|monitor|checker|preview",
    re.IGNORECASE,
)

_ASSET_PATH_PATTERN = re.compile(
    r"\.(?:png|jpe?g|gif|webp|avif|svg|ico|css|js|mjs|map|json|"
    r"woff2?|ttf|eot|mp4|webm|pdf|txt|xml)$",
    re.IGNORECASE,
)

_ASSET_PREFIXES = ("/_next/", "/favicon", "/api/", "/admin/")


def is_bot_user_agent(user_agent: str) -> bool:
    if not user_agent:
        # No UA at all is suspicious — treat as bot-like traffic.
        return True
    return bool(_BOT_UA_PATTERN.search(user_agent))


def is_asset_path(path: str) -> bool:
    if _ASSET_PATH_PATTERN.search(path):
        return True
    return any(path.startswith(prefix) for prefix in _ASSET_PREFIXES)


def is_trackable(path: str, user_agent: str) -> bool:
    return not is_bot_user_agent(user_agent) and not is_asset_path(path)
