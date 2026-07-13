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
    <section className="relative h-full overflow-hidden bg-blue-100 dark:bg-[#091525]">
      <div className="absolute inset-0">
        <ChartScene />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/70 via-blue-100/30 dark:from-[#091525]/85 dark:via-[#091525]/40 to-transparent" />

      <div className="relative flex h-full items-center px-4 lg:px-12">
        <div className="max-w-xl lg:max-w-2xl">
          <h1 className="text-balance text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            Transforming Enterprises with Data, AI &amp; Decentralized Technologies
          </h1>
          <p className="mt-6 text-base leading-relaxed text-white/75 md:text-lg">
            Sage Advisory empowers organizations to shape a future where wisdom-driven decisions create enduring competitive advantage with data, AI, and decentralized innovation.
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
