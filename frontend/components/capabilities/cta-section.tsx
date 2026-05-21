import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-xl bg-primary p-8 text-primary-foreground md:p-12">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Discuss Your Transformation
          </h2>
          <p className="mt-4 max-w-2xl text-primary-foreground/80">
            Ready to modernize your data ecosystem? Let&apos;s explore how our capabilities align with your strategic objectives.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button variant="secondary" size="lg">
              Schedule Consultation
            </Button>
            <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              Explore V2V Framework
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
