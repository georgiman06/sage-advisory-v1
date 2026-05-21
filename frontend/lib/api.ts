/**
 * Centralised API client for Sage Consulting backend services.
 *
 * Server components use INTERNAL_API_URL (stays within AWS VPC).
 * Client components use NEXT_PUBLIC_API_URL (public ALB / api.sageconsulting.com).
 */

// ---------- Types ----------

export interface LeadPayload {
  full_name: string
  work_email: string
  company: string
  role?: string
  area_of_interest?: string
  message: string
  agreed_to_contact: boolean
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
}

export interface LeadResponse {
  id: string
  full_name: string
  work_email: string
  company: string
  status: string
  created_at: string
}

export interface Insight {
  slug: string
  title: string
  category: string
  description: string
  readTime?: string
  publishedAt: string
  featured: boolean
  seoTitle?: string
  seoDescription?: string
  body?: unknown // Portable Text blocks
}

export interface CaseStudy {
  slug: string
  title: string
  industry: string
  challenge: string
  solution: string
  results: string[]
  testimonial?: {
    quote: string
    author: string
    company: string
  }
  publishedAt: string
  featured: boolean
  body?: unknown
}

// ---------- Helpers ----------

function publicApiBase(): string {
  return process.env.NEXT_PUBLIC_API_URL ?? "https://api.sageconsulting.com"
}

function internalApiBase(): string {
  return process.env.INTERNAL_API_URL ?? "http://localhost:8001"
}

async function apiFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, { ...init, cache: "no-store" })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body?.detail ?? `API error ${res.status}`)
  }
  return res.json() as Promise<T>
}

// ---------- Lead Service (client-side) ----------

export async function submitLead(data: LeadPayload): Promise<LeadResponse> {
  const backendPayload = {
    name: data.full_name,
    email: data.work_email,
    company: data.company,
    title: data.role,
    message: data.message,
    service_interest: data.area_of_interest,
    utm_source: data.utm_source,
    utm_medium: data.utm_medium,
    utm_campaign: data.utm_campaign,
  }
  return apiFetch<LeadResponse>(`${publicApiBase()}/api/leads/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(backendPayload),
  })
}

// ---------- Content Service (server-side) ----------

export async function getInsights(): Promise<Insight[]> {
  return apiFetch<Insight[]>(`${internalApiBase()}/api/content/insights`, {
    next: { revalidate: 300 },
  })
}

export async function getInsight(slug: string): Promise<Insight> {
  return apiFetch<Insight>(`${internalApiBase()}/api/content/insights/${slug}`, {
    next: { revalidate: 1800 },
  })
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  return apiFetch<CaseStudy[]>(`${internalApiBase()}/api/content/case-studies`, {
    next: { revalidate: 300 },
  })
}

export async function getCaseStudy(slug: string): Promise<CaseStudy> {
  return apiFetch<CaseStudy>(`${internalApiBase()}/api/content/case-studies/${slug}`, {
    next: { revalidate: 1800 },
  })
}

// ---------- UTM helpers ----------

export function captureUtmParams(): Pick<LeadPayload, "utm_source" | "utm_medium" | "utm_campaign"> {
  if (typeof window === "undefined") return {}
  const p = new URLSearchParams(window.location.search)
  return {
    utm_source: p.get("utm_source") ?? undefined,
    utm_medium: p.get("utm_medium") ?? undefined,
    utm_campaign: p.get("utm_campaign") ?? undefined,
  }
}
