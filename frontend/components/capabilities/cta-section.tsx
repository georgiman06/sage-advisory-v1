import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="pb-24 md:pb-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-emerald-400/30 dark:border-accent-emerald/25 bg-card dark:bg-[#10231c] p-8 backdrop-blur-sm md:p-12">
          <div
            className="pointer-events-none absolute -top-24 right-0 h-64 w-[32rem] rounded-full bg-emerald-400/15 dark:bg-accent-emerald/15 blur-3xl"
            aria-hidden
          />
          <div className="relative">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-emerald-600 dark:text-accent-emerald">
              Get started
            </p>
            <h2 className="mt-4 max-w-2xl font-serif text-3xl font-semibold tracking-tight text-foreground dark:text-white md:text-4xl">
              Discuss your transformation
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground dark:text-white/70 md:text-lg">
              Ready to modernize your data ecosystem? Let&apos;s explore how our capabilities align with your strategic objectives.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href="/contact">Schedule consultation</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-emerald-400/40 bg-transparent text-emerald-700 dark:text-emerald-100 hover:bg-emerald-400/10 hover:text-emerald-800 dark:hover:text-white"
              >
                <Link href="/case-studies">View case studies</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
