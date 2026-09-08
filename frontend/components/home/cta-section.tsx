"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ParticleField } from "@/components/home/particle-field"

export function CtaSection() {
  return (
    <section className="relative bg-white dark:bg-black pb-24 md:pb-32 dark:overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-emerald-400/30 bg-emerald-50 px-8 py-16 text-center md:px-16 md:py-20 dark:overflow-visible dark:rounded-none dark:border-0 dark:bg-transparent dark:px-0 dark:py-24 dark:text-left md:dark:py-32">
          {/* ambient glow */}
          <div
            className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-emerald-400/20 blur-3xl dark:hidden"
            aria-hidden
          />
          <ParticleField className="hidden dark:block" count={30} />
          <div className="relative">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-emerald-600 dark:font-semibold dark:tracking-[0.32em] dark:text-amber-400">
              Start your transformation
            </p>
            <h2 className="mx-auto mt-5 max-w-2xl text-balance font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl dark:mx-0 dark:max-w-3xl dark:font-sans dark:font-normal dark:text-[52px] dark:leading-[1.08] dark:tracking-[-0.02em] dark:text-white md:dark:text-[64px]">
              Turn wisdom-driven decisions into enduring advantage
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg dark:mx-0 dark:max-w-lg dark:font-light dark:text-[18px] dark:leading-[1.6] dark:text-white/65">
              Partner with Sage Advisory to unlock the full value of your data, AI, and decentralized technology investments.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row dark:items-start dark:justify-start">
              <Button
                size="lg"
                className="dark:rounded-full dark:bg-emerald-400 dark:text-black dark:font-semibold dark:hover:bg-emerald-300"
                asChild
              >
                <Link href="/contact">Schedule a consultation</Link>
              </Button>
              <Link
                href="/capabilities"
                className="text-base font-medium text-foreground transition-colors hover:text-foreground/80 dark:text-white/70 dark:hover:text-white sm:pl-2"
              >
                View our capabilities
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
