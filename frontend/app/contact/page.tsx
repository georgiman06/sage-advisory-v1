"use client"

import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Cal, { getCalApi } from "@calcom/embed-react"
import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { submitLead, captureUtmParams } from "@/lib/api"

const CALCOM_LINK = process.env.NEXT_PUBLIC_CALCOM_LINK || "discovery-call/discovery-call"

const schema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  work_email: z.string().email("Please enter a valid work email"),
  company: z.string().min(1, "Company name is required"),
  role: z.enum([
    "C-Suite Executive",
    "VP/Director",
    "Manager",
    "Data Architect/Engineer",
    "Data Analyst/Scientist",
    "Other",
  ]),
  area_of_interest: z.string().optional(),
  message: z.string().min(20, "Please provide at least 20 characters describing your project"),
  agreed_to_contact: z.literal(true, {
    errorMap: () => ({ message: "You must agree to be contacted to submit" }),
  }),
})

type FormValues = z.infer<typeof schema>

const expectations = [
  "Initial Assessment: 30-minute discovery call to understand your challenges",
  "V2V Roadmap: Customized transformation roadmap aligned to your goals",
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
    answer: "Engagements vary based on scope. Strategic assessments typically take 4-6 weeks, while full V2V Framework implementations range from 6-18 months depending on complexity.",
  },
  {
    question: "Do you work with companies outside the US?",
    answer: "Yes, we work with global enterprises across North America, Europe, and Asia. Our team has experience with international data regulations and compliance requirements.",
  },
  {
    question: "What industries do you specialize in?",
    answer: "We have deep expertise in Financial Services, Healthcare, Retail, Technology, and Utilities. However, our V2V Framework is industry-agnostic and applicable to any enterprise.",
  },
  {
    question: "What is the typical ROI timeline?",
    answer: "Most clients realize measurable ROI within 6-9 months. Quick wins (cost optimization, governance) deliver value in the first 2-3 months.",
  },
]

