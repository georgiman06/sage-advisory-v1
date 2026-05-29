"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const ChartScene = dynamic(
  () => import("@/components/home/chart-scene").then((m) => m.ChartScene),
  { ssr: false }
)

export function HeroSection() {
  return (
    <section className="relative h-full overflow-hidden bg-[#f4f7f4]">
      <div className="absolute inset-0">
        <ChartScene />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#f4f7f4]/85 via-[#f4f7f4]/50 to-transparent" />

      <div className="relative flex h-full items-center px-4 lg:px-12">
        <div className="max-w-xl lg:max-w-2xl">
          <h1 className="text-balance text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
            Transforming Enterprises Through Data, AI, and Intelligent Analytics
          </h1>
          <p className="mt-6 text-base leading-relaxed text-gray-600 md:text-lg">
            Sage Advisory helps organizations modernize their data ecosystems, unlock the power of AI-driven insights, and build scalable analytics platforms that drive measurable business outcomes.
          </p>
          <div className="mt-8">
            <Button size="lg" asChild>
              <Link href="/contact">Schedule with Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
