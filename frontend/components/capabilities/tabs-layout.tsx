"use client"

import { useSearchParams } from "next/navigation"
import { CapabilitiesGrid } from "./capabilities-grid"
import { ServicesSection } from "./services-section"
import { BusinessImpact } from "./business-impact"
import { CTASection } from "./cta-section"

export function CapabilitiesTabsLayout() {
  const searchParams = useSearchParams()
  const activeTab = searchParams.get("section") === "services" ? "services" : "capabilities"

  return (
    <div>
      {activeTab === "capabilities" && <CapabilitiesGrid />}
      {activeTab === "services" && (
        <>
          <ServicesSection />
          <BusinessImpact />
        </>
      )}
      <CTASection />
    </div>
  )
}
