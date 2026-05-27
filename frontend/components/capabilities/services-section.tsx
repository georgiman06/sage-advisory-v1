import { Compass, Wrench, RefreshCw, LifeBuoy, type LucideIcon } from "lucide-react"

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
    <section className="relative pt-8 pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/80">
            Services
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
            How we engage
          </h2>
          <p className="mt-4 text-base text-white/70 md:text-lg">
            From strategy through long-term operations, our engagements meet you wherever you are on the data and AI journey.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className="group relative flex flex-col rounded-xl border border-white/10 bg-[#0f1815]/80 p-6 backdrop-blur-sm transition-all hover:border-emerald-400/40 hover:bg-[#121d19]/90"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-emerald-500/15">
                  <Icon className="h-5 w-5 text-emerald-400" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{service.description}</p>
                <ul className="mt-4 space-y-1.5">
                  {service.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-xs text-white/70">
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-emerald-400" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
