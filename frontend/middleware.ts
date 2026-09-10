import { NextResponse } from "next/server"
import type { NextFetchEvent, NextRequest } from "next/server"

/**
 * Sage Consulting — first-party analytics middleware.
 *
 * Responsibilities:
 *  1. Filter out bots/crawlers/uptime checks and asset requests before they
 *     ever touch a cookie or the analytics-service.
 *  2. Issue/refresh the visitor (`vid`) and session (`sid`) cookies.
 *  3. Fire a non-blocking beacon to analytics-service to record the page
 *     view. The backend re-validates (defense-in-depth) and never errors
 *     the caller, so this never affects the response the visitor sees.
 */

const VISITOR_COOKIE = "vid"
const SESSION_COOKIE = "sid"

const VISITOR_MAX_AGE = 60 * 60 * 24 * 365 // 1 year
const SESSION_MAX_AGE = 60 * 30 // 30 minutes of inactivity

// Keep in sync with backend/services/analytics-service/app/services/bot_filter.py
const BOT_UA_PATTERN =
  /bot|crawl|spider|slurp|mediapartners|facebookexternalhit|pingdom|uptimerobot|statuscake|site24x7|newrelic|datadog|headlesschrome|phantomjs|puppeteer|playwright|curl|wget|python-requests|go-http-client|monitor|checker|preview/i

function analyticsApiBase(): string {
  return process.env.ANALYTICS_API_URL ?? "http://localhost:8006"
}

function isBotRequest(userAgent: string): boolean {
  if (!userAgent) return true
  return BOT_UA_PATTERN.test(userAgent)
}

export function middleware(request: NextRequest, event: NextFetchEvent) {
  const response = NextResponse.next()
  const userAgent = request.headers.get("user-agent") ?? ""

  // Bots/crawlers/uptime checks never get cookies and are never tracked.
  if (isBotRequest(userAgent)) {
    return response
  }

  const isSecure = request.nextUrl.protocol === "https:"
  const baseCookieOptions = {
    httpOnly: true,
    secure: isSecure,
    sameSite: "lax" as const,
    path: "/",
  }

  let vid = request.cookies.get(VISITOR_COOKIE)?.value
  if (!vid) {
    vid = crypto.randomUUID()
    response.cookies.set(VISITOR_COOKIE, vid, {
      ...baseCookieOptions,
      maxAge: VISITOR_MAX_AGE,
    })
  }

  // Sliding session window — every request (within 30 min of the last one)
  // refreshes the expiry so an active visitor's session doesn't lapse.
  let sid = request.cookies.get(SESSION_COOKIE)?.value
  if (!sid) {
    sid = crypto.randomUUID()
  }
  response.cookies.set(SESSION_COOKIE, sid, {
    ...baseCookieOptions,
    maxAge: SESSION_MAX_AGE,
  })

  const path = request.nextUrl.pathname
  const trackPromise = fetch(`${analyticsApiBase()}/api/track`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "user-agent": userAgent,
    },
    body: JSON.stringify({ vid, sid, path }),
  }).catch(() => {
    // Never let a tracking failure affect the visitor's page load.
  })

  event.waitUntil(trackPromise)

  return response
}

export const config = {
  matcher: [
    /*
     * Only run on real page navigations. Skip:
     *  - /api/*        (our own and third-party API routes)
     *  - /_next/*       (Next.js internals/assets)
     *  - /admin/*       (private stats screen — no need to self-track)
     *  - static assets (images, fonts, css, js, favicons, etc.)
     */
    "/((?!api|_next/static|_next/image|admin|favicon\\.ico|.*\\.(?:png|jpe?g|gif|webp|avif|svg|ico|css|js|mjs|map|json|woff2?|ttf|eot|mp4|webm|pdf|txt|xml)$).*)",
  ],
}
