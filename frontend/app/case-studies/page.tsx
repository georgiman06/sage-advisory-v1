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
      <div className="relative bg-gradient-to-b from-blue-50 via-blue-50/60 to-blue-50/20 dark:from-[#1c3c70] dark:via-[#102040] dark:to-[#0a1428]">
        <Header activePage="case-studies" variant="dark" />
        <Feed />
      </div>
      <Footer />
    </div>
  )
}
