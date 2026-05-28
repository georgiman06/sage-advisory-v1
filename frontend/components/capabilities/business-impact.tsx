import { TrendingUp, Users, Clock, ShieldCheck, type LucideIcon } from "lucide-react"

type Impact = {
  icon: LucideIcon
  title: string
  description: string
}

const impacts: Impact[] = [
  {
    icon: TrendingUp,
    title: "Operational Excellence",
    description: "Significant operational cost optimization through platform modernization and intelligent automation.",
  },
  {
    icon: Users,
    title: "Enterprise Adoption",
    description: "Enterprise-scale analytics adoption and self-service enablement across thousands of users.",
  },
  {
    icon: Clock,
    title: "Speed to Insight",
    description: "Reduction in time-to-insight from weeks to minutes through modern data architectures.",
  },
  {
    icon: ShieldCheck,
    title: "Governance & Compliance",
    description: "Improved governance frameworks and regulatory compliance across global operations.",
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
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Business Impact
          </h2>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {impacts.map((impact) => {
            const Icon = impact.icon
            return (
              <div
                key={impact.title}
                className="flex flex-col rounded-xl border border-white/10 bg-[#162923]/80 p-6 backdrop-blur-sm transition-all hover:border-emerald-400/40 hover:bg-[#1a3027]/90"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-emerald-500/15">
                  <Icon className="h-5 w-5 text-emerald-400" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{impact.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{impact.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
