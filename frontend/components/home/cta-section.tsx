import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="bg-[#081a14] pb-24 md:pb-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-accent-emerald/25 bg-[#10231c] px-8 py-16 text-center md:px-16 md:py-20">
          {/* ambient glow */}
          <div
            className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-accent-emerald/20 blur-3xl"
            aria-hidden
          />
          <div className="relative">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-accent-emerald">
              Start your transformation
            </p>
            <h2 className="mx-auto mt-5 max-w-2xl text-balance font-serif text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Turn wisdom-driven decisions into enduring advantage
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70">
              Partner with Sage Advisory to unlock the full value of your data, AI, and decentralized technology investments.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/contact">Schedule a consultation</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 bg-transparent text-white hover:bg-white/10"
                asChild
              >
                <Link href="/capabilities">View our capabilities</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
