import Link from "next/link"
import { Button } from "@/components/ui/button"

export function AboutCTA() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="text-4xl font-bold text-foreground dark:text-white md:text-5xl">
          Ready to partner with us?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-xl text-muted-foreground dark:text-white/65">
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
            className="border-amber-400/40 bg-transparent text-amber-700 dark:text-amber-100 hover:bg-amber-400/10 hover:text-amber-900 dark:hover:text-white"
          >
            <Link href="/capabilities">View Our Capabilities</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
