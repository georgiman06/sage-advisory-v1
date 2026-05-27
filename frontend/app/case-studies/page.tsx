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
      <div className="relative bg-gradient-to-b from-[#1a3a2f] via-[#0d1f1a] to-[#050807]">
        <Header activePage="case-studies" variant="dark" />
        <Feed />
      </div>
      <Footer />
    </div>
  )
}
