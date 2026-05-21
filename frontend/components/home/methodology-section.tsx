import Link from "next/link"
import { Button } from "@/components/ui/button"

const stages = [
  {
    number: "01",
    title: "Foundational Integrity",
    description: "Establishing governance and security frameworks to eliminate data debt.",
  },
  {
    number: "02",
    title: "Unified Integration",
    description: "Consolidating fragmented silos into scalable Cloud Lakehouse architectures.",
  },
  {
    number: "03",
    title: "Advanced Intelligence",
    description: "Deploying self-service analytics and predictive modeling capabilities.",
  },
  {
    number: "04",
    title: "Cognitive Autonomy",
    description: "Scaling AI agents and GenAI to automate enterprise decision-making.",
  },
]

export function MethodologySection() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Our Methodology
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight">
            The V2V Transformation Framework
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Our proprietary Velocity-to-Value methodology accelerates enterprise data maturity through four proven stages.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage) => (
            <div
              key={stage.number}
              className="rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-md"
            >
              <span className="text-sm font-bold text-primary">{stage.number}</span>
              <h3 className="mt-2 font-semibold">{stage.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{stage.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-border bg-card p-8 text-center">
          <h3 className="text-lg font-semibold">Velocity-to-Value</h3>
          <p className="mt-1 text-2xl font-bold">From Raw Data to Strategic Asset</p>
          <p className="mt-2 text-muted-foreground">Average ROI realized within 6-9 months</p>
          <Button className="mt-6" asChild>
            <Link href="/methodology">Explore the V2V Framework</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
