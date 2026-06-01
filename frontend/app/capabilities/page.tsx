import { Suspense } from "react"
import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { CapabilitiesTabsLayout } from "@/components/capabilities/tabs-layout"

export default function CapabilitiesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative bg-gradient-to-b from-blue-50 via-blue-50/60 to-blue-50/20 dark:from-[#1c3c70] dark:via-[#102040] dark:to-[#0a1428]">
        <Header activePage="capabilities" variant="dark" />
        <Suspense>
          <CapabilitiesTabsLayout />
        </Suspense>
      </div>
      <Footer />
    </div>
  )
}
