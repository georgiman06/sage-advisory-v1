import { Compass, Wrench, RefreshCw, LifeBuoy, type LucideIcon } from "lucide-react"
import { Section, SectionHeader } from "@/components/shared/section"
import { Reveal } from "@/components/shared/reveal"

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

export function ServicesSection() {
  return (
    <Section flushTop>
      <SectionHeader
        eyebrow="Services"
        title="How we engage"
        titleClassName="text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.08] tracking-[-0.02em]"
        intro="From strategy through long-term operations, our engagements meet you wherever you are on the data and AI journey."
      />

      {/* Engagement lifecycle — a real four-stage sequence, so a numbered rail earns its place here. */}
      <div className="relative mt-20">
        <div
          className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent dark:via-white/15 lg:block"
          aria-hidden
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <Reveal key={service.title} delay={i * 90}>
                <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-0">
                  <div className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border-2 border-emerald-400/50 bg-white shadow-md dark:border-accent-emerald/50 dark:bg-[#081a14]">
                    <Icon className="h-6 w-6 text-emerald-600 dark:text-accent-emerald" />
                  </div>
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground/70 dark:text-white/35 lg:mt-4">
                    Stage {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-4 font-serif text-2xl font-semibold leading-snug text-foreground dark:text-white lg:mt-3">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground dark:text-white/65 md:text-base">
                  {service.description}
                </p>

                <ul className="mt-5 space-y-2.5 border-t border-border/60 pt-5 dark:border-white/10">
                  {service.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-sm text-muted-foreground dark:text-white/70">
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
