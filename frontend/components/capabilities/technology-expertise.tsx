import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const technologies = [
  {
    category: "Cloud Platforms",
    items: ["AWS", "Microsoft Azure", "Snowflake", "Microsoft Fabric"]
  },
  {
    category: "Analytics Platforms",
    items: ["Power BI", "Tableau", "Oracle Analytics", "Enterprise BI platforms"]
  },
  {
    category: "Data Governance",
    items: ["Collibra", "Alation", "Metadata management platforms"]
  },
  {
    category: "Development & Engineering",
    items: ["Python", "SQL", "Data pipeline frameworks", "Enterprise integration platforms"]
  }
]

export function TechnologyExpertise() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Technology Expertise</h2>
        <p className="mt-4 text-muted-foreground">
          Our teams work with modern enterprise data and analytics technologies.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {technologies.map((tech, index) => (
            <Card key={index} className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{tech.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tech.items.map((item, itemIndex) => (
                    <Badge key={itemIndex} variant="secondary" className="font-normal">
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
