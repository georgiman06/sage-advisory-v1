import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export const metadata = {
  title: "About Us | Sage Advisory LLC",
  description: "Learn about Sage Advisory's mission, leadership team, and commitment to enterprise data transformation.",
}

const values = [
  {
    title: "Strategic Excellence",
    description: "We combine deep technical expertise with business acumen to deliver solutions that drive measurable outcomes.",
  },
  {
    title: "Partnership Approach",
    description: "We work alongside your teams, transferring knowledge and building internal capabilities that last.",
  },
  {
    title: "Innovation Focus",
    description: "We stay at the forefront of data and AI technologies to bring cutting-edge solutions to our clients.",
  },
  {
    title: "Results Driven",
    description: "Every engagement is measured by the tangible business impact we deliver to our clients.",
  },
]

const leadership = [
  {
    name: "Alexandra Chen",
    role: "Managing Partner",
    bio: "Former Chief Data Officer at Fortune 100 financial services firm. 20+ years leading enterprise data transformations.",
  },
  {
    name: "Marcus Williams",
    role: "Partner, Technology",
    bio: "Ex-Microsoft and AWS. Architect of cloud data platforms processing petabytes daily for global enterprises.",
  },
  {
    name: "Sarah Mitchell",
    role: "Partner, Strategy",
    bio: "McKinsey alumna. Specializes in data monetization strategies and AI-driven business model innovation.",
  },
  {
    name: "David Park",
    role: "Partner, Delivery",
    bio: "Former Accenture practice lead. Expert in large-scale program delivery and organizational change management.",
  },
]

const stats = [
  { value: "$2.1B+", label: "Client Value Delivered" },
  { value: "150+", label: "Enterprise Clients" },
  { value: "95%", label: "Client Retention Rate" },
  { value: "12", label: "Years of Excellence" },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="bg-[#1a3a2f]">
        <Header activePage="about" variant="dark" />
        
        {/* Hero Section */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">About Sage Advisory</h1>
            <p className="mt-4 max-w-2xl text-lg text-white/80">
              We are a specialized consulting firm focused exclusively on enterprise data strategy, 
              AI transformation, and cloud modernization.
            </p>
          </div>
        </section>
      </div>

      <main className="flex-1">
        {/* Mission Section */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <h2 className="text-2xl font-semibold">Our Mission</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  To empower enterprises to unlock the full value of their data through strategic 
                  advisory and hands-on implementation. We bridge the gap between vision and 
                  execution, helping organizations transform their data capabilities into 
                  sustainable competitive advantages.
                </p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Founded by industry veterans who saw a need for consulting that combines deep 
                  technical expertise with strategic business acumen, Sage Advisory has grown 
                  to become a trusted partner for Fortune 500 companies navigating their data 
                  transformation journeys.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Why Sage?</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Unlike traditional consulting firms that offer generalized advice, we specialize 
                  exclusively in data and AI. This singular focus allows us to maintain deep 
                  expertise across the rapidly evolving technology landscape.
                </p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Our V2V Framework methodology has been refined through hundreds of engagements, 
                  providing a proven approach to transformation that balances quick wins with 
                  long-term strategic value.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y border-border bg-muted/30 py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-bold md:text-4xl">{stat.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-2xl font-semibold">Our Values</h2>
            <p className="mt-2 text-muted-foreground">The principles that guide everything we do.</p>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {values.map((value) => (
                <Card key={value.title} className="border-border">
                  <CardContent className="p-6">
                    <h3 className="font-semibold">{value.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="border-t border-border bg-muted/30 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-2xl font-semibold">Leadership Team</h2>
            <p className="mt-2 text-muted-foreground">Industry veterans with decades of combined experience.</p>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {leadership.map((leader) => (
                <Card key={leader.name} className="border-border bg-background">
                  <CardContent className="p-6">
                    <h3 className="font-semibold">{leader.name}</h3>
                    <p className="text-sm text-muted-foreground">{leader.role}</p>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{leader.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <h2 className="text-2xl font-semibold">Ready to Partner With Us?</h2>
            <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
              Let&apos;s discuss how Sage Advisory can help accelerate your data transformation journey.
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
