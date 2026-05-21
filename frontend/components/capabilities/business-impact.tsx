import { TrendingUp, Users, Clock, ShieldCheck } from "lucide-react"

const impacts = [
  {
    title: "Operational Excellence",
    description: "Significant operational cost optimization through platform modernization and intelligent automation.",
    icon: <TrendingUp className="h-6 w-6" />
  },
  {
    title: "Enterprise Adoption",
    description: "Enterprise-scale analytics adoption and self-service enablement across thousands of users.",
    icon: <Users className="h-6 w-6" />
  },
  {
    title: "Speed to Insight",
    description: "Reduction in time-to-insight from weeks to minutes through modern data architectures.",
    icon: <Clock className="h-6 w-6" />
  },
  {
    title: "Governance & Compliance",
    description: "Improved governance frameworks and regulatory compliance across global operations.",
    icon: <ShieldCheck className="h-6 w-6" />
  }
]

export function BusinessImpact() {
  return (
    <section className="bg-muted/50 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Business Impact</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {impacts.map((impact, index) => (
            <div key={index} className="flex flex-col">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                {impact.icon}
              </div>
              <h3 className="text-lg font-semibold">{impact.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{impact.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
