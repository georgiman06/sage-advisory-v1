"use client"

import Script from "next/script"
import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/advisorysage/30min"

const expectations = [
  "Initial Assessment: 30-minute discovery call to understand your challenges",
  "Custom Roadmap: Transformation roadmap aligned to your goals",
  "ROI Projection: Estimated savings and business impact analysis",
  "No Obligation: Free consultation with no commitment required",
]

const engagementModels = [
  "Strategic Advisory",
  "Platform Implementation",
  "Transformation Programs",
  "Governance Programs",
]

const faqs = [
  {
    question: "How long does a typical engagement last?",
    answer: "Engagements vary based on scope. Strategic assessments typically take 4-6 weeks, while full platform implementations range from 6-18 months depending on complexity.",
  },
  {
    question: "Do you work with companies outside the US?",
    answer: "Yes, we work with global enterprises across North America, Europe, and Asia. Our team has experience with international data regulations and compliance requirements.",
  },
  {
    question: "What industries do you specialize in?",
    answer: "We have deep expertise in Financial Services, Healthcare, Retail, Technology, and Utilities. Our approach is industry-agnostic and applicable to any enterprise.",
  },
  {
    question: "What is the typical ROI timeline?",
    answer: "Most clients realize measurable ROI within 6-9 months. Quick wins (cost optimization, governance) deliver value in the first 2-3 months.",
  },
]

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative bg-gradient-to-b from-emerald-50 via-emerald-50/60 to-emerald-50/20 dark:from-[#22513f] dark:via-[#143028] dark:to-[#0d1e17]">
        <Header activePage="contact" variant="dark" />

        {/* Hero Section */}
        <section className="pt-16 pb-12 md:pt-20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-emerald-600 dark:text-accent-emerald">
              Let&apos;s talk
            </p>
            <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-foreground dark:text-white md:text-5xl">
              Talk to our team
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground dark:text-white/80">
              Tell us about your data, AI, or technology initiative. We&apos;ll respond within one business day to schedule a discovery call.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10">
              <h2 className="font-serif text-2xl font-semibold text-foreground dark:text-white md:text-3xl">Book a Discovery Call</h2>
              <p className="mt-2 text-muted-foreground dark:text-white/65">
                Share a few details about your project so we can prepare for your call. Pick a time below that works for you.
              </p>
            </div>
            <div className="grid items-start gap-12 lg:grid-cols-2">
              {/* Left Column - Info */}
              <div>
                <p className="text-muted-foreground leading-relaxed">
                  Tell us about the data, AI, or platform initiative you&apos;re evaluating. We&apos;ll use
                  the call to understand your current state and outline our recommended approach.
                </p>

                <div className="mt-8">
                  <h3 className="font-semibold">What to Expect</h3>
                  <ul className="mt-4 space-y-3">
                    {expectations.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-foreground" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <h3 className="font-semibold">Typical Engagement Models</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {engagementModels.map((model) => (
                      <span
                        key={model}
                        className="rounded-full border border-border bg-muted/50 px-3 py-1 text-sm"
                      >
                        {model}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Calendly inline widget */}
              <div className="relative">
                <div className="rounded-xl border border-border dark:border-white/10 overflow-hidden">
                  <div
                    className="calendly-inline-widget"
                    data-url={`${CALENDLY_URL}?background_color=ffffff&primary_color=13631e&text_color=081a14`}
                    style={{ minWidth: "480px", height: "520px" }}
                  />
                  <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-y border-border dark:border-white/10 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="font-serif text-2xl font-semibold text-foreground dark:text-white md:text-3xl">Frequently Asked Questions</h2>
            <div className="mt-8 max-w-2xl">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Alternative Contact */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="font-serif text-2xl font-semibold text-foreground dark:text-white md:text-3xl">Prefer to Email or Call?</h2>
            <p className="mt-2 text-muted-foreground dark:text-white/65">
              We&apos;re here to help. Reach out through your preferred channel.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-border dark:border-white/10 bg-white/80 dark:bg-[#162923]/80 p-6 backdrop-blur-sm transition-all hover:border-emerald-400/40">
                <h3 className="font-semibold text-foreground dark:text-white">Email</h3>
                <p className="mt-2 text-sm text-muted-foreground dark:text-white/65">strategy@sageadvisory.com</p>
              </div>
              <div className="rounded-xl border border-border dark:border-white/10 bg-white/80 dark:bg-[#162923]/80 p-6 backdrop-blur-sm transition-all hover:border-emerald-400/40">
                <h3 className="font-semibold text-foreground dark:text-white">Phone</h3>
                <p className="mt-2 text-sm text-muted-foreground dark:text-white/65">+1 (555) 123-4567</p>
              </div>
              <div className="rounded-xl border border-border dark:border-white/10 bg-white/80 dark:bg-[#162923]/80 p-6 backdrop-blur-sm transition-all hover:border-emerald-400/40">
                <h3 className="font-semibold text-foreground dark:text-white">LinkedIn</h3>
                <p className="mt-2 text-sm text-muted-foreground dark:text-white/65">linkedin.com/company/sage-advisory</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
