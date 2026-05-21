import { CapabilityCard } from "./capability-card"
import { Database, Cloud, BarChart3, Brain, Shield, ServerCog } from "lucide-react"

const capabilities = [
  {
    title: "Enterprise Data Strategy",
    description: "Design and implement enterprise-wide data strategies that align technology investments with business outcomes.",
    servicesLabel: "Services Include:",
    services: [
      "Data operating model design",
      "Data platform roadmap development",
      "Enterprise data architecture",
      "Data product strategy",
      "Data monetization frameworks"
    ],
    icon: <Database className="h-6 w-6" />
  },
  {
    title: "Cloud Data Platforms",
    description: "Build scalable and secure data platforms leveraging modern cloud technologies.",
    servicesLabel: "Capabilities Include:",
    services: [
      "Cloud data warehouse implementation",
      "Multicloud analytics architecture",
      "Data lakehouse platforms",
      "Data integration pipelines",
      "Platform modernization and migration"
    ],
    icon: <Cloud className="h-6 w-6" />
  },
  {
    title: "Analytics & Business Intelligence",
    description: "Enable self-service analytics and modern BI capabilities across the enterprise.",
    servicesLabel: "Services Include:",
    services: [
      "Enterprise BI modernization",
      "Self-service analytics enablement",
      "Data visualization platforms",
      "Analytics governance frameworks",
      "Executive dashboards and reporting"
    ],
    icon: <BarChart3 className="h-6 w-6" />
  },
  {
    title: "Artificial Intelligence & Advanced Analytics",
    description: "Embed AI and advanced analytics into enterprise decision-making processes.",
    servicesLabel: "Solutions Include:",
    services: [
      "Predictive analytics models",
      "Machine learning platforms",
      "Generative AI integration",
      "Intelligent automation solutions",
      "Customer analytics and insights"
    ],
    icon: <Brain className="h-6 w-6" />
  },
  {
    title: "Data Governance & Compliance",
    description: "Establish governance frameworks that ensure trust, security, and compliance across the data ecosystem.",
    servicesLabel: "Capabilities Include:",
    services: [
      "Data governance operating models",
      "Data quality frameworks",
      "Metadata management",
      "Regulatory compliance support",
      "Data security and privacy programs"
    ],
    icon: <Shield className="h-6 w-6" />
  },
  {
    title: "Cloud Architecture",
    description: "Design resilient, scalable cloud-native architectures for enterprise data workloads.",
    servicesLabel: "Services Include:",
    services: [
      "Multi-cloud strategy development",
      "Data integration architecture",
      "Infrastructure optimization",
      "Cloud cost management",
      "Security and compliance architecture"
    ],
    icon: <ServerCog className="h-6 w-6" />
  }
]

export function CapabilitiesGrid() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability, index) => (
            <CapabilityCard key={index} {...capability} />
          ))}
        </div>
      </div>
    </section>
  )
}