export default function ContactPage() {
  const [step, setStep] = useState<"form" | "booking">("form")
  const [bookingPrefill, setBookingPrefill] = useState<{ name: string; email: string } | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      const cal = await getCalApi({ namespace: "discovery" })
      cal("ui", {
        theme: "light",
        hideEventTypeDetails: false,
        layout: "month_view",
      })
    })()
  }, [])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { agreed_to_contact: undefined as unknown as true },
  })

  const onSubmit = async (data: FormValues) => {
    setSubmitError(null)
    try {
      await submitLead({
        ...data,
        ...captureUtmParams(),
      })
      setBookingPrefill({ name: data.full_name, email: data.work_email })
      setStep("booking")
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      )
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative bg-gradient-to-b from-emerald-50 via-emerald-50/60 to-emerald-50/20 dark:from-[#22513f] dark:via-[#143028] dark:to-[#0d1e17]">
        <Header activePage="contact" variant="dark" />

        {/* Hero Section */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h1 className="text-4xl font-bold tracking-tight text-foreground dark:text-white md:text-5xl">Start Your Transformation</h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground dark:text-white/80">
              Partner with Sage Advisory to unlock the full value of your data.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-foreground dark:text-white md:text-3xl">Book a Discovery Call</h2>
              <p className="mt-2 text-muted-foreground dark:text-white/65">
                Share a few details about your project so we can prepare for your call. After you submit, you&apos;ll pick a time that works for you.
              </p>
            </div>
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Left Column - Info */}
              <div>
                <p className="text-muted-foreground leading-relaxed">
                  Ready to modernize your data ecosystem? Let&apos;s discuss your transformation
                  initiatives and explore how our V2V Framework can accelerate your journey
                  to data-driven excellence.
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

              {/* Right Column - Form */}
              <div>
                <Card className="border-border">
                  <CardContent className="p-6">
                    <h3 className="font-semibold">Contact Form</h3>

                    {step === "booking" ? (
                      <div className="mt-6 rounded-lg bg-muted/50 p-6 text-center">
                        <p className="font-medium">Thanks{bookingPrefill?.name ? `, ${bookingPrefill.name.split(" ")[0]}` : ""}!</p>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Pick a time below to book your discovery call.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="full_name">Full Name *</Label>
                          <Input
                            id="full_name"
                            placeholder="Enter your full name"
                            {...register("full_name")}
                            aria-invalid={!!errors.full_name}
                          />
                          {errors.full_name && (
                            <p className="text-xs text-destructive">{errors.full_name.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="work_email">Work Email *</Label>
                          <Input
                            id="work_email"
                            type="email"
                            placeholder="you@company.com"
                            {...register("work_email")}
                            aria-invalid={!!errors.work_email}
                          />
                          {errors.work_email && (
                            <p className="text-xs text-destructive">{errors.work_email.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="company">Company *</Label>
                          <Input
                            id="company"
                            placeholder="Your company name"
                            {...register("company")}
                            aria-invalid={!!errors.company}
                          />
                          {errors.company && (
                            <p className="text-xs text-destructive">{errors.company.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label>Role *</Label>
                          <Controller
                            name="role"
                            control={control}
                            render={({ field }) => (
                              <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger aria-invalid={!!errors.role}>
                                  <SelectValue placeholder="Select your role" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="C-Suite Executive">C-Suite Executive</SelectItem>
                                  <SelectItem value="VP/Director">VP / Director</SelectItem>
                                  <SelectItem value="Manager">Manager</SelectItem>
                                  <SelectItem value="Data Architect/Engineer">Data Architect / Engineer</SelectItem>
                                  <SelectItem value="Data Analyst/Scientist">Data Analyst / Scientist</SelectItem>
                                  <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          />
                          {errors.role && (
                            <p className="text-xs text-destructive">{errors.role.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label>Area of Interest</Label>
                          <Controller
                            name="area_of_interest"
                            control={control}
                            render={({ field }) => (
                              <Select onValueChange={field.onChange} value={field.value ?? ""}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select area of interest" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Enterprise Data Strategy">Enterprise Data Strategy</SelectItem>
                                  <SelectItem value="Cloud Data Platforms">Cloud Data Platforms</SelectItem>
                                  <SelectItem value="Analytics & BI">Analytics &amp; BI</SelectItem>
                                  <SelectItem value="AI & Advanced Analytics">AI &amp; Advanced Analytics</SelectItem>
                                  <SelectItem value="Data Governance">Data Governance</SelectItem>
                                  <SelectItem value="V2V Framework Assessment">V2V Framework Assessment</SelectItem>
                                  <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Tell us about your project *</Label>
                          <Textarea
                            id="message"
                            placeholder="Describe your challenges and goals..."
                            className="min-h-[100px]"
                            {...register("message")}
                            aria-invalid={!!errors.message}
                          />
                          {errors.message && (
                            <p className="text-xs text-destructive">{errors.message.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <Controller
                              name="agreed_to_contact"
                              control={control}
                              render={({ field }) => (
                                <Checkbox
                                  id="agreed_to_contact"
                                  checked={field.value === true}
                                  onCheckedChange={(checked) =>
                                    field.onChange(checked === true ? true : undefined)
                                  }
                                  aria-invalid={!!errors.agreed_to_contact}
                                />
                              )}
                            />
                            <Label htmlFor="agreed_to_contact" className="text-sm text-muted-foreground leading-relaxed">
                              I agree to be contacted by Sage Advisory regarding my inquiry.
                              We respect your privacy and will never share your information.
                            </Label>
                          </div>
                          {errors.agreed_to_contact && (
                            <p className="text-xs text-destructive">{errors.agreed_to_contact.message}</p>
                          )}
                        </div>

                        {submitError && (
                          <div className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                            {submitError}
                          </div>
                        )}

                        <Button
                          type="submit"
                          className="w-full"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Sending..." : "Send Inquiry"}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {step === "booking" && bookingPrefill && (
              <div className="mt-12">
                <Card className="border-border overflow-hidden">
                  <CardContent className="p-0">
                    <div className="min-h-[480px] sm:min-h-[640px]">
                      <Cal
                        namespace="discovery"
                        calLink={CALCOM_LINK}
                        style={{ width: "100%", height: "100%", minHeight: "480px", overflow: "scroll" }}
                        config={{
                          layout: "month_view",
                          name: bookingPrefill.name,
                          email: bookingPrefill.email,
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-y border-border dark:border-white/10 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-2xl font-semibold text-foreground dark:text-white md:text-3xl">Frequently Asked Questions</h2>
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
            <h2 className="text-2xl font-semibold text-foreground dark:text-white md:text-3xl">Prefer to Email or Call?</h2>
            <p className="mt-2 text-muted-foreground dark:text-white/65">
              We&apos;re here to help. Reach out through your preferred channel.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-border dark:border-white/10 bg-white/80 dark:bg-[#162923]/80 p-6 backdrop-blur-sm transition-all hover:border-emerald-400/40">
                <h3 className="font-semibold text-foreground dark:text-white">Email</h3>
                <p className="mt-2 text-sm text-muted-foreground dark:text-white/65">strategy@sageconsulting.com</p>
              </div>
              <div className="rounded-xl border border-border dark:border-white/10 bg-white/80 dark:bg-[#162923]/80 p-6 backdrop-blur-sm transition-all hover:border-emerald-400/40">
                <h3 className="font-semibold text-foreground dark:text-white">Phone</h3>
                <p className="mt-2 text-sm text-muted-foreground dark:text-white/65">+1 (555) 123-4567</p>
              </div>
              <div className="rounded-xl border border-border dark:border-white/10 bg-white/80 dark:bg-[#162923]/80 p-6 backdrop-blur-sm transition-all hover:border-emerald-400/40">
                <h3 className="font-semibold text-foreground dark:text-white">LinkedIn</h3>
                <p className="mt-2 text-sm text-muted-foreground dark:text-white/65">linkedin.com/company/sage-consulting</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
