"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import {
  Database,
  Brain,
  BarChart3,
  Shield,
  Cloud,
  Briefcase,
  ArrowLeft,
  ArrowRight,
  Check,
  type LucideIcon,
} from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Section } from "@/components/shared/section"
import { Reveal } from "@/components/shared/reveal"

type Capability = {
  icon: LucideIcon
  title: string
  description: string
  servicesLabel: string
  services: string[]
  imageSrc?: string
  badgeLabel?: string
  darkImage?: boolean
  badgeAccent?: "orange" | "teal" | "emerald"
}

const capabilities: Capability[] = [
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
    imageSrc: "/images/enterprise-data-team.jpg",
    badgeLabel: "Data-Driven Strategy",
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
    imageSrc: "/images/ai-strategy-team.jpg",
    badgeLabel: "AI-Driven Strategy",
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
    imageSrc: "/images/analytics-decision-team.jpg",
    badgeLabel: "Decision Intelligence",
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
    imageSrc: "/images/digital-trust-blockchain.jpg",
    badgeLabel: "Decentralized Trust",
    darkImage: true,
    badgeAccent: "orange",
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
    imageSrc: "/images/modern-ai-platforms.jpg",
    badgeLabel: "Cloud-Native AI",
    darkImage: true,
    badgeAccent: "orange",
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

const tags = ["Strategy", "AI", "Analytics", "Blockchain", "Platforms", "Advisory"]

/** Decorative graphic panel shown alongside each slide's copy. */
function VisualPanel({
  icon: Icon,
  index,
  imageSrc,
  badgeLabel = "Data-Driven Strategy",
  darkImage = false,
  badgeAccent = "orange",
}: {
  icon: LucideIcon
  index: number
  imageSrc?: string
  badgeLabel?: string
  darkImage?: boolean
  badgeAccent?: "orange" | "teal" | "emerald"
}) {
  /* ── Photo variant (slide 0) ─────────────────────────────── */
  if (imageSrc) {
    return (
      <div className="relative flex min-h-[260px] overflow-hidden border-b border-emerald-200/60 bg-emerald-50 dark:border-white/10 dark:bg-[#0c211a] md:order-2 md:min-h-0 md:border-b-0 md:border-l">
        {/* Photo */}
        <Image
          src={imageSrc}
          alt={`${badgeLabel} team collaboration`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center"
          priority
        />

        {/* Overlay gradient — adapts to theme + image darkness */}
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-r via-transparent to-transparent ${
            darkImage
              ? "from-black/60 dark:from-black/70"
              : "from-white/30 dark:from-[#0c211a]/50"
          } dark:via-transparent dark:to-transparent`}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent dark:from-black/60"
          aria-hidden
        />

        {/* Concentric arcs motif (matches icon-panel style) */}
        <svg
          className="pointer-events-none absolute -bottom-16 -right-16 h-80 w-80 text-white/15 dark:text-accent-emerald/15"
          viewBox="0 0 200 200"
          fill="none"
          aria-hidden
        >
          {[40, 70, 100].map((r) => (
            <circle key={r} cx="100" cy="100" r={r} stroke="currentColor" strokeWidth="1" />
          ))}
        </svg>

        {/* Ghost number watermark */}
        <span
          className="pointer-events-none absolute left-6 top-5 font-mono text-7xl font-bold leading-none text-white/10 dark:text-white/5"
          aria-hidden
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Floating metric badge — accent color per slide */}
        {(() => {
          const accentStyles = {
            orange: { wrap: "border border-orange-500/30 bg-black/70", dot: "bg-orange-400", text: "text-orange-200" },
            teal:   { wrap: "border border-teal-400/30 bg-black/70",   dot: "bg-teal-400",   text: "text-teal-200"   },
            emerald:{ wrap: "border border-white/30 bg-white/80 dark:border-white/10 dark:bg-[#10231c]/85", dot: "bg-emerald-500 dark:bg-accent-emerald", text: "text-emerald-800 dark:text-white/80" },
          }
          const a = darkImage ? accentStyles[badgeAccent] : accentStyles.emerald
          return (
            <div className={`absolute bottom-5 right-5 flex items-center gap-2.5 rounded-2xl px-4 py-2.5 shadow-lg backdrop-blur-md ${a.wrap}`}>
              <span className={`flex h-2 w-2 rounded-full ${a.dot}`} />
              <span className={`font-mono text-xs font-semibold ${a.text}`}>
                {badgeLabel}
              </span>
            </div>
          )
        })()}
      </div>
    )
  }

  /* ── Default icon/decorative variant ───────────────────────── */
  return (
    <div className="relative flex min-h-[220px] items-center justify-center overflow-hidden border-b border-emerald-200/60 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:border-white/10 dark:from-[#0c211a] dark:to-[#16342a] md:order-2 md:min-h-0 md:border-b-0 md:border-l">
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute right-4 top-6 h-56 w-56 rounded-full bg-emerald-400/25 blur-3xl dark:bg-accent-emerald/20"
        aria-hidden
      />
      {/* concentric arcs motif */}
      <svg
        className="pointer-events-none absolute -bottom-16 -right-16 h-80 w-80 text-emerald-500/20 dark:text-accent-emerald/15"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden
      >
        {[40, 70, 100].map((r) => (
          <circle key={r} cx="100" cy="100" r={r} stroke="currentColor" strokeWidth="1" />
        ))}
      </svg>
      {/* ghost number watermark */}
      <span
        className="pointer-events-none absolute left-7 top-6 font-mono text-7xl font-bold leading-none text-emerald-900/5 dark:text-white/5"
        aria-hidden
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      {/* focal icon */}
      <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl border border-emerald-200 bg-white/80 shadow-xl ring-1 ring-emerald-300/40 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:ring-accent-emerald/25">
        <Icon className="h-14 w-14 text-emerald-600 dark:text-accent-emerald" />
      </div>
    </div>
  )
}

export function CapabilitiesGrid() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
    const onSelect = () => setCurrent(api.selectedScrollSnap())
    api.on("select", onSelect)
    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  return (
    <Section
      flushTop
      style={{
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-emerald-600 dark:text-accent-emerald">
          What We Do
        </p>
        <h1 className="mt-5 font-serif text-5xl font-semibold tracking-tight text-foreground dark:text-white md:text-6xl lg:text-7xl">
          Capabilities
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground dark:text-white/70 md:text-xl">
          Strategic advisory and hands-on implementation to deliver measurable business impact — across six core disciplines that help enterprises move from complexity to clarity, from data to decisions, and from strategy to scaled execution.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-emerald-400/30 dark:border-accent-emerald/25 bg-emerald-50/60 dark:bg-white/5 px-4 py-1.5 text-xs font-semibold text-emerald-700 dark:text-white/70"
            >
              {tag}
            </span>
          ))}
        </div>
      </Reveal>

      <div
        className="relative mx-auto mt-16 max-w-5xl"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        <div
          className="pointer-events-none absolute -inset-x-10 top-1/2 -z-10 h-72 -translate-y-1/2 rounded-full bg-emerald-400/15 blur-3xl dark:bg-accent-emerald/10"
          aria-hidden
        />

        <Carousel setApi={setApi} opts={{ align: "center", loop: true }}>
          <CarouselContent>
            {capabilities.map((cap, i) => (
              <CarouselItem key={cap.title}>
                <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-emerald-400/25 bg-white/95 shadow-2xl backdrop-blur-sm dark:border-accent-emerald/20 dark:bg-[#10231c]/95 md:h-[560px] md:grid-cols-2">
                  <VisualPanel icon={cap.icon} index={i} imageSrc={cap.imageSrc} badgeLabel={cap.badgeLabel} darkImage={cap.darkImage} badgeAccent={cap.badgeAccent} />

                  <div className="flex flex-col justify-center p-8 md:order-1 md:p-12">
                    <span className="font-mono text-sm text-muted-foreground dark:text-white/40">
                      {String(i + 1).padStart(2, "0")} / {String(capabilities.length).padStart(2, "0")}
                    </span>
                    <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-foreground dark:text-white md:text-4xl">
                      {cap.title}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-muted-foreground dark:text-white/70">
                      {cap.description}
                    </p>
                    <div className="mt-6 border-t border-border/60 pt-6 dark:border-white/10">
                      <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-emerald-600 dark:text-accent-emerald">
                        {cap.servicesLabel}
                      </p>
                      <ul className="mt-4 space-y-2.5">
                        {cap.services.map((s) => (
                          <li key={s} className="flex items-start gap-2.5 text-sm text-muted-foreground dark:text-white/75 md:text-base">
                            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500 dark:text-accent-emerald" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Controls: prev · autoplay progress segments · next */}
        <div className="mx-auto mt-8 flex max-w-3xl items-center gap-4">
          <button
            onClick={() => api?.scrollPrev()}
            aria-label="Previous capability"
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-emerald-400/30 text-emerald-700 transition-colors hover:border-emerald-400/60 hover:bg-emerald-50 dark:border-accent-emerald/25 dark:text-white/80 dark:hover:bg-white/5"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <div className="flex flex-1 items-center gap-2">
            {capabilities.map((cap, i) => (
              <button
                key={cap.title}
                onClick={() => api?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}: ${cap.title}`}
                className="group flex-1 py-2"
              >
                <span className="relative block h-1.5 overflow-hidden rounded-full bg-emerald-400/20 dark:bg-white/15">
                  {i === current ? (
                    <span
                      key={current}
                      className="cap-progress-fill absolute inset-0 rounded-full bg-emerald-500 dark:bg-accent-emerald"
                      style={{ animationPlayState: isPaused ? "paused" : "running" }}
                      onAnimationEnd={() => api?.scrollNext()}
                    />
                  ) : (
                    <span className="absolute inset-0 rounded-full bg-transparent transition-colors group-hover:bg-emerald-400/40 dark:group-hover:bg-white/30" />
                  )}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={() => api?.scrollNext()}
            aria-label="Next capability"
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-emerald-400/30 text-emerald-700 transition-colors hover:border-emerald-400/60 hover:bg-emerald-50 dark:border-accent-emerald/25 dark:text-white/80 dark:hover:bg-white/5"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Section>
  )
}
