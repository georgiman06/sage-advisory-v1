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
    <section className="border-y border-white/10 bg-[#10231c]">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <p className="text-center font-mono text-xs font-medium uppercase tracking-[0.22em] text-accent-emerald">
          Measured impact
        </p>
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {metrics.map((m, i) => (
            <Reveal
              key={m.label}
              delay={i * 90}
              className="text-center"
            >
              <div className="font-mono text-4xl font-semibold tracking-tight text-white md:text-5xl">
                {m.value}
              </div>
              <div className="mx-auto mt-3 h-px w-10 bg-accent-emerald/60" />
              <p className="mt-3 text-sm leading-snug text-white/60">{m.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
