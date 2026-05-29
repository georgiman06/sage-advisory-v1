import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { Feed } from "@/components/feed/feed"

export const metadata = {
  title: "Updates | Sage Advisory LLC",
  description:
    "Team updates from active client engagements — strategy, transformation, and execution in motion.",
}

export default function CaseStudiesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative bg-gradient-to-b from-emerald-50 via-emerald-50/60 to-emerald-50/20 dark:from-[#22513f] dark:via-[#143028] dark:to-[#0d1e17]">
        <Header activePage="case-studies" variant="dark" />
        <Feed />
      </div>
      <Footer />
    </div>
  )
}
