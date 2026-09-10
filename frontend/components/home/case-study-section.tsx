import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Section, SectionHeader } from "@/components/shared/section"
import { Reveal } from "@/components/shared/reveal"

type Stat = {
  label: string
  value: string
}

const stats: Stat[] = [
  { label: "Outcome", value: "$10M+ operational savings" },
  { label: "Scale", value: "60,000+ internal users" },
  { label: "Velocity", value: "98% faster time-to-insight" },
]

export function CaseStudySection() {
  return (
    <Section className="relative bg-emerald-50 dark:bg-[#10231c]">
      {/* Bottom fade — blends into the CTA section below instead of a hard edge */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-white md:h-48 dark:to-[#081a14]"
        aria-hidden
      />
      <SectionHeader
        eyebrow="Selected impact"
        title="Modernizing data for a global asset manager"
        intro="Faced with fragmented silos, Sage Advisory led a multi-year program to unify enterprise analytics and automate legacy reporting."
      />

      <Reveal className="mt-14">
        <div className="overflow-hidden rounded-2xl border border-border dark:border-white/10 bg-card dark:bg-[#081a14]">
          <div className="grid gap-px bg-border dark:bg-white/10 md:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="bg-card dark:bg-[#081a14] p-8">
                <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground dark:text-white/45">
                  {s.label}
                </p>
                <p className="mt-3 font-mono text-2xl font-semibold text-foreground dark:text-white md:text-3xl">
                  {s.value}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-border dark:border-white/10 p-8 md:p-10">
            <blockquote className="max-w-3xl font-serif text-xl italic leading-relaxed text-foreground dark:text-white/85 md:text-2xl">
              &ldquo;Sage didn&apos;t just give us a platform; they gave us a data-driven culture.&rdquo;
            </blockquote>
            <p className="mt-4 text-sm text-muted-foreground dark:text-white/55">
              &mdash; Managing Director, Enterprise Data &amp; Analytics
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/contact">Start a conversation</Link>
              </Button>
              <Button
                variant="outline"
                className="border-border bg-transparent text-foreground hover:bg-muted dark:border-white/20 dark:text-white dark:hover:bg-white/10"
                asChild
              >
                <Link href="/capabilities">See how we work</Link>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
