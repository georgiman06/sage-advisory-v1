import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Linkedin } from "lucide-react"
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

const founder = {
  name: "Sangeeth Thuruthippallil",
  role: "Founder & Managing Partner",
  location: "Coppell, Texas",
  bio: "Strategic data and analytics executive with 20+ years of experience leading enterprise-scale digital transformation across financial services, technology, healthcare, retail, and utilities.",
  background: [
    "Vice President, Enterprise Data Analytics & Visualization — Fidelity Investments",
    "Oracle Consulting",
    "B.Tech, Cochin University of Science and Technology",
  ],
  linkedin: "https://www.linkedin.com/in/sangeeth-thuruthippallil/",
}

const topSkills = [
  "Enterprise Data & Analytics Strategy",
  "Digital, Cloud & AI Transformation",
  "Analytics Governance, Risk & Compliance",
  "Value Creation, Cost Optimization & Operational Efficiency",
  "Data-Driven Culture & Change Leadership",
]

const stats = [
  { value: "$2.1B+", label: "Client Value Delivered" },
  { value: "150+", label: "Enterprise Clients" },
  { value: "95%", label: "Client Retention Rate" },
  { value: "12", label: "Years of Excellence" },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative bg-gradient-to-b from-[#22513f] via-[#143028] to-[#0d1e17]">
        <Header activePage="about" variant="dark" />
        
        {/* Hero Section */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">About Sage Advisory</h1>
                <p className="mt-4 max-w-2xl text-lg text-white/80">
                  We are a specialized consulting firm focused exclusively on enterprise data strategy,
                  AI transformation, and cloud modernization.
                </p>
              </div>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-emerald-400/25 bg-[#162923]/60 shadow-2xl">
                {/* Drop image at frontend/public/images/about-hero.jpg, then replace
                    this placeholder block with:
                    <img src="/images/about-hero.jpg" alt="Sage Advisory team"
                         className="h-full w-full object-cover" /> */}
                <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-[0.2em] text-emerald-400/70">
                  Team photo
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/80">
                  Vision
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
                  A wisdom-driven future
                </h2>
                <p className="mt-4 leading-relaxed text-white/70">
                  To shape a future where wisdom-driven decisions create enduring competitive
                  advantage through data, AI, and decentralized innovation.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/80">
                  Mission
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
                  From complexity to clarity
                </h2>
                <p className="mt-4 leading-relaxed text-white/70">
                  Sage Advisory empowers organizations to turn complexity into clarity by combining
                  strategic wisdom, deep analytical insight, agentic &amp; emerging technologies, and
                  execution excellence to deliver measurable business outcomes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y border-white/10 py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-bold text-white md:text-4xl">{stat.value}</p>
                  <p className="mt-1 text-sm text-white/65">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/80">
              Principles
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
              Our values
            </h2>
            <p className="mt-2 text-white/65">The principles that guide everything we do.</p>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="rounded-xl border border-white/10 bg-[#162923]/80 p-6 backdrop-blur-sm transition-all hover:border-emerald-400/40 hover:bg-[#1a3027]/90"
                >
                  <h3 className="font-semibold text-white">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="border-t border-white/10 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/80">
              Leadership
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
              Meet the founder
            </h2>

            <Card className="mt-10 border-emerald-400/25 bg-[#162923]/80 backdrop-blur-sm">
              <CardContent className="p-6 md:p-10">
                <div className="grid items-start gap-8 md:grid-cols-[280px_1fr]">
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-emerald-400/25 bg-[#13241d]">
                    {/* Drop portrait at frontend/public/images/sangeeth.jpg, then
                        replace this placeholder with:
                        <img src="/images/sangeeth.jpg" alt="Sangeeth Thuruthippallil"
                             className="h-full w-full object-cover" /> */}
                    <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-[0.2em] text-emerald-400/70">
                      Portrait
                    </div>
                  </div>

                  <div className="relative">
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Sangeeth Thuruthippallil on LinkedIn"
                      className="absolute right-0 top-0 text-white/50 hover:text-emerald-400"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <h3 className="text-2xl font-semibold text-white">{founder.name}</h3>
                    <p className="mt-1 text-sm text-emerald-300/90">{founder.role}</p>
                    <p className="mt-1 text-xs text-white/50">{founder.location}</p>
                    <p className="mt-5 leading-relaxed text-white/75">{founder.bio}</p>

                    <ul className="mt-6 space-y-2">
                      {founder.background.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-white/65">
                          <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-emerald-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Top Skills Section */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/80">
              Expertise
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
              Top skills we lead with
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-white/70">
              Drawn from two decades of enterprise transformation work — these are the disciplines our founder brings to every engagement.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {topSkills.map((skill) => (
                <div
                  key={skill}
                  className="rounded-lg border border-white/10 bg-[#162923]/80 p-5 backdrop-blur-sm transition-all hover:border-emerald-400/40 hover:bg-[#1a3027]/90"
                >
                  <p className="text-sm font-medium text-white">{skill}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">Ready to partner with us?</h2>
            <p className="mx-auto mt-2 max-w-xl text-white/65">
              Let&apos;s discuss how Sage Advisory can help accelerate your data transformation journey.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/contact">Schedule a Consultation</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-emerald-400/40 bg-transparent text-emerald-100 hover:bg-emerald-400/10 hover:text-white"
              >
                <Link href="/capabilities">View Our Capabilities</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
