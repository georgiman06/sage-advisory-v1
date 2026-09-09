import Link from "next/link"
import {
  Database,
  Brain,
  BarChart3,
  Shield,
  Cloud,
  Briefcase,
  ArrowRight,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react"
import { Section, SectionHeader } from "@/components/shared/section"
import { Reveal } from "@/components/shared/reveal"

type Capability = {
  icon: LucideIcon
  tag: string
  title: string
  description: string
}

const capabilities: Capability[] = [
  {
    icon: Database,
    tag: "Strategy",
    title: "Enterprise Data Strategy",
    description: "Data strategies, operating models, and modern platforms for trusted, scalable decisions.",
  },
  {
    icon: Brain,
    tag: "AI",
    title: "AI Strategy & Transformation",
    description: "Identify, prioritize, and scale high-value AI initiatives, from GenAI pilots to responsible governance.",
  },
  {
    icon: BarChart3,
    tag: "Analytics",
    title: "Analytics & Decision Intelligence",
    description: "Analytics and predictive models that shorten the path from data to decision.",
  },
  {
    icon: Shield,
    tag: "Trust",
    title: "Digital Trust & Decentralized Tech",
    description: "Blockchain, decentralized identity, and smart contracts for trusted ecosystems.",
  },
  {
    icon: Cloud,
    tag: "Platforms",
    title: "Modern Data & AI Platforms",
    description: "Cloud-native platforms engineered for scale, security, and performance.",
  },
  {
    icon: Briefcase,
    tag: "Advisory",
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
          titleClassName="text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.08] tracking-[-0.02em]"
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
            <Reveal key={cap.title} delay={i * 70} className="h-full">
              <Link
                href="/capabilities"
                className="group relative flex h-full flex-col rounded-2xl border border-emerald-950/[0.08] dark:border-white/10 bg-card dark:bg-[#10231c] p-8 shadow-[0_1px_2px_rgba(16,35,28,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-emerald-400/50 dark:hover:border-accent-emerald/40 hover:shadow-[0_24px_48px_-16px_rgba(16,185,129,0.25)] dark:hover:shadow-[0_24px_48px_-16px_rgba(0,0,0,0.55)]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 dark:bg-accent-emerald/10 ring-1 ring-emerald-400/20 dark:ring-accent-emerald/20 transition-colors group-hover:bg-emerald-500/15 dark:group-hover:bg-accent-emerald/15">
                    <Icon className="h-6 w-6 text-emerald-600 dark:text-accent-emerald" />
                  </div>
                  <span className="rounded-full border border-emerald-400/25 dark:border-accent-emerald/20 bg-emerald-50/70 dark:bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-700/80 dark:text-white/50">
                    {cap.tag}
                  </span>
                </div>
                <h3 className="mt-6 min-h-[3.25rem] font-serif text-xl font-semibold leading-snug text-foreground dark:text-white">
                  {cap.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground dark:text-white/60">
                  {cap.description}
                </p>
                <div className="mt-6 flex items-center gap-1.5 border-t border-border/60 dark:border-white/10 pt-5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground/70 dark:text-white/35 transition-colors group-hover:text-emerald-600 dark:group-hover:text-accent-emerald">
                  Learn more
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
