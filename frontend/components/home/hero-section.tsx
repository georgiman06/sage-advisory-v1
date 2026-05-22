"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const ChartScene = dynamic(
  () => import("@/components/home/chart-scene").then((m) => m.ChartScene),
  { ssr: false }
)

export function HeroSection() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#0a1f18" }}>
      <div className="absolute inset-0">
        <ChartScene />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1f18]/60 via-transparent to-transparent" />

      <div className="relative px-4 py-24 md:py-32 lg:px-12">
        <div className="max-w-xl lg:max-w-2xl">
          <Card className="border-border/40 shadow-xl">
            <CardContent className="p-8 md:p-10">
              <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                Transforming Enterprises Through Data, AI, and Intelligent Analytics
              </h1>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
                Sage Advisory helps organizations modernize their data ecosystems, unlock the power of AI-driven insights, and build scalable analytics platforms that drive measurable business outcomes.
              </p>
              <div className="mt-8">
                <Button size="lg" asChild>
                  <Link href="/contact">Schedule with Us</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
