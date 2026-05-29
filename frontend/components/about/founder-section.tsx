import { Linkedin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

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

export function FounderSection() {
  return (
    <>
      {/* Founder */}
      <section className="border-t border-border dark:border-white/10 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-base font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400/80">
            Leadership
          </p>
          <h2 className="mt-4 text-5xl font-bold tracking-tight text-foreground dark:text-white md:text-6xl">
            Meet the founder
          </h2>

          <Card className="mt-12 border-emerald-200 dark:border-emerald-400/25 bg-white/80 dark:bg-[#162923]/80 backdrop-blur-sm">
            <CardContent className="p-8 md:p-12">
              <div className="grid items-start gap-10 md:grid-cols-[320px_1fr]">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-emerald-300 dark:border-emerald-400/25 bg-emerald-50 dark:bg-[#13241d]">
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
                    className="absolute right-0 top-0 text-muted-foreground dark:text-white/50 hover:text-emerald-500 dark:hover:text-emerald-400"
                  >
                    <Linkedin className="h-7 w-7" />
                  </a>
                  <h3 className="text-4xl font-bold text-foreground dark:text-white md:text-5xl">
                    {founder.name}
                  </h3>
                  <p className="mt-2 text-2xl font-semibold text-emerald-600 dark:text-emerald-300/90">
                    {founder.role}
                  </p>
                  <p className="mt-1 text-lg text-muted-foreground dark:text-white/50">
                    {founder.location}
                  </p>
                  <p className="mt-6 text-xl leading-relaxed text-muted-foreground dark:text-white/75 md:text-2xl">
                    {founder.bio}
                  </p>

                  <ul className="mt-8 space-y-3">
                    {founder.background.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-xl text-muted-foreground dark:text-white/65">
                        <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
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

      {/* Top Skills */}
      <section className="relative overflow-hidden py-32 md:min-h-[640px]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          src="/videos/expertise-bg.mp4"
        />
        <div className="absolute inset-0 bg-[#0d1f1a]/80" />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <p className="text-base font-bold uppercase tracking-[0.2em] text-emerald-400/80">
            Expertise
          </p>
          <h2 className="mt-4 text-5xl font-bold tracking-tight text-white md:text-6xl">
            Top skills we lead with
          </h2>
          <p className="mt-5 max-w-3xl text-xl leading-relaxed text-white/70 md:text-2xl">
            Drawn from two decades of enterprise transformation work — these are the disciplines our founder brings to every engagement.
          </p>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topSkills.map((skill) => (
              <div
                key={skill}
                className="rounded-lg border border-white/10 bg-white/10 p-6 backdrop-blur-sm transition-all hover:border-emerald-400/40 hover:bg-white/15"
              >
                <p className="text-xl font-semibold text-white">{skill}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
