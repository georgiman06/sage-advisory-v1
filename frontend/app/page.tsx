import { Header } from "@/components/shared/header"
import { HeroSection } from "@/components/home/hero-section"

export default function HomePage() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-emerald-50 dark:bg-[#0a1f18]">
      <Header activePage="home" variant="dark" />
      <main className="flex-1 min-h-0">
        <HeroSection />
      </main>
    </div>
  )
}
