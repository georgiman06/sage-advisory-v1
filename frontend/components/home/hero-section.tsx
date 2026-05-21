"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = end / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [end])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

export function HeroSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Transforming Enterprises Through Data, AI, and Intelligent Analytics
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/80">
            Sage Advisory helps organizations modernize their data ecosystems, unlock the power of AI-driven insights, and build scalable analytics platforms that drive measurable business outcomes.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/capabilities">Explore Capabilities</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white" asChild>
              <Link href="/contact">Schedule Consultation</Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-white md:text-4xl">
              $<AnimatedCounter end={10} />M+
            </p>
            <p className="mt-2 text-sm text-white/70">Operational Savings</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white md:text-4xl">
              <AnimatedCounter end={95} />%
            </p>
            <p className="mt-2 text-sm text-white/70">Enterprise Adoption</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white md:text-4xl">
              <AnimatedCounter end={500} />K
            </p>
            <p className="mt-2 text-sm text-white/70">Labor Hours Saved</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white md:text-4xl">
              <AnimatedCounter end={2} />hr
            </p>
            <p className="mt-2 text-sm text-white/70">Time-to-Insight</p>
          </div>
        </div>
      </div>
    </section>
  )
}
