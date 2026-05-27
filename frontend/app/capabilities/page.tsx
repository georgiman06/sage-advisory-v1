import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { CapabilitiesGrid } from "@/components/capabilities/capabilities-grid"
import { ServicesSection } from "@/components/capabilities/services-section"
import { BusinessImpact } from "@/components/capabilities/business-impact"
import { CTASection } from "@/components/capabilities/cta-section"

export default function CapabilitiesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative bg-gradient-to-b from-[#1a3a2f] via-[#0d1f1a] to-[#050807]">
        <Header activePage="capabilities" variant="dark" />
        <CapabilitiesGrid />
        <ServicesSection />
        <BusinessImpact />
        <CTASection />
      </div>
      <Footer />
    </div>
  )
}
