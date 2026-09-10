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
              See where this fits your roadmap
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground dark:text-white/70 md:text-lg">
              Bring us your current roadmap and we&apos;ll show you where these capabilities fit, and where they don&apos;t.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href="/contact">Schedule consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
