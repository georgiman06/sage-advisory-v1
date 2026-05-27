"use client"

import { useState, useRef, useLayoutEffect, useEffect } from "react"
import { Database, Cloud, BarChart3, Brain, Shield, ServerCog, Sparkles, X, type LucideIcon } from "lucide-react"

type Capability = {
  icon: LucideIcon
  title: string
  description: string
  servicesLabel: string
  services: string[]
}

const capabilities: Capability[] = [
  {
    icon: Database,
    title: "Enterprise Data Strategy",
    description: "Design and implement enterprise-wide data strategies that align technology investments with business outcomes.",
    servicesLabel: "Services Include:",
    services: [
      "Data operating model design",
      "Data platform roadmap development",
      "Enterprise data architecture",
      "Data product strategy",
      "Data monetization frameworks",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud Data Platforms",
    description: "Build scalable and secure data platforms leveraging modern cloud technologies.",
    servicesLabel: "Capabilities Include:",
    services: [
      "Cloud data warehouse implementation",
      "Multicloud analytics architecture",
      "Data lakehouse platforms",
      "Data integration pipelines",
      "Platform modernization and migration",
    ],
  },
  {
    icon: BarChart3,
    title: "Analytics & Business Intelligence",
    description: "Enable self-service analytics and modern BI capabilities across the enterprise.",
    servicesLabel: "Services Include:",
    services: [
      "Enterprise BI modernization",
      "Self-service analytics enablement",
      "Data visualization platforms",
      "Analytics governance frameworks",
      "Executive dashboards and reporting",
    ],
  },
  {
    icon: Brain,
    title: "AI & Advanced Analytics",
    description: "Embed AI and advanced analytics into enterprise decision-making processes.",
    servicesLabel: "Solutions Include:",
    services: [
      "Predictive analytics models",
      "Machine learning platforms",
      "Generative AI integration",
      "Intelligent automation solutions",
      "Customer analytics and insights",
    ],
  },
  {
    icon: Shield,
    title: "Data Governance & Compliance",
    description: "Establish governance frameworks that ensure trust, security, and compliance across the data ecosystem.",
    servicesLabel: "Capabilities Include:",
    services: [
      "Data governance operating models",
      "Data quality frameworks",
      "Metadata management",
      "Regulatory compliance support",
      "Data security and privacy programs",
    ],
  },
  {
    icon: ServerCog,
    title: "Cloud Architecture",
    description: "Design resilient, scalable cloud-native architectures for enterprise data workloads.",
    servicesLabel: "Services Include:",
    services: [
      "Multi-cloud strategy development",
      "Data integration architecture",
      "Infrastructure optimization",
      "Cloud cost management",
      "Security and compliance architecture",
    ],
  },
]

export function CapabilitiesGrid() {
  const [expanded, setExpanded] = useState(true)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const parentRef = useRef<HTMLDivElement>(null)
  const childRefs = useRef<(HTMLDivElement | null)[]>([])
  const [paths, setPaths] = useState<string[]>([])

  const recomputePaths = () => {
    if (!expanded || !canvasRef.current || !parentRef.current) {
      setPaths([])
      return
    }
    const canvasRect = canvasRef.current.getBoundingClientRect()
    const p = parentRef.current.getBoundingClientRect()
    const startX = p.left + p.width / 2 - canvasRect.left
    const startY = p.bottom - canvasRect.top

    const newPaths = childRefs.current.map((el) => {
      if (!el) return ""
      const c = el.getBoundingClientRect()
      const endX = c.left + c.width / 2 - canvasRect.left
      const endY = c.top - canvasRect.top
      const midY = (startY + endY) / 2
      return `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`
    })
    setPaths(newPaths)
  }

  useLayoutEffect(() => {
    recomputePaths()
  }, [expanded, activeIndex])

  useEffect(() => {
    const handler = () => recomputePaths()
    window.addEventListener("resize", handler)
    return () => window.removeEventListener("resize", handler)
  }, [expanded, activeIndex])

  const active = activeIndex !== null ? capabilities[activeIndex] : null
  const ActiveIcon = active?.icon

  return (
    <section
      className="relative pb-32 pt-12 md:pt-16"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div ref={canvasRef} className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/80">
            Capabilities
          </p>
          <p className="mt-4 text-base text-white/70 md:text-lg">
            Strategic advisory and hands-on implementation to deliver measurable business impact.
          </p>
        </div>

        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          style={{ overflow: "visible" }}
        >
          {paths.map((d, i) => (
            <path
              key={i}
              d={d}
              stroke={activeIndex === i ? "rgba(110,231,183,0.85)" : "rgba(160,200,180,0.55)"}
              strokeWidth={activeIndex === i ? 2 : 1.5}
              strokeDasharray="5 5"
              fill="none"
            />
          ))}
        </svg>

        <div className="relative mt-12 flex flex-col items-center">
          <div ref={parentRef} className="relative w-[440px] max-w-full">
            <div
              className="pointer-events-none absolute inset-0 -m-6 rounded-3xl bg-emerald-400/20 blur-2xl"
              style={{ animation: "pulse-glow 3.5s ease-in-out infinite" }}
            />
            <button
              onClick={() => {
                setExpanded((v) => !v)
                setActiveIndex(null)
              }}
              className="group relative w-full rounded-xl border border-emerald-400/30 bg-[#0f1815]/95 text-left shadow-2xl backdrop-blur-sm transition-all hover:border-emerald-400/60 hover:bg-[#121d19]"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="h-5 w-5 text-emerald-400" />
                  <span className="text-lg font-semibold text-white">Core Capabilities</span>
                </div>
                <span className="text-white/40 transition-colors group-hover:text-white/80">
                  {expanded ? <X className="h-5 w-5" /> : <span className="text-2xl leading-none">+</span>}
                </span>
              </div>
              <div className="px-5 py-5">
                <div className="rounded border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white/65">
                  {expanded ? "6 capabilities — click a node for details" : "Click to expand"}
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="rounded bg-white/5 px-2 py-0.5 text-[11px] text-white/55">Strategy</span>
                  <span className="rounded bg-white/5 px-2 py-0.5 text-[11px] text-white/55">Cloud</span>
                  <span className="rounded bg-white/5 px-2 py-0.5 text-[11px] text-white/55">AI</span>
                  <span className="rounded bg-white/5 px-2 py-0.5 text-[11px] text-white/55">Governance</span>
                </div>
              </div>
            </button>
          </div>

          <div
            className={`mt-32 grid w-full max-w-4xl grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2 md:grid-cols-3 transition-all duration-500 ${
              expanded ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-4"
            }`}
          >
            {capabilities.map((cap, i) => {
              const Icon = cap.icon
              const isActive = activeIndex === i
              return (
                <button
                  key={cap.title}
                  ref={(el) => {
                    childRefs.current[i] = el
                  }}
                  onClick={() => setActiveIndex((prev) => (prev === i ? null : i))}
                  className={`flex items-center gap-3 rounded-lg border px-4 py-3.5 text-left backdrop-blur-sm transition-all ${
                    isActive
                      ? "border-emerald-400/60 bg-[#16221d]/90 shadow-[0_0_20px_-6px_rgba(110,231,183,0.5)]"
                      : "border-white/10 bg-[#0f1815]/80 hover:border-emerald-400/40 hover:bg-[#121d19]/90"
                  }`}
                  style={{
                    transitionDelay: expanded ? `${i * 60}ms` : "0ms",
                  }}
                >
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-emerald-500/15">
                    <Icon className="h-4 w-4 text-emerald-400" />
                  </div>
                  <span className="text-sm font-medium text-white/90">{cap.title}</span>
                </button>
              )
            })}
          </div>

          {active && ActiveIcon && (
            <div className="mt-12 w-full max-w-3xl rounded-xl border border-emerald-400/30 bg-[#0f1815]/95 p-6 shadow-2xl backdrop-blur-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-emerald-500/15">
                    <ActiveIcon className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{active.title}</h3>
                    <p className="mt-1 text-sm text-white/60">{active.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveIndex(null)}
                  className="text-white/40 hover:text-white/80"
                  aria-label="Close details"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400/80">
                  {active.servicesLabel}
                </p>
                <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {active.services.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm text-white/80">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
