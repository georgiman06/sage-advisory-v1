"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ParticleField } from "@/components/home/particle-field"

export function HeroSection() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-emerald-100 dark:bg-black">
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
      <div className="absolute inset-0 bg-emerald-600 mix-blend-color dark:bg-emerald-950" aria-hidden />
      <div className="absolute inset-0 bg-emerald-50/55 dark:bg-black/55" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/80 via-emerald-100/35 to-transparent dark:from-black dark:via-black/70 dark:to-black/20" />

      {/* Ambient constellation particles — dark mode only, right-of-center so they don't crowd the copy */}
      <ParticleField className="hidden dark:block" count={48} />

      <div className="relative w-full px-4 py-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl lg:max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.32em] text-emerald-700 dark:text-amber-400">
              Data · AI · Decentralized Technologies
            </p>
            <h1 className="mt-6 text-balance font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-slate-900 md:text-5xl lg:text-6xl dark:font-sans dark:font-normal dark:text-[68px] dark:leading-[1.02] dark:tracking-[-0.03em] dark:text-white dark:lg:text-[84px]">
              Transforming enterprises with data, AI &amp; decentralized technologies
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-700 md:text-lg dark:max-w-lg dark:font-light dark:text-white/70 dark:text-[18px] dark:leading-[1.6]">
              Sage Advisory empowers organizations to shape a future where wisdom-driven decisions create enduring competitive advantage with data, AI, and decentralized innovation.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                size="lg"
                className="dark:rounded-full dark:bg-emerald-400 dark:text-black dark:font-semibold dark:tracking-wide dark:hover:bg-emerald-300"
                asChild
              >
                <Link href="/contact">Schedule with Us</Link>
              </Button>
              <Link
                href="/capabilities"
                className="group inline-flex items-center gap-2 text-base font-medium text-slate-800 transition-colors hover:text-slate-950 dark:text-white/70 dark:hover:text-white sm:pl-2"
              >
                Explore Capabilities
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
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
