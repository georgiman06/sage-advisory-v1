"use client"

import { useEffect, useRef, useState } from "react"
import { Compass, Wrench, RefreshCw, LifeBuoy, type LucideIcon } from "lucide-react"
import { Section, SectionHeader } from "@/components/shared/section"
import { Reveal } from "@/components/shared/reveal"
import { IconBadge } from "@/components/shared/icon-badge"
import { cn } from "@/lib/utils"

type Service = {
  icon: LucideIcon
  title: string
  description: string
  highlights: string[]
}

const services: Service[] = [
  {
    icon: Compass,
    title: "Strategy & Advisory",
    description: "Roadmap workshops, current-state assessments, and target-state architecture for data and AI.",
    highlights: [
      "Current-state assessment",
      "Target architecture & roadmap",
      "Executive advisory",
    ],
  },
  {
    icon: Wrench,
    title: "Implementation & Delivery",
    description: "Hands-on build of data platforms, BI dashboards, ML models, and integration pipelines.",
    highlights: [
      "Platform & pipeline build",
      "BI and ML delivery",
      "Integration engineering",
    ],
  },
  {
    icon: RefreshCw,
    title: "Migration & Modernization",
    description: "Legacy-to-cloud migrations, lakehouse adoption, and platform consolidation programs.",
    highlights: [
      "Cloud & lakehouse migration",
      "Platform consolidation",
      "Tech-debt remediation",
    ],
  },
  {
    icon: LifeBuoy,
    title: "Managed Services & Support",
    description: "Ongoing platform operations, optimization, and team augmentation after go-live.",
    highlights: [
      "Platform operations",
      "Performance & cost tuning",
      "Team augmentation",
    ],
  },
]

const STEP_MS = 2000

export function ServicesSection() {
  const [active, setActive] = useState(0)
  const pausedRef = useRef(false)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const onVisibility = () => {
      pausedRef.current = document.hidden
    }
    document.addEventListener("visibilitychange", onVisibility)

    const id = setInterval(() => {
      if (pausedRef.current) return
      setActive((prev) => (prev + 1) % services.length)
    }, STEP_MS)

    return () => {
      clearInterval(id)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  return (
    <Section flushTop>
      <SectionHeader
        eyebrow="Services"
        title="How we engage"
        titleClassName="text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.08] tracking-[-0.02em]"
        intro="From strategy through long-term operations, our engagements meet you wherever you are on the data and AI journey."
      />

      {/* Engagement lifecycle — a real four-stage sequence, so a numbered rail earns its place here. */}
      <div
        className="relative mt-20"
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
      >
        {/* base track */}
        <div
          className="pointer-events-none absolute left-7 right-7 top-7 hidden h-px bg-emerald-950/[0.08] dark:bg-white/[0.08] lg:block"
          aria-hidden
        />
        {/* filled progress up to the current checkpoint — animates continuously like a video scrub bar */}
        <div
          className="pointer-events-none absolute left-7 top-7 hidden h-px origin-left bg-gradient-to-r from-emerald-400/80 to-emerald-500/80 transition-transform ease-linear dark:from-accent-emerald/80 dark:to-accent-emerald/80 lg:block"
          style={{
            width: "calc(100% - 3.5rem)",
            transform: `scaleX(${active / (services.length - 1)})`,
            transitionDuration: active === 0 ? "0ms" : `${STEP_MS}ms`,
          }}
          aria-hidden
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = service.icon
            const isActive = i === active
            return (
              <Reveal key={service.title} delay={i * 90}>
                <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-0">
                  <IconBadge icon={Icon} size="md" active={isActive} className="relative z-10 shadow-md" />
                  <span
                    className={cn(
                      "font-mono text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-500 lg:mt-4",
                      isActive
                        ? "text-emerald-700 dark:text-accent-emerald"
                        : "text-muted-foreground/70 dark:text-white/35"
                    )}
                  >
                    Stage {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3
                  className={cn(
                    "mt-4 font-serif text-2xl font-semibold leading-snug transition-colors duration-500 lg:mt-3",
                    isActive ? "text-emerald-800 dark:text-white" : "text-foreground/80 dark:text-white/70"
                  )}
                >
                  {service.title}
                </h3>
                <p
                  className={cn(
                    "mt-3 text-sm leading-relaxed transition-colors duration-500 md:text-base",
                    isActive ? "font-medium text-foreground dark:text-white/95" : "text-muted-foreground dark:text-white/65"
                  )}
                >
                  {service.description}
                </p>

                <ul className="mt-5 space-y-2.5 border-t border-border/60 pt-5 dark:border-white/10">
                  {service.highlights.map((h) => (
                    <li
                      key={h}
                      className={cn(
                        "flex items-start gap-2.5 text-sm transition-colors duration-500",
                        isActive ? "font-medium text-foreground dark:text-white/95" : "text-muted-foreground dark:text-white/70"
                      )}
                    >
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-emerald-500 dark:bg-accent-emerald" />
                      {h}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
