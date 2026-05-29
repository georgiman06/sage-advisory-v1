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
  X,
  type LucideIcon,
} from "lucide-react"

type Node = {
  icon: LucideIcon
  title: string
  description: string
  servicesLabel: string
  services: string[]
  type: "capability" | "technology"
}

const nodes: Node[] = [
  {
    type: "capability",
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
    type: "capability",
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
    type: "capability",
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
    type: "capability",
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
    type: "capability",
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
    type: "capability",
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
  // Technology nodes start at index 6
  {
    type: "technology",
    icon: Cloud,
    title: "Cloud Platforms",
    description: "Hyperscaler and data-cloud platforms we build on.",
    servicesLabel: "Tools & Platforms:",
    services: ["AWS", "Microsoft Azure", "Snowflake", "Microsoft Fabric"],
  },
  {
    type: "technology",
    icon: BarChart3,
    title: "Analytics Platforms",
    description: "Modern BI and analytics tooling we deliver on.",
    servicesLabel: "Tools & Platforms:",
    services: ["Power BI", "Tableau", "Oracle Analytics", "Enterprise BI platforms"],
  },
  {
    type: "technology",
    icon: Shield,
    title: "Data Governance",
    description: "Governance, catalog, and metadata tooling.",
    servicesLabel: "Tools & Platforms:",
    services: ["Collibra", "Alation", "Metadata management platforms"],
  },
  {
    type: "technology",
    icon: Code2,
    title: "Development & Engineering",
    description: "Languages and frameworks for data engineering.",
    servicesLabel: "Tools & Platforms:",
    services: ["Python", "SQL", "Data pipeline frameworks", "Enterprise integration platforms"],
  },
]

const TECH_START = 6

// Which technology nodes (by index) each capability relies on
const capToTech: Record<number, number[]> = {
  0: [9],     // Enterprise Data Strategy → Development & Engineering
  1: [6],     // Cloud Data Platforms → Cloud Platforms
  2: [7],     // Analytics & BI → Analytics Platforms
  3: [7, 9],  // AI & Advanced Analytics → Analytics Platforms + Dev & Engineering
  4: [8],     // Data Governance → Data Governance
  5: [6],     // Cloud Architecture → Cloud Platforms
}

export function CapabilitiesGrid() {
  const [expanded, setExpanded] = useState(true)
  const [selection, setSelection] = useState<number | null>(null)

  const canvasRef = useRef<HTMLDivElement>(null)
  const parentRef = useRef<HTMLDivElement>(null)
  const childRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [paths, setPaths] = useState<string[]>([])

  const computePaths = (): string[] => {
    if (!expanded || !canvasRef.current || !parentRef.current) return []
    const canvasRect = canvasRef.current.getBoundingClientRect()
    const p = parentRef.current.getBoundingClientRect()
    const startX = p.left + p.width / 2 - canvasRect.left
    const startY = p.bottom - canvasRect.top
    return childRefs.current.map((el) => {
      if (!el) return ""
      const c = el.getBoundingClientRect()
      const endX = c.left + c.width / 2 - canvasRect.left
      const endY = c.top - canvasRect.top
      const midY = (startY + endY) / 2
      return `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`
    })
  }

  useLayoutEffect(() => {
    setPaths(computePaths())
  }, [expanded, selection])

  useEffect(() => {
    const handler = () => setPaths(computePaths())
    window.addEventListener("resize", handler)
    return () => window.removeEventListener("resize", handler)
  }, [expanded, selection])

  // Highlight related tech nodes when a capability is selected
  const relatedTechIndices =
    selection !== null && selection < TECH_START ? (capToTech[selection] ?? []) : []

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
          <p className="mt-4 text-base text-muted-foreground dark:text-white/70 md:text-lg">
            Strategic advisory and hands-on implementation to deliver measurable business impact.
          </p>
        </div>

        {/* SVG connector lines */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          style={{ overflow: "visible" }}
        >
          {paths.map((d, i) => {
            const isTech = i >= TECH_START
            const isActive = selection === i
            const isRelated = relatedTechIndices.includes(i)
            return (
              <path
                key={i}
                d={d}
                stroke={
                  isActive || isRelated
                    ? isTech
                      ? "rgba(125,211,252,0.9)"
                      : "rgba(110,231,183,0.9)"
                    : isTech
                    ? "rgba(125,211,252,0.35)"
                    : "rgba(160,200,180,0.45)"
                }
                strokeWidth={isActive || isRelated ? 2 : 1.5}
                strokeDasharray="5 5"
                fill="none"
              />
            )
          })}
        </svg>

        {/* Single parent card */}
        <div className="mt-12 flex flex-col items-center">
          <div ref={parentRef} className="relative w-full max-w-full md:max-w-[560px]">
            <div
              className="pointer-events-none absolute inset-0 -m-6 rounded-3xl bg-emerald-400/20 blur-2xl"
              style={{ animation: "pulse-glow 3.5s ease-in-out infinite" }}
            />
            <button
              onClick={() => {
                setExpanded((v) => !v)
                setSelection(null)
              }}
              className="group relative w-full rounded-xl border border-emerald-400/30 bg-white/95 dark:bg-[#162923]/95 text-left shadow-2xl backdrop-blur-sm transition-all hover:border-emerald-400/60 hover:bg-emerald-50 dark:hover:bg-[#1a3027]"
            >
              <div className="flex items-center justify-between border-b border-border dark:border-white/10 px-5 py-4">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
                  <span className="text-lg font-semibold text-foreground dark:text-white">Capabilities & Technology</span>
                </div>
                <span className="text-muted-foreground dark:text-white/40 transition-colors group-hover:text-foreground dark:group-hover:text-white/80">
                  {expanded ? <X className="h-5 w-5" /> : <span className="text-2xl leading-none">+</span>}
                </span>
              </div>
              <div className="px-5 py-5">
                <div className="rounded border border-border dark:border-white/10 bg-muted/50 dark:bg-black/40 px-3 py-2.5 text-sm text-muted-foreground dark:text-white/65">
                  {expanded ? "6 capabilities · 4 technology areas — click a node for details" : "Click to expand"}
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {["Strategy", "Cloud", "AI", "Governance", "AWS", "Snowflake", "Python"].map((tag) => (
                    <span key={tag} className="rounded bg-muted dark:bg-white/5 px-2 py-0.5 text-[11px] text-muted-foreground dark:text-white/55">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          </div>

          {/* Children grid */}
          <div
            className={`mt-24 w-full transition-all duration-500 ${
              expanded ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-4"
            }`}
          >
            {/* ── CORE CAPABILITIES label ── */}
            <div className="mb-5 flex items-center gap-4">
              <div className="h-px flex-1 bg-emerald-400/30" />
              <span className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-400">
                Core Capabilities
              </span>
              <div className="h-px flex-1 bg-emerald-400/30" />
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {nodes.slice(0, TECH_START).map((node, i) => {
                const Icon = node.icon
                const isActive = selection === i
                return (
                  <button
                    key={node.title}
                    ref={(el) => { childRefs.current[i] = el }}
                    onClick={() => setSelection((prev) => (prev === i ? null : i))}
                    className={`flex items-center gap-3 rounded-lg border px-3 py-3 text-left backdrop-blur-sm transition-all ${
                      isActive
                        ? "border-emerald-400/60 bg-emerald-100/90 dark:bg-[#1f352c]/90 shadow-[0_0_20px_-6px_rgba(110,231,183,0.5)]"
                        : "border-border dark:border-white/10 bg-white/80 dark:bg-[#162923]/80 hover:border-emerald-400/40 hover:bg-emerald-50/90 dark:hover:bg-[#1a3027]/90"
                    }`}
                    style={{ transitionDelay: expanded ? `${i * 50}ms` : "0ms" }}
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-emerald-500/15">
                      <Icon className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                    </div>
                    <span className="text-xs font-medium leading-tight text-foreground dark:text-white/90">{node.title}</span>
                  </button>
                )
              })}
            </div>

            {/* ── TECHNOLOGY STACK label ── */}
            <div className="mb-5 mt-10 flex items-center gap-4">
              <div className="h-px flex-1 bg-sky-400/30" />
              <span className="text-sm font-bold uppercase tracking-[0.3em] text-sky-400">
                Technology Stack
              </span>
              <div className="h-px flex-1 bg-sky-400/30" />
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {nodes.slice(TECH_START).map((node, j) => {
                const i = TECH_START + j
                const Icon = node.icon
                const isActive = selection === i
                const isRelated = relatedTechIndices.includes(i)
                return (
                  <button
                    key={node.title}
                    ref={(el) => { childRefs.current[i] = el }}
                    onClick={() => setSelection((prev) => (prev === i ? null : i))}
                    className={`flex items-center gap-3 rounded-lg border px-3 py-3 text-left backdrop-blur-sm transition-all ${
                      isActive
                        ? "border-sky-400/60 bg-sky-50/90 dark:bg-[#1a2d35]/90 shadow-[0_0_20px_-6px_rgba(125,211,252,0.5)]"
                        : isRelated
                        ? "border-sky-400/50 bg-sky-50/70 dark:bg-[#1a2d35]/70 shadow-[0_0_14px_-6px_rgba(125,211,252,0.35)]"
                        : "border-border dark:border-white/10 bg-white/80 dark:bg-[#162923]/80 hover:border-sky-400/40 hover:bg-sky-50/70 dark:hover:bg-[#1a2d35]/70"
                    }`}
                    style={{ transitionDelay: expanded ? `${i * 50}ms` : "0ms" }}
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-sky-500/15">
                      <Icon className="h-4 w-4 text-sky-500 dark:text-sky-400" />
                    </div>
                    <span className="text-xs font-medium leading-tight text-foreground dark:text-white/90">{node.title}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Detail panel */}
        {selection !== null && (
          <div className="relative mx-auto mt-12 w-full max-w-4xl rounded-xl border border-emerald-400/30 bg-white/95 dark:bg-[#162923]/95 p-6 shadow-2xl backdrop-blur-sm">
            {(() => {
              const node = nodes[selection]
              const Icon = node.icon
              const isTech = node.type === "technology"
              const linkedTechNodes = !isTech ? (capToTech[selection] ?? []).map((ti) => nodes[ti]) : []

              return (
                <div className={`grid gap-8 ${!isTech && linkedTechNodes.length > 0 ? "md:grid-cols-2" : "grid-cols-1"}`}>
                  {/* Left: selected node details */}
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md ${isTech ? "bg-sky-500/15" : "bg-emerald-500/15"}`}>
                          <Icon className={`h-5 w-5 ${isTech ? "text-sky-400" : "text-emerald-400"}`} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground dark:text-white">{node.title}</h3>
                          <p className="mt-1 text-sm text-muted-foreground dark:text-white/60">{node.description}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelection(null)}
                        className="text-muted-foreground dark:text-white/40 hover:text-foreground dark:hover:text-white/80"
                        aria-label="Close details"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-5">
                      <p className={`text-xs font-semibold uppercase tracking-wide ${isTech ? "text-sky-400/80" : "text-emerald-400/80"}`}>
                        {node.servicesLabel}
                      </p>
                      {isTech ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {node.services.map((item) => (
                            <span
                              key={item}
                              className="rounded-md border border-sky-400/25 bg-sky-500/10 px-2.5 py-1 text-xs text-sky-100"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <ul className="mt-3 space-y-2">
                          {node.services.map((s) => (
                            <li key={s} className="flex items-start gap-2 text-sm text-muted-foreground dark:text-white/80">
                              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
                              {s}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* Right: linked technology stack (capabilities only) */}
                  {!isTech && linkedTechNodes.length > 0 && (
                    <div className="border-t border-border dark:border-white/10 pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                      <p className="text-xs font-semibold uppercase tracking-wide text-sky-400/80">
                        Technology Stack
                      </p>
                      <div className="mt-4 space-y-5">
                        {linkedTechNodes.map((tech) => {
                          const TechIcon = tech.icon
                          return (
                            <div key={tech.title}>
                              <div className="flex items-center gap-2 mb-2">
                                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-sky-500/15">
                                  <TechIcon className="h-3.5 w-3.5 text-sky-400" />
                                </div>
                                <span className="text-sm font-semibold text-foreground dark:text-white">{tech.title}</span>
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {tech.services.map((item) => (
                                  <span
                                    key={item}
                                    className="rounded-md border border-sky-400/25 bg-sky-500/10 px-2 py-0.5 text-xs text-sky-100"
                                  >
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )
            })()}
          </div>
        )}
      </div>
    </section>
  )
}
