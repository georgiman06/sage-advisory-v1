import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { HeroSection } from "@/components/home/hero-section"
import { AboutSection } from "@/components/home/about-section"
import { CapabilitiesSection } from "@/components/home/capabilities-section"
import { TransformationSection } from "@/components/home/transformation-section"
import { MethodologySection } from "@/components/home/methodology-section"
import { CaseStudySection } from "@/components/home/case-study-section"
import { InsightsSection } from "@/components/home/insights-section"
import { TechExpertiseSection } from "@/components/home/tech-expertise-section"
import { CtaSection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <div className="bg-[#1a3a2f]">
        <Header activePage="home" variant="dark" />
        <main className="flex-1">
          <HeroSection />
        </main>
      </div>
      <main className="flex-1">
        <AboutSection />
        <CapabilitiesSection />
        <TransformationSection />
        <MethodologySection />
        <CaseStudySection />
        <InsightsSection />
        <TechExpertiseSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
