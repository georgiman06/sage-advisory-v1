import { Compass, TrendingUp, BrainCircuit, ShieldCheck, type LucideIcon } from "lucide-react"
import { Section, SectionHeader } from "@/components/shared/section"
import { Reveal } from "@/components/shared/reveal"
import { IconBadge } from "@/components/shared/icon-badge"

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

const tileClasses =
  "group flex flex-col rounded-3xl border border-border dark:border-white/10 bg-card dark:bg-[#10231c]/80 backdrop-blur-sm transition-all hover:border-emerald-400/40 dark:hover:border-accent-emerald/40 hover:bg-emerald-50/50 dark:hover:bg-[#183028]"

export function BusinessImpact() {
  const [featured, second, third, fourth] = impacts
  const FeaturedIcon = featured.icon
  const SecondIcon = second.icon
  const ThirdIcon = third.icon
  const FourthIcon = fourth.icon

  return (
    <Section>
      <SectionHeader
        eyebrow="Outcomes"
        title="The value we create"
        titleClassName="text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.08] tracking-[-0.02em]"
        intro="Every engagement is measured by the advantage it creates: clarity, growth, better decisions, and technology adopted with confidence."
      />

      <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-4 lg:grid-rows-2">
        {/* Featured outcome — anchors the grid so the section doesn't read as four interchangeable boxes */}
        <Reveal className="lg:col-span-2 lg:row-span-2">
          <div className={`${tileClasses} h-full justify-center p-10 lg:p-12`}>
            <IconBadge icon={FeaturedIcon} size="md" />
            <h3 className="mt-8 font-serif text-3xl font-semibold leading-tight text-foreground dark:text-white md:text-4xl lg:text-[2.75rem]">
              {featured.title}
            </h3>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground dark:text-white/65 md:text-lg">
              {featured.description}
            </p>
          </div>
        </Reveal>

        <Reveal delay={90} className="lg:col-span-1">
          <div className={`${tileClasses} h-full p-7`}>
            <IconBadge icon={SecondIcon} size="sm" />
            <h3 className="mt-5 font-serif text-xl font-semibold leading-snug text-foreground dark:text-white">
              {second.title}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground dark:text-white/65">
              {second.description}
            </p>
          </div>
        </Reveal>

        <Reveal delay={160} className="lg:col-span-1">
          <div className={`${tileClasses} h-full p-7`}>
            <IconBadge icon={ThirdIcon} size="sm" />
            <h3 className="mt-5 font-serif text-xl font-semibold leading-snug text-foreground dark:text-white">
              {third.title}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground dark:text-white/65">
              {third.description}
            </p>
          </div>
        </Reveal>

        {/* Fourth outcome as a wide banner tile for variety instead of a fourth identical box */}
        <Reveal delay={230} className="lg:col-span-2">
          <div className={`${tileClasses} h-full flex-row items-center gap-6 p-7`}>
            <IconBadge icon={FourthIcon} size="md" />
            <div>
              <h3 className="font-serif text-xl font-semibold leading-snug text-foreground dark:text-white">
                {fourth.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground dark:text-white/65">
                {fourth.description}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
