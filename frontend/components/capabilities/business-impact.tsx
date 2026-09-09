import { Compass, TrendingUp, BrainCircuit, ShieldCheck, type LucideIcon } from "lucide-react"
import { Section, SectionHeader } from "@/components/shared/section"
import { Reveal } from "@/components/shared/reveal"

type Impact = {
  icon: LucideIcon
  title: string
  description: string
}

const impacts: Impact[] = [
  {
    icon: Compass,
    title: "Strategic Clarity",
    description: "Cut through complexity to align technology investments with business priorities and long-term vision.",
  },
  {
    icon: TrendingUp,
    title: "AI-Driven Growth",
    description: "Turn AI initiatives into measurable business impact and sustained competitive advantage.",
  },
  {
    icon: BrainCircuit,
    title: "Intelligent Decision-Making",
    description: "Enable faster, data-backed decisions across the enterprise with trusted analytics and insight.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Digital Innovation",
    description: "Adopt decentralized and emerging technologies securely, transparently, and with confidence.",
  },
]

export function BusinessImpact() {
  return (
    <Section>
      <SectionHeader
        eyebrow="Outcomes"
        title="The value we create"
        intro="Every engagement is measured by the advantage it creates: clarity, growth, better decisions, and technology adopted with confidence."
      />
      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {impacts.map((impact, i) => {
          const Icon = impact.icon
          return (
            <Reveal key={impact.title} delay={i * 70} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-border dark:border-white/10 bg-card dark:bg-[#10231c]/80 p-8 backdrop-blur-sm transition-all hover:border-emerald-400/40 dark:hover:border-accent-emerald/40 hover:bg-emerald-50/50 dark:hover:bg-[#183028]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15 ring-1 ring-emerald-400/20 dark:ring-accent-emerald/20">
                  <Icon className="h-6 w-6 text-emerald-500 dark:text-accent-emerald" />
                </div>
                <h3 className="mt-6 font-serif text-xl font-semibold text-foreground dark:text-white">{impact.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground dark:text-white/65">{impact.description}</p>
              </div>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
