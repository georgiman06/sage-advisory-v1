"use client"

import { useState, useRef, useLayoutEffect, useEffect } from "react"
import {
  Database,
  Cloud,
  BarChart3,
  Brain,
  Shield,
  ServerCog,
  Code2,
  Sparkles,
  Layers,
  X,
  type LucideIcon,
} from "lucide-react"

type Capability = {
  icon: LucideIcon
  title: string
  description: string
  servicesLabel: string
  services: string[]
}

type Technology = {
  icon: LucideIcon
  title: string
  description: string
  items: string[]
}

type Selection =
  | { column: "capabilities"; index: number }
  | { column: "technology"; index: number }
  | null

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

const technologies: Technology[] = [
  {
    icon: Cloud,
    title: "Cloud Platforms",
    description: "Hyperscaler and data-cloud platforms we build on.",
    items: ["AWS", "Microsoft Azure", "Snowflake", "Microsoft Fabric"],
  },
  {
    icon: BarChart3,
    title: "Analytics Platforms",
    description: "Modern BI and analytics tooling we deliver on.",
    items: ["Power BI", "Tableau", "Oracle Analytics", "Enterprise BI platforms"],
  },
  {
    icon: Shield,
    title: "Data Governance",
    description: "Governance, catalog, and metadata tooling.",
    items: ["Collibra", "Alation", "Metadata management platforms"],
  },
  {
    icon: Code2,
    title: "Development & Engineering",
    description: "Languages and frameworks for data engineering.",
    items: ["Python", "SQL", "Data pipeline frameworks", "Enterprise integration platforms"],
  },
]

