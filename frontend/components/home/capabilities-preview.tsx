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
    <Section className="bg-[#081a14]">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeader
          eyebrow="What we do"
          title="Six capabilities, one wisdom-driven approach"
          intro="Strategic advisory and hands-on implementation across the full data and AI lifecycle."
        />
        <Link
          href="/capabilities"
          className="group inline-flex items-center gap-2 whitespace-nowrap font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent-emerald transition-colors hover:text-accent-emerald-strong"
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
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-[#10231c] p-8 transition-all hover:border-accent-emerald/40 hover:bg-[#183028]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-emerald/10 ring-1 ring-accent-emerald/20 transition-colors group-hover:bg-accent-emerald/15">
                  <Icon className="h-6 w-6 text-accent-emerald" />
                </div>
                <h3 className="mt-6 font-serif text-xl font-semibold text-white">
                  {cap.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
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
