import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const insights = [
  {
    category: "AI & ROI",
    title: "The $10M Optimization Playbook",
    description: "Strategies for license consolidation and multicloud cost management.",
  },
  {
    category: "Governance",
    title: "Governance as an Accelerator",
    description: "How modern metadata frameworks speed up dev-cycles by 20%.",
  },
  {
    category: "Automation",
    title: "Beyond RPA: Agentic Workflows",
    description: "The next frontier of autonomous enterprise productivity.",
  },
]

export function InsightsSection() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Strategic Insights</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Expert perspectives on AI, Governance, and the Future of Enterprise Data.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {insights.map((insight) => (
            <Card
              key={insight.title}
              className="cursor-pointer transition-shadow hover:shadow-md"
            >
              <CardHeader>
                <Badge variant="outline" className="w-fit">
                  {insight.category}
                </Badge>
                <h3 className="mt-4 text-lg font-semibold">{insight.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
