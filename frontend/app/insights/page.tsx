import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export const metadata = {
  title: "Strategic Insights | Sage Advisory LLC",
  description: "Expert perspectives on AI, Governance, and the Future of Enterprise Data.",
}

const featuredArticles = [
  {
    category: "AI & ROI",
    title: "The $10M Optimization Playbook",
    description: "A strategic guide to license consolidation and multicloud cost management for the modern CFO.",
    readTime: "8 min read",
    date: "March 2026",
    slug: "10m-optimization-playbook",
  },
  {
    category: "Governance",
    title: "Governance as an Innovation Accelerator",
    description: "How modern metadata frameworks speed up development cycles by 20% rather than slowing them down.",
    readTime: "10 min read",
    date: "March 2026",
    slug: "governance-innovation-accelerator",
  },
  {
    category: "Automation",
    title: "Beyond RPA: Agentic Workflows",
    description: "Why traditional RPA is dead and how autonomous AI agents are reclaiming 10,000+ labor hours annually.",
    readTime: "12 min read",
    date: "March 2026",
    slug: "beyond-rpa-agentic-workflows",
  },
]

const categories = [
  {
    name: "AI & Automation",
    description: "Insights on generative AI, machine learning, and intelligent automation for enterprise environments.",
    articleCount: 3,
  },
  {
    name: "Strategy & ROI",
    description: "Strategic frameworks for maximizing return on data and analytics investments.",
    articleCount: 3,
  },
  {
    name: "Data Governance",
    description: "Modern approaches to governance that enable innovation while ensuring compliance.",
    articleCount: 3,
  },
]

export default function InsightsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="bg-[#1a3a2f]">
        <Header activePage="insights" variant="dark" />
        
        {/* Hero Section */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">Strategic Insights</h1>
            <p className="mt-4 max-w-2xl text-lg text-white/80">
              Expert perspectives on AI, Governance, and the Future of Enterprise Data.
            </p>
          </div>
        </section>
      </div>
      
      <main className="flex-1">
        {/* Featured Articles */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-2xl font-semibold">Featured Articles</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {featuredArticles.map((article) => (
                <Card key={article.slug} className="group border-border transition-shadow hover:shadow-md">
                  <CardContent className="flex h-full flex-col p-6">
                    <Badge variant="secondary" className="w-fit">{article.category}</Badge>
                    <h3 className="mt-4 text-lg font-semibold group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">
                      {article.description}
                    </p>
                    <p className="mt-4 text-xs text-muted-foreground">
                      {article.readTime} &bull; {article.date}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="border-y border-border bg-muted/30 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-2xl font-semibold">Categories</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {categories.map((category) => (
                <Card key={category.name} className="border-border bg-background">
                  <CardContent className="p-6">
                    <h3 className="font-semibold">{category.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {category.description}
                    </p>
                    <p className="mt-4 text-sm font-medium">{category.articleCount} Articles</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-2xl font-semibold">Stay Informed</h2>
              <p className="mt-2 text-muted-foreground">
                Subscribe to receive our latest insights on enterprise data transformation.
              </p>
              <form className="mt-6 flex gap-3">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1"
                />
                <Button type="submit">Subscribe</Button>
              </form>
              <p className="mt-3 text-xs text-muted-foreground">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-border bg-muted/30 py-20">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <h2 className="text-2xl font-semibold">Ready to Transform Your Data Strategy?</h2>
            <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
              Let&apos;s discuss how these insights apply to your organization&apos;s unique challenges.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/contact">Schedule a Consultation</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
