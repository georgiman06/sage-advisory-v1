import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, Cloud, BarChart3, Brain, Shield, Server } from "lucide-react"

const capabilities = [
  {
    icon: Database,
    title: "Enterprise Data Strategy",
    description: "Design and implement enterprise-wide data strategies that align technology investments with business outcomes.",
    features: ["Data operating model design", "Platform roadmap development", "Data product strategy"],
  },
  {
    icon: Cloud,
    title: "Cloud Data Platforms",
    description: "Build scalable and secure data platforms leveraging modern cloud technologies.",
    features: ["Multicloud analytics (AWS/Azure)", "Data Lakehouse implementation", "Platform modernization & migration"],
  },
  {
    icon: BarChart3,
    title: "Analytics & Business Intelligence",
    description: "Enable self-service analytics and modern BI capabilities across the enterprise.",
    features: ["Enterprise BI modernization", "Self-service analytics enablement", "Executive dashboards & reporting"],
  },
  {
    icon: Brain,
    title: "AI & Advanced Analytics",
    description: "Embed AI and advanced analytics into enterprise decision-making processes.",
    features: ["Generative AI integration", "Predictive modeling", "Intelligent automation solutions"],
  },
  {
    icon: Shield,
    title: "Data Governance & Compliance",
    description: "Establish governance frameworks that ensure trust, security, and compliance.",
    features: ["Data governance operating models", "Data quality frameworks", "Regulatory compliance support"],
  },
  {
    icon: Server,
    title: "Cloud Architecture",
    description: "Design resilient, scalable cloud-native architectures for enterprise data workloads.",
    features: ["Multi-cloud strategy", "Data integration pipelines", "Infrastructure optimization"],
  },
]

export function CapabilitiesSection() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Core Capabilities</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            We combine strategic advisory with hands-on implementation to deliver measurable business impact across six core areas.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability) => (
            <Card key={capability.title} className="transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <capability.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="mt-4 text-lg">{capability.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{capability.description}</p>
                <ul className="mt-4 space-y-2">
                  {capability.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
