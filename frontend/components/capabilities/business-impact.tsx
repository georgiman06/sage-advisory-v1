import { Compass, TrendingUp, BrainCircuit, ShieldCheck, type LucideIcon } from "lucide-react"

type Impact = {
  icon: LucideIcon
  title: string
  description: string
}

const impacts: Impact[] = [
  {
    icon: Compass,
    title: "Strategic Clarity",
    description: "Cut through complexity to align technology investments with business priorities and long-term vision.",
  },
  {
    icon: TrendingUp,
    title: "AI-Driven Growth",
    description: "Turn AI initiatives into measurable business impact and sustained competitive advantage.",
  },
  {
    icon: BrainCircuit,
    title: "Intelligent Decision-Making",
    description: "Enable faster, data-backed decisions across the enterprise with trusted analytics and insight.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Digital Innovation",
    description: "Adopt decentralized and emerging technologies securely, transparently, and with confidence.",
  },
]

export function BusinessImpact() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/80">
            Outcomes
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground dark:text-white md:text-4xl">
            The Value We Create
          </h2>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {impacts.map((impact) => {
            const Icon = impact.icon
            return (
              <div
                key={impact.title}
                className="flex flex-col rounded-xl border border-border dark:border-white/10 bg-card dark:bg-[#162923]/80 p-6 backdrop-blur-sm transition-all hover:border-emerald-400/40 hover:bg-emerald-50/50 dark:hover:bg-[#1a3027]/90"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-emerald-500/15">
                  <Icon className="h-5 w-5 text-emerald-400" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground dark:text-white">{impact.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground dark:text-white/65">{impact.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
