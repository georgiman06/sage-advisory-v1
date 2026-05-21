import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function CaseStudySection() {
  return (
    <section className="bg-muted/30 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Selected Impact
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight">Client Success Stories</h2>
        </div>

        <div className="mt-12">
          <Card className="overflow-hidden">
            <CardHeader className="bg-card">
              <Badge variant="secondary" className="w-fit">Financial Services</Badge>
              <h3 className="mt-4 text-2xl font-bold">
                Modernizing Data for a $6T Asset Manager
              </h3>
              <p className="mt-2 text-muted-foreground">
                Faced with fragmented silos, Sage Advisory led a multi-year digital transformation to unify enterprise analytics and automate legacy reporting.
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-sm text-muted-foreground">Outcome</p>
                  <p className="text-xl font-bold">$10M+ Operational Savings</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Scale</p>
                  <p className="text-xl font-bold">60,000+ Internal Users</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Velocity</p>
                  <p className="text-xl font-bold">Time-to-insight reduced by 98%</p>
                </div>
              </div>

              <div className="mt-8 border-t border-border pt-6">
                <blockquote className="text-lg italic text-muted-foreground">
                  &ldquo;Sage didn&apos;t just give us a platform; they gave us a data-driven culture.&rdquo;
                </blockquote>
                <p className="mt-2 text-sm font-medium">
                  — Managing Director, Enterprise Data & Analytics
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                <Button asChild>
                  <Link href="/case-studies/asset-manager">Read Full Case Study</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/case-studies">View All Success Stories</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
