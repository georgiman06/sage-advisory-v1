import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { HeroSection } from "@/components/home/hero-section"
import { MetricsBand } from "@/components/home/metrics-band"
import { CapabilitiesPreview } from "@/components/home/capabilities-preview"
import { CaseStudySection } from "@/components/home/case-study-section"
import { CtaSection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-emerald-50 dark:bg-[#081a14]">
      <Header activePage="home" variant="dark" />
      <main className="flex-1">
        <HeroSection />
        <MetricsBand />
        <CapabilitiesPreview />
        <CaseStudySection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
