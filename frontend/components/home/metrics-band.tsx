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
    <section className="border-y border-border dark:border-white/10 bg-emerald-50 dark:bg-[#10231c]">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <p className="text-center font-mono text-xs font-medium uppercase tracking-[0.22em] text-emerald-600 dark:text-accent-emerald">
          Measured impact
        </p>
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {metrics.map((m, i) => (
            <Reveal
              key={m.label}
              delay={i * 90}
              className="text-center"
            >
              <div className="font-mono text-4xl font-semibold tracking-tight text-foreground dark:text-white md:text-5xl">
                {m.value}
              </div>
              <div className="mx-auto mt-3 h-px w-10 bg-emerald-500/60 dark:bg-accent-emerald/60" />
              <p className="mt-3 text-sm leading-snug text-muted-foreground dark:text-white/60">{m.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