export function CapabilitiesGrid() {
  const [capExpanded, setCapExpanded] = useState(true)
  const [techExpanded, setTechExpanded] = useState(true)
  const [selection, setSelection] = useState<Selection>(null)

  const canvasRef = useRef<HTMLDivElement>(null)
  const capParentRef = useRef<HTMLDivElement>(null)
  const techParentRef = useRef<HTMLDivElement>(null)
  const capChildRefs = useRef<(HTMLDivElement | null)[]>([])
  const techChildRefs = useRef<(HTMLDivElement | null)[]>([])
  const [capPaths, setCapPaths] = useState<string[]>([])
  const [techPaths, setTechPaths] = useState<string[]>([])

  const computePathsFor = (
    parentEl: HTMLDivElement | null,
    children: (HTMLDivElement | null)[],
    expanded: boolean,
  ): string[] => {
    if (!expanded || !canvasRef.current || !parentEl) return []
    const canvasRect = canvasRef.current.getBoundingClientRect()
    const p = parentEl.getBoundingClientRect()
    const startX = p.left + p.width / 2 - canvasRect.left
    const startY = p.bottom - canvasRect.top
    return children.map((el) => {
      if (!el) return ""
      const c = el.getBoundingClientRect()
      const endX = c.left + c.width / 2 - canvasRect.left
      const endY = c.top - canvasRect.top
      const midY = (startY + endY) / 2
      return `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`
    })
  }

  const recomputePaths = () => {
    setCapPaths(computePathsFor(capParentRef.current, capChildRefs.current, capExpanded))
    setTechPaths(computePathsFor(techParentRef.current, techChildRefs.current, techExpanded))
  }

  useLayoutEffect(() => {
    recomputePaths()
  }, [capExpanded, techExpanded, selection])

  useEffect(() => {
    const handler = () => recomputePaths()
    window.addEventListener("resize", handler)
    return () => window.removeEventListener("resize", handler)
  }, [capExpanded, techExpanded, selection])

  const isCapActive = (i: number) =>
    selection?.column === "capabilities" && selection.index === i
  const isTechActive = (i: number) =>
    selection?.column === "technology" && selection.index === i

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
            Capabilities & Technology
          </p>
          <p className="mt-4 text-base text-white/70 md:text-lg">
            Strategic advisory and hands-on implementation to deliver measurable business impact.
          </p>
        </div>

        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          style={{ overflow: "visible" }}
        >
          {capPaths.map((d, i) => (
            <path
              key={`cap-${i}`}
              d={d}
              stroke={isCapActive(i) ? "rgba(110,231,183,0.85)" : "rgba(160,200,180,0.55)"}
              strokeWidth={isCapActive(i) ? 2 : 1.5}
              strokeDasharray="5 5"
              fill="none"
            />
          ))}
          {techPaths.map((d, i) => (
            <path
              key={`tech-${i}`}
              d={d}
              stroke={isTechActive(i) ? "rgba(110,231,183,0.85)" : "rgba(160,200,180,0.55)"}
              strokeWidth={isTechActive(i) ? 2 : 1.5}
              strokeDasharray="5 5"
              fill="none"
            />
          ))}
        </svg>

        <div className="relative mt-12 grid gap-x-10 gap-y-16 md:grid-cols-2">
          {/* === Core Capabilities tree === */}
          <div className="flex flex-col items-center">
            <div ref={capParentRef} className="relative w-full max-w-[420px]">
              <div
                className="pointer-events-none absolute inset-0 -m-6 rounded-3xl bg-emerald-400/20 blur-2xl"
                style={{ animation: "pulse-glow 3.5s ease-in-out infinite" }}
              />
              <button
                onClick={() => {
                  setCapExpanded((v) => !v)
                  setSelection((s) => (s?.column === "capabilities" ? null : s))
                }}
                className="group relative w-full rounded-xl border border-emerald-400/30 bg-[#162923]/95 text-left shadow-2xl backdrop-blur-sm transition-all hover:border-emerald-400/60 hover:bg-[#1a3027]"
              >
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="h-5 w-5 text-emerald-400" />
                    <span className="text-lg font-semibold text-white">Core Capabilities</span>
                  </div>
                  <span className="text-white/40 transition-colors group-hover:text-white/80">
                    {capExpanded ? <X className="h-5 w-5" /> : <span className="text-2xl leading-none">+</span>}
                  </span>
                </div>
                <div className="px-5 py-5">
                  <div className="rounded border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white/65">
                    {capExpanded ? "6 capabilities — click a node for details" : "Click to expand"}
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
              className={`mt-24 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-500 ${
                capExpanded ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-4"
              }`}
            >
              {capabilities.map((cap, i) => {
                const Icon = cap.icon
                const isActive = isCapActive(i)
                return (
                  <button
                    key={cap.title}
                    ref={(el) => {
                      capChildRefs.current[i] = el
                    }}
                    onClick={() =>
                      setSelection((prev) =>
                        prev?.column === "capabilities" && prev.index === i
                          ? null
                          : { column: "capabilities", index: i },
                      )
                    }
                    className={`flex items-center gap-3 rounded-lg border px-3 py-3 text-left backdrop-blur-sm transition-all ${
                      isActive
                        ? "border-emerald-400/60 bg-[#1f352c]/90 shadow-[0_0_20px_-6px_rgba(110,231,183,0.5)]"
                        : "border-white/10 bg-[#162923]/80 hover:border-emerald-400/40 hover:bg-[#1a3027]/90"
                    }`}
                    style={{
                      transitionDelay: capExpanded ? `${i * 60}ms` : "0ms",
                    }}
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-emerald-500/15">
                      <Icon className="h-4 w-4 text-emerald-400" />
                    </div>
                    <span className="text-xs font-medium leading-tight text-white/90">{cap.title}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* === Technology Expertise tree === */}
          <div className="flex flex-col items-center">
            <div ref={techParentRef} className="relative w-full max-w-[420px]">
              <div
                className="pointer-events-none absolute inset-0 -m-6 rounded-3xl bg-emerald-400/20 blur-2xl"
                style={{ animation: "pulse-glow 3.5s ease-in-out infinite" }}
              />
              <button
                onClick={() => {
                  setTechExpanded((v) => !v)
                  setSelection((s) => (s?.column === "technology" ? null : s))
                }}
                className="group relative w-full rounded-xl border border-emerald-400/30 bg-[#162923]/95 text-left shadow-2xl backdrop-blur-sm transition-all hover:border-emerald-400/60 hover:bg-[#1a3027]"
              >
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                  <div className="flex items-center gap-2.5">
                    <Layers className="h-5 w-5 text-emerald-400" />
                    <span className="text-lg font-semibold text-white">Technology Expertise</span>
                  </div>
                  <span className="text-white/40 transition-colors group-hover:text-white/80">
                    {techExpanded ? <X className="h-5 w-5" /> : <span className="text-2xl leading-none">+</span>}
                  </span>
                </div>
                <div className="px-5 py-5">
                  <div className="rounded border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white/65">
                    {techExpanded ? "4 categories — click a node for tools" : "Click to expand"}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <span className="rounded bg-white/5 px-2 py-0.5 text-[11px] text-white/55">AWS</span>
                    <span className="rounded bg-white/5 px-2 py-0.5 text-[11px] text-white/55">Azure</span>
                    <span className="rounded bg-white/5 px-2 py-0.5 text-[11px] text-white/55">Snowflake</span>
                    <span className="rounded bg-white/5 px-2 py-0.5 text-[11px] text-white/55">Python</span>
                  </div>
                </div>
              </button>
            </div>

            <div
              className={`mt-24 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 transition-all duration-500 ${
                techExpanded ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-4"
              }`}
            >
              {technologies.map((tech, i) => {
                const Icon = tech.icon
                const isActive = isTechActive(i)
                return (
                  <button
                    key={tech.title}
                    ref={(el) => {
                      techChildRefs.current[i] = el
                    }}
                    onClick={() =>
                      setSelection((prev) =>
                        prev?.column === "technology" && prev.index === i
                          ? null
                          : { column: "technology", index: i },
                      )
                    }
                    className={`flex items-center gap-3 rounded-lg border px-3 py-3 text-left backdrop-blur-sm transition-all ${
                      isActive
                        ? "border-emerald-400/60 bg-[#1f352c]/90 shadow-[0_0_20px_-6px_rgba(110,231,183,0.5)]"
                        : "border-white/10 bg-[#162923]/80 hover:border-emerald-400/40 hover:bg-[#1a3027]/90"
                    }`}
                    style={{
                      transitionDelay: techExpanded ? `${i * 60}ms` : "0ms",
                    }}
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-emerald-500/15">
                      <Icon className="h-4 w-4 text-emerald-400" />
                    </div>
                    <span className="text-xs font-medium leading-tight text-white/90">{tech.title}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {selection && (
          <div className="relative mx-auto mt-12 w-full max-w-3xl rounded-xl border border-emerald-400/30 bg-[#162923]/95 p-6 shadow-2xl backdrop-blur-sm">
            {selection.column === "capabilities" ? (
              (() => {
                const cap = capabilities[selection.index]
                const Icon = cap.icon
                return (
                  <>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-emerald-500/15">
                          <Icon className="h-5 w-5 text-emerald-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{cap.title}</h3>
                          <p className="mt-1 text-sm text-white/60">{cap.description}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelection(null)}
                        className="text-white/40 hover:text-white/80"
                        aria-label="Close details"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-5">
                      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400/80">
                        {cap.servicesLabel}
                      </p>
                      <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {cap.services.map((s) => (
                          <li key={s} className="flex items-start gap-2 text-sm text-white/80">
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )
              })()
            ) : (
              (() => {
                const tech = technologies[selection.index]
                const Icon = tech.icon
                return (
                  <>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-emerald-500/15">
                          <Icon className="h-5 w-5 text-emerald-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{tech.title}</h3>
                          <p className="mt-1 text-sm text-white/60">{tech.description}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelection(null)}
                        className="text-white/40 hover:text-white/80"
                        aria-label="Close details"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-5">
                      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400/80">
                        Tools & Platforms
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {tech.items.map((item) => (
                          <span
                            key={item}
                            className="rounded-md border border-emerald-400/25 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-100"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                )
              })()
            )}
          </div>
        )}
      </div>
    </section>
  )
}
