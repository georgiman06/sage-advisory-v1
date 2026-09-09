import Link from "next/link"
import {
  Database,
  Brain,
  BarChart3,
  Shield,
  Cloud,
  Briefcase,
  ArrowRight,
  type LucideIcon,
} from "lucide-react"
import { Section, SectionHeader } from "@/components/shared/section"
import { Reveal } from "@/components/shared/reveal"

type Capability = {
  icon: LucideIcon
  title: string
  description: string
}

const capabilities: Capability[] = [
  {
    icon: Database,
    title: "Enterprise Data Strategy",
    description: "Data strategies, operating models, and modern platforms for trusted, scalable decisions.",
  },
  {
    icon: Brain,
    title: "AI Strategy & Transformation",
    description: "Identify, prioritize, and scale high-value AI initiatives, from GenAI pilots to responsible governance.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Decision Intelligence",
    description: "Analytics and predictive models that shorten the path from data to decision.",
  },
  {
    icon: Shield,
    title: "Digital Trust & Decentralized Tech",
    description: "Blockchain, decentralized identity, and smart contracts for trusted ecosystems.",
  },
  {
    icon: Cloud,
    title: "Modern Data & AI Platforms",
    description: "Cloud-native platforms engineered for scale, security, and performance.",
  },
  {
    icon: Briefcase,
    title: "Executive Technology Advisory",
    description: "Advise boards and executive teams on technology strategy and investment priorities.",
  },
]

export function CapabilitiesPreview() {
  return (
    <Section className="bg-white dark:bg-[#081a14]">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeader
          eyebrow="What we do"
          title="Six capabilities, one advisory team"
          intro="Strategic advisory and hands-on implementation across the full data and AI lifecycle."
        />
        <Link
          href="/capabilities"
          className="group inline-flex items-center gap-2 whitespace-nowrap font-mono text-xs font-medium uppercase tracking-[0.18em] text-emerald-600 dark:text-accent-emerald transition-colors hover:text-emerald-700 dark:hover:text-accent-emerald-strong"
        >
          View all capabilities
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((cap, i) => {
          const Icon = cap.icon
          return (
            <Reveal key={cap.title} delay={i * 70}>
              <Link
                href="/capabilities"
                className="group flex h-full flex-col rounded-2xl border border-border dark:border-white/10 bg-card dark:bg-[#10231c] p-8 transition-all hover:border-emerald-400/40 dark:hover:border-accent-emerald/40 hover:bg-emerald-50/50 dark:hover:bg-[#183028]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 dark:bg-accent-emerald/10 ring-1 ring-emerald-400/20 dark:ring-accent-emerald/20 transition-colors group-hover:bg-emerald-500/15 dark:group-hover:bg-accent-emerald/15">
                  <Icon className="h-6 w-6 text-emerald-600 dark:text-accent-emerald" />
                </div>
                <h3 className="mt-6 font-serif text-xl font-semibold text-foreground dark:text-white">
                  {cap.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground dark:text-white/60">
                  {cap.description}
                </p>
              </Link>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
