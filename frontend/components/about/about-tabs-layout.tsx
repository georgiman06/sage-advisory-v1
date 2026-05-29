"use client"

import { useSearchParams } from "next/navigation"
import { MissionSection } from "./mission-section"
import { FounderSection } from "./founder-section"
import { AboutCTA } from "./about-cta"

export function AboutTabsLayout() {
  const searchParams = useSearchParams()
  const activeTab = searchParams.get("section") === "founder" ? "founder" : "mission"

  return (
    <div>
      {activeTab === "mission" && <MissionSection />}
      {activeTab === "founder" && <FounderSection />}
      <AboutCTA />
    </div>
  )
}
