"use client"

import { useState, useRef, useLayoutEffect, useEffect } from "react"
import {
  Database,
  Cloud,
  BarChart3,
  Brain,
  Shield,
  Briefcase,
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
}

const nodes: Node[] = [
  {
    icon: Database,
    title: "Enterprise Data Strategy",
    description: "Building the Foundation for Intelligent Enterprises: Define enterprise data strategies, operating models, governance, and modern data platforms that enable trusted, scalable decision-making.",
    servicesLabel: "Services Include:",
    services: [
      "Enterprise data strategy & roadmaps",
      "Data operating model design",
      "Data governance frameworks",
      "Modern data platform architecture",
      "Trusted, scalable decision-making enablement",
    ],
  },
  {
    icon: Brain,
    title: "AI Strategy & Transformation",
    description: "Turning AI Potential into Business Impact: Develop enterprise AI strategies that identify, prioritize, and scale high-value AI initiatives—from GenAI and agentic AI to intelligent automation and responsible AI governance.",
    servicesLabel: "Solutions Include:",
    services: [
      "Enterprise AI strategy & roadmap",
      "GenAI & agentic AI adoption",
      "Intelligent automation programs",
      "AI use-case identification & prioritization",
      "Responsible AI governance",
    ],
  },
  {
    icon: BarChart3,
    title: "Analytics & Decision Intelligence",
    description: "Accelerating Smarter Business Decisions: Leverage analytics, AI, and predictive intelligence to uncover opportunities and accelerate business growth.",
    servicesLabel: "Services Include:",
    services: [
      "Advanced & predictive analytics",
      "Decision intelligence frameworks",
      "Self-service analytics enablement",
      "Executive dashboards & reporting",
      "Growth & opportunity analysis",
    ],
  },
  {
    icon: Shield,
    title: "Digital Trust & Decentralized Technologies",
    description: "Building Trusted Digital Ecosystems: Guide organizations in adopting blockchain, decentralized identity, tokenization, and smart contracts to build secure, transparent, and trusted digital ecosystems.",
    servicesLabel: "Capabilities Include:",
    services: [
      "Blockchain strategy & adoption",
      "Decentralized identity solutions",
      "Tokenization frameworks",
      "Smart contract advisory",
      "Secure, transparent digital ecosystems",
    ],
  },
  {
    icon: Cloud,
    title: "Modern Data & AI Platforms",
    description: "Engineering the Foundation for Intelligent Innovation: Design modern, cloud-native data and AI platforms that deliver scalable, secure, and high-performance enterprise capabilities.",
    servicesLabel: "Services Include:",
    services: [
      "Cloud-native data platform design",
      "AI platform engineering",
      "Data lakehouse & integration architecture",
      "Platform modernization & migration",
      "Scalable, secure infrastructure",
    ],
  },
  {
    icon: Briefcase,
    title: "Executive Technology Advisory",
    description: "Guiding Leaders Through Digital Transformation: Partner with executives and boards to shape technology strategy, prioritize investments, and build future-ready enterprises.",
    servicesLabel: "Services Include:",
    services: [
      "Technology strategy for executives & boards",
      "Investment prioritization",
      "Digital transformation advisory",
      "Future-readiness assessments",
      "Board-level technology briefings",
    ],
  },
]

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

  return (
    <section
      className="relative pb-24 pt-16 md:pb-32 md:pt-20"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div ref={canvasRef} className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-emerald-600 dark:text-accent-emerald">
            Capabilities
          </p>
          <p className="mt-4 font-serif text-2xl font-semibold text-foreground dark:text-white/90 md:text-3xl">
            Strategic advisory and hands-on implementation to deliver measurable business impact.
          </p>
        </div>

        {/* SVG connector lines */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          style={{ overflow: "visible" }}
        >
          {paths.map((d, i) => {
            const isActive = selection === i
            return (
              <path
                key={i}
                d={d}
                stroke={isActive ? "rgba(110,231,183,0.9)" : "rgba(160,200,180,0.45)"}
                strokeWidth={isActive ? 2 : 1.5}
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
              <div className="flex items-center justify-between border-b border-border dark:border-white/10 px-6 py-5">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-7 w-7 text-emerald-500 dark:text-emerald-400" />
                  <span className="font-serif text-2xl font-semibold text-foreground dark:text-white">Capabilities</span>
                </div>
                <span className="text-muted-foreground dark:text-white/40 transition-colors group-hover:text-foreground dark:group-hover:text-white/80">
                  {expanded ? <X className="h-6 w-6" /> : <span className="text-3xl leading-none">+</span>}
                </span>
              </div>
              <div className="px-6 py-6">
                <div className="rounded border border-border dark:border-white/10 bg-muted/50 dark:bg-black/40 px-4 py-3 text-base text-muted-foreground dark:text-white/65">
                  {expanded ? "6 core capabilities — click a node for details" : "Click to expand"}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Strategy", "AI", "Analytics", "Blockchain", "Platforms", "Advisory"].map((tag) => (
                    <span key={tag} className="rounded bg-muted dark:bg-white/5 px-3 py-1 text-xs font-semibold text-muted-foreground dark:text-white/55">
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
            <div className="mb-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-emerald-400/30" />
              <span className="text-lg font-bold uppercase tracking-[0.3em] text-emerald-400">
                Core Capabilities
              </span>
              <div className="h-px flex-1 bg-emerald-400/30" />
            </div>

            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
              {nodes.map((node, i) => {
                const Icon = node.icon
                const isActive = selection === i
                return (
                  <button
                    key={node.title}
                    ref={(el) => { childRefs.current[i] = el }}
                    onClick={() => setSelection((prev) => (prev === i ? null : i))}
                    className={`flex items-center gap-4 rounded-xl border px-5 py-5 text-left backdrop-blur-sm transition-all ${
                      isActive
                        ? "border-emerald-400/60 bg-emerald-100/90 dark:bg-[#1f352c]/90 shadow-[0_0_20px_-6px_rgba(110,231,183,0.5)]"
                        : "border-border dark:border-white/10 bg-white/80 dark:bg-[#162923]/80 hover:border-emerald-400/40 hover:bg-emerald-50/90 dark:hover:bg-[#1a3027]/90"
                    }`}
                    style={{ transitionDelay: expanded ? `${i * 50}ms` : "0ms" }}
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/15">
                      <Icon className="h-6 w-6 text-emerald-500 dark:text-emerald-400" />
                    </div>
                    <span className="text-base font-bold leading-tight text-foreground dark:text-white/90">{node.title}</span>
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

              return (
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-emerald-500/15">
                        <Icon className="h-5 w-5 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground dark:text-white">{node.title}</h3>
                        <p className="mt-2 text-base text-muted-foreground dark:text-white/60">{node.description}</p>
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
                    <p className="text-sm font-bold uppercase tracking-wide text-emerald-400/80">
                      {node.servicesLabel}
                    </p>
                    <ul className="mt-4 space-y-2.5">
                      {node.services.map((s) => (
                        <li key={s} className="flex items-start gap-2.5 text-base text-muted-foreground dark:text-white/80">
                          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })()}
          </div>
        )}
      </div>
    </section>
  )
}
