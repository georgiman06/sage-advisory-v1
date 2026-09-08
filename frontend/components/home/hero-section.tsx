"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-emerald-100 dark:bg-[#081a14]">
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
          src="/videos/hero-bg.mp4"
        />
      </div>
      {/* Tint the footage toward the site's forest/emerald palette */}
      <div className="absolute inset-0 bg-emerald-600 mix-blend-color dark:bg-emerald-900" aria-hidden />
      <div className="absolute inset-0 bg-emerald-50/55 dark:bg-[#081a14]/40" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/80 via-emerald-100/35 to-transparent dark:from-[#081a14]/90 dark:via-[#081a14]/45" />

      <div className="relative w-full px-4 py-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.28em] text-emerald-700 dark:text-accent-emerald">
              Data · AI · Decentralized Technologies
            </p>
            <h1 className="mt-5 text-balance font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-slate-900 dark:text-white md:text-5xl lg:text-6xl">
              Transforming Enterprises with Data, AI &amp; Decentralized Technologies
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-700 dark:text-white/75 md:text-lg">
              Sage Advisory empowers organizations to shape a future where wisdom-driven decisions create enduring competitive advantage with data, AI, and decentralized innovation.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button size="lg" asChild>
                <Link href="/contact">Schedule with Us</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-600/30 bg-transparent text-slate-800 hover:bg-emerald-600/10 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
                asChild
              >
                <Link href="/capabilities">Explore Capabilities</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 dark:text-white/40">
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <span className="h-8 w-px animate-pulse bg-current" />
        </div>
      </div>
    </section>
  )
}
