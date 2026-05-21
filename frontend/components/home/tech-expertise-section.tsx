import { Badge } from "@/components/ui/badge"

const techCategories = [
  {
    title: "Cloud & Platforms",
    items: ["AWS", "Azure", "Snowflake", "Microsoft Fabric"],
  },
  {
    title: "Analytics & BI",
    items: ["Power BI", "Tableau", "Oracle Analytics", "SQL"],
  },
  {
    title: "Governance",
    items: ["Collibra", "Alation", "Metadata Management"],
  },
  {
    title: "Engineering",
    items: ["Python", "RPA", "Data Pipeline Frameworks"],
  },
]

export function TechExpertiseSection() {
  return (
    <section className="bg-muted/30 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Technology Expertise</h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {techCategories.map((category) => (
            <div key={category.title} className="text-center">
              <h3 className="font-semibold">{category.title}</h3>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {category.items.map((item) => (
                  <Badge key={item} variant="secondary">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
