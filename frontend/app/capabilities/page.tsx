import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { HeroSection } from "@/components/capabilities/hero-section"
import { CapabilitiesGrid } from "@/components/capabilities/capabilities-grid"
import { IndustryExperience } from "@/components/capabilities/industry-experience"
import { TechnologyExpertise } from "@/components/capabilities/technology-expertise"
import { BusinessImpact } from "@/components/capabilities/business-impact"
import { CTASection } from "@/components/capabilities/cta-section"

export default function CapabilitiesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="bg-[#1a3a2f]">
        <Header activePage="capabilities" variant="dark" />
        <HeroSection />
      </div>
      <main className="flex-1">
        <CapabilitiesGrid />
        <IndustryExperience />
        <TechnologyExpertise />
        <BusinessImpact />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
