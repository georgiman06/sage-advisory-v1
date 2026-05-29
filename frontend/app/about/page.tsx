import { Suspense } from "react"
import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { AboutTabsLayout } from "@/components/about/about-tabs-layout"

export const metadata = {
  title: "About Us | Sage Advisory LLC",
  description: "Learn about Sage Advisory's mission, leadership team, and commitment to enterprise data transformation.",
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative bg-gradient-to-b from-emerald-50 via-emerald-50/60 to-emerald-50/20 dark:from-[#22513f] dark:via-[#143028] dark:to-[#0d1e17]">
        <Header activePage="about" variant="dark" />
        <Suspense>
          <AboutTabsLayout />
        </Suspense>
      </div>
      <Footer />
    </div>
  )
}
