import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export const metadata = {
  title: "Case Studies | Sage Advisory LLC",
  description: "Real-world examples of enterprise data transformation and measurable business impact.",
}

const caseStudies = [
  {
    industry: "Financial Services",
    title: "Global Bank Data Platform Modernization",
    challenge: "Legacy data warehouse limiting analytics capabilities and driving $15M+ in annual licensing costs.",
    solution: "Implemented cloud-native data lakehouse architecture with real-time streaming capabilities.",
    results: [
      "60% reduction in data processing time",
      "$8.2M annual cost savings",
      "Real-time fraud detection capabilities",
      "95% improvement in data quality scores",
    ],
    testimonial: {
      quote: "Sage Advisory transformed our data infrastructure from a cost center to a competitive advantage. The ROI exceeded our projections within the first year.",
      author: "Chief Data Officer",
      company: "Fortune 100 Bank",
    },
  },
  {
    industry: "Healthcare",
    title: "Healthcare Analytics Platform Transformation",
    challenge: "Siloed patient data across 200+ systems preventing unified patient view and predictive care capabilities.",
    solution: "Built enterprise data mesh with federated governance and AI-powered patient insights platform.",
    results: [
      "Unified view of 50M+ patient records",
      "30% reduction in readmission rates",
      "4x faster clinical decision support",
      "HIPAA-compliant data sharing across network",
    ],
    testimonial: {
      quote: "The patient insights platform has fundamentally changed how we deliver care. We can now predict and prevent adverse events before they occur.",
      author: "VP of Digital Health",
      company: "Regional Health System",
    },
  },
  {
    industry: "Retail",
    title: "Omnichannel Retail Intelligence",
    challenge: "Disconnected e-commerce and in-store data preventing personalized customer experiences and inventory optimization.",
    solution: "Deployed unified customer data platform with real-time inventory and AI-powered recommendation engine.",
    results: [
      "23% increase in customer lifetime value",
      "40% improvement in inventory turnover",
      "Real-time personalization across channels",
      "$45M incremental annual revenue",
    ],
    testimonial: {
      quote: "We finally have a single source of truth for our customers. The personalization capabilities have transformed our customer relationships.",
      author: "Chief Digital Officer",
      company: "National Retail Chain",
    },
  },
  {
    industry: "Energy",
    title: "Utility Grid Analytics Modernization",
    challenge: "Aging infrastructure and manual processes limiting ability to integrate renewable sources and predict outages.",
    solution: "Implemented IoT data platform with predictive maintenance and grid optimization algorithms.",
    results: [
      "45% reduction in unplanned outages",
      "30% faster renewable integration",
      "Predictive maintenance saving $12M annually",
      "Real-time grid visibility across 5M meters",
    ],
    testimonial: {
      quote: "Sage helped us modernize our grid operations while maintaining reliability. We are now leading the industry in smart grid capabilities.",
      author: "SVP of Operations",
      company: "Major Utility Provider",
    },
  },
]

const impactMetrics = [
  { value: "$2.1B+", label: "Client Value Delivered" },
  { value: "150+", label: "Successful Engagements" },
  { value: "40%", label: "Average Cost Reduction" },
  { value: "6-9 mo", label: "Typical Time to ROI" },
]

export default function CaseStudiesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="bg-[#1a3a2f]">
        <Header activePage="case-studies" variant="dark" />
        
        {/* Hero Section */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">Case Studies</h1>
            <p className="mt-4 max-w-2xl text-lg text-white/80">
              Real-world examples of enterprise data transformation delivering measurable business impact.
            </p>
          </div>
        </section>
      </div>
      
      <main className="flex-1">
        {/* Impact Metrics */}
        <section className="border-b border-border bg-muted/30 py-12">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {impactMetrics.map((metric) => (
                <div key={metric.label} className="text-center">
                  <p className="text-3xl font-bold">{metric.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="space-y-12">
              {caseStudies.map((study, index) => (
                <Card key={index} className="border-border overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2">
                      {/* Left Column */}
                      <div className="border-b border-border p-8 md:border-b-0 md:border-r">
                        <Badge variant="secondary">{study.industry}</Badge>
                        <h3 className="mt-4 text-xl font-semibold">{study.title}</h3>
                        
                        <div className="mt-6">
                          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Challenge</h4>
                          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{study.challenge}</p>
                        </div>
                        
                        <div className="mt-6">
                          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Solution</h4>
                          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{study.solution}</p>
                        </div>
                      </div>
                      
                      {/* Right Column */}
                      <div className="p-8">
                        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Results</h4>
                        <ul className="mt-4 space-y-2">
                          {study.results.map((result, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-foreground" />
                              {result}
                            </li>
                          ))}
                        </ul>
                        
                        <div className="mt-8 rounded-lg bg-muted/50 p-4">
                          <p className="text-sm italic text-muted-foreground leading-relaxed">
                            &ldquo;{study.testimonial.quote}&rdquo;
                          </p>
                          <p className="mt-3 text-sm font-medium">
                            {study.testimonial.author}
                          </p>
                          <p className="text-xs text-muted-foreground">{study.testimonial.company}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-border bg-muted/30 py-20">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <h2 className="text-2xl font-semibold">Ready to Write Your Success Story?</h2>
            <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
              Let&apos;s discuss how we can deliver similar results for your organization.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/contact">Schedule a Consultation</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/capabilities">View Our Capabilities</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
