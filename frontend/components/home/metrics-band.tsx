import { Reveal } from "@/components/shared/reveal"

type Metric = {
  value: string
  label: string
}

const metrics: Metric[] = [
  { value: "$10M+", label: "Operational savings delivered" },
  { value: "60,000+", label: "Enterprise users enabled" },
  { value: "98%", label: "Faster time-to-insight" },
  { value: "Fortune 100", label: "Scale engagements led" },
]

export function MetricsBand() {
  return (
    <section className="border-y border-border dark:border-transparent bg-emerald-50 dark:bg-black">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <p className="text-center font-mono text-xs font-semibold uppercase tracking-[0.28em] text-emerald-600 dark:text-amber-400">
          Measured impact
        </p>
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-4">
          {metrics.map((m, i) => (
            <Reveal
              key={m.label}
              delay={i * 90}
              className="text-center"
            >
              <div className="font-mono text-4xl font-semibold tracking-tight text-foreground dark:font-sans dark:font-normal dark:text-white dark:tracking-[-0.02em] md:text-5xl dark:md:text-[56px]">
                {m.value}
              </div>
              <div className="mx-auto mt-4 h-px w-10 bg-emerald-500/60 dark:bg-emerald-400/50" />
              <p className="mt-4 text-sm leading-snug text-muted-foreground dark:font-light dark:text-white/55">{m.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
