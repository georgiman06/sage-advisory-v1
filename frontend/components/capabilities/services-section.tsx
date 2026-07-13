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
        intro="From strategy through long-term operations, our engagements meet you wherever you are on the data and AI journey."
      />

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, i) => {
          const Icon = service.icon
          return (
            <Reveal key={service.title} delay={i * 70} className="h-full">
              <div className="group relative flex h-full flex-col rounded-2xl border border-border dark:border-white/10 bg-card dark:bg-[#10231c]/80 p-7 backdrop-blur-sm transition-all hover:border-emerald-400/40 dark:hover:border-accent-emerald/40 hover:bg-emerald-50/50 dark:hover:bg-[#183028]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15 ring-1 ring-emerald-400/20 dark:ring-accent-emerald/20">
                  <Icon className="h-6 w-6 text-emerald-500 dark:text-accent-emerald" />
                </div>
                <h3 className="mt-6 font-serif text-xl font-semibold text-foreground dark:text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground dark:text-white/65">{service.description}</p>
                <ul className="mt-5 space-y-2 border-t border-border/60 dark:border-white/10 pt-5">
                  {service.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-xs text-muted-foreground dark:text-white/70">
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-emerald-500 dark:bg-accent-emerald" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
