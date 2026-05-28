import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-2xl border border-emerald-400/30 bg-[#162923]/80 p-8 backdrop-blur-sm md:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/80">
            Get Started
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Discuss Your Transformation
          </h2>
          <p className="mt-4 max-w-2xl text-base text-white/70 md:text-lg">
            Ready to modernize your data ecosystem? Let&apos;s explore how our capabilities align with your strategic objectives.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link href="/contact">Schedule Consultation</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-emerald-400/40 bg-transparent text-emerald-100 hover:bg-emerald-400/10 hover:text-white"
            >
              <Link href="/case-studies">View Case Studies</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
