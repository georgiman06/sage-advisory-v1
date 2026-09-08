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
    <Section className="bg-emerald-50 dark:bg-black">
      <SectionHeader
        eyebrow="Selected impact"
        title="Modernizing data for a global asset manager"
        intro="Faced with fragmented silos, Sage Advisory led a multi-year transformation to unify enterprise analytics and automate legacy reporting."
      />

      <Reveal className="mt-14">
        <div className="overflow-hidden rounded-2xl border border-border bg-card dark:overflow-visible dark:rounded-none dark:border-0 dark:bg-transparent">
          <div className="grid gap-px bg-border dark:gap-x-10 dark:gap-y-10 dark:bg-transparent md:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="bg-card p-8 dark:bg-transparent dark:p-0">
                <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground dark:text-white/45">
                  {s.label}
                </p>
                <p className="mt-3 font-mono text-2xl font-semibold text-foreground dark:font-sans dark:font-normal dark:text-[32px] dark:tracking-[-0.01em] dark:text-white md:text-3xl">
                  {s.value}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-border p-8 dark:mt-14 dark:border-0 dark:p-0 md:p-10 dark:md:p-0">
            <blockquote className="max-w-3xl font-serif text-xl italic leading-relaxed text-foreground dark:font-sans dark:font-normal dark:not-italic dark:text-[28px] dark:leading-[1.3] dark:tracking-[-0.01em] dark:text-white/90 md:text-2xl">
              &ldquo;Sage didn&apos;t just give us a platform; they gave us a data-driven culture.&rdquo;
            </blockquote>
            <p className="mt-4 text-sm text-muted-foreground dark:font-light dark:text-white/50">
              &mdash; Managing Director, Enterprise Data &amp; Analytics
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                asChild
                className="dark:rounded-full dark:bg-emerald-400 dark:text-black dark:font-semibold dark:hover:bg-emerald-300"
              >
                <Link href="/contact">Start a conversation</Link>
              </Button>
              <Link
                href="/capabilities"
                className="text-sm font-medium text-foreground transition-colors hover:text-foreground/80 dark:text-white/70 dark:hover:text-white sm:pl-2"
              >
                See how we work
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
