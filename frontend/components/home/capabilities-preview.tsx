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
    description: "Identify, prioritize, and scale high-value AI — from GenAI to responsible governance.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Decision Intelligence",
    description: "Analytics and predictive intelligence that accelerate smarter business decisions.",
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
    description: "Partner with boards and executives to build future-ready enterprises.",
  },
]

export function CapabilitiesPreview() {
  return (
    <Section className="bg-white dark:bg-black">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeader
          eyebrow="What we do"
          title="Six capabilities, one wisdom-driven approach"
          intro="Strategic advisory and hands-on implementation across the full data and AI lifecycle."
        />
        <Link
          href="/capabilities"
          className="group inline-flex items-center gap-2 whitespace-nowrap font-mono text-xs font-medium uppercase tracking-[0.18em] text-emerald-600 dark:text-amber-400 transition-colors hover:text-emerald-700 dark:hover:text-amber-300"
        >
          View all capabilities
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 dark:gap-x-10 dark:gap-y-14">
        {capabilities.map((cap, i) => {
          const Icon = cap.icon
          return (
            <Reveal key={cap.title} delay={i * 70}>
              <Link
                href="/capabilities"
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-8 transition-all hover:border-emerald-400/40 hover:bg-emerald-50/50 dark:rounded-none dark:border-0 dark:bg-transparent dark:p-0 dark:hover:bg-transparent"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 ring-1 ring-emerald-400/20 transition-colors group-hover:bg-emerald-500/15 dark:h-10 dark:w-10 dark:rounded-full dark:bg-transparent dark:ring-1 dark:ring-emerald-400/30 dark:group-hover:bg-emerald-400/10 dark:group-hover:ring-emerald-400/60">
                  <Icon className="h-6 w-6 text-emerald-600 dark:h-5 dark:w-5 dark:text-emerald-400" />
                </div>
                <h3 className="mt-6 font-serif text-xl font-semibold text-foreground dark:font-sans dark:font-normal dark:text-[22px] dark:tracking-[-0.01em] dark:text-white">
                  {cap.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground dark:font-light dark:text-[15px] dark:leading-relaxed dark:text-white/55">
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
