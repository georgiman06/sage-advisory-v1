import Link from "next/link"
import { Button } from "@/components/ui/button"

export function AboutCTA() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-emerald-600 dark:text-accent-emerald">
          Get started
        </p>
        <h2 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-foreground dark:text-white md:text-5xl">
          Ready to partner with us?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-xl leading-relaxed text-muted-foreground dark:text-white/65">
          Let&apos;s discuss how Sage Advisory can help accelerate your data transformation journey.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/contact">Schedule a Consultation</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-emerald-400/40 bg-transparent text-emerald-700 dark:text-emerald-100 hover:bg-emerald-400/10 hover:text-emerald-900 dark:hover:text-white"
          >
            <Link href="/capabilities">View Our Capabilities</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
