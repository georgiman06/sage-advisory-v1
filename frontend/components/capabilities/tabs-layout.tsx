"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { CapabilitiesGrid } from "./capabilities-grid"
import { ServicesSection } from "./services-section"
import { BusinessImpact } from "./business-impact"
import { CTASection } from "./cta-section"

type Tab = "capabilities" | "services"

const tabs = [
  { id: "capabilities" as Tab, label: "Capabilities & Technology" },
  { id: "services" as Tab, label: "Services & Outcomes" },
]

export function CapabilitiesTabsLayout() {
  const [activeTab, setActiveTab] = useState<Tab>("capabilities")
  const [open, setOpen] = useState(false)
  const current = tabs.find((t) => t.id === activeTab)!

  return (
    <div>
      {/* Dropdown tab switcher */}
      <div className="relative z-50 mx-auto mt-10 w-full max-w-sm px-6">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between rounded-xl border border-emerald-400/40 bg-white/95 dark:bg-[#162923]/95 px-6 py-4 text-base font-bold text-foreground dark:text-white shadow-lg backdrop-blur-sm transition-all hover:border-emerald-400/70"
        >
          {current.label}
          <ChevronDown
            className={`h-5 w-5 text-emerald-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <div className="absolute left-6 right-6 mt-1 overflow-hidden rounded-xl border border-emerald-400/30 bg-white/98 dark:bg-[#162923]/98 shadow-2xl backdrop-blur-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  setOpen(false)
                }}
                className={`w-full px-6 py-4 text-left text-sm font-semibold transition-colors hover:bg-emerald-50 dark:hover:bg-[#1a3027] ${
                  activeTab === tab.id
                    ? "bg-emerald-50/80 text-emerald-700 dark:bg-[#1a3027]/80 dark:text-emerald-400"
                    : "text-foreground dark:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tab content */}
      {activeTab === "capabilities" && <CapabilitiesGrid />}
      {activeTab === "services" && (
        <>
          <ServicesSection />
          <BusinessImpact />
        </>
      )}

      {/* CTA appears on both tabs */}
      <CTASection />
    </div>
  )
}
