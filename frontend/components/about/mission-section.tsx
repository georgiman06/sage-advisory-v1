const values = [
  {
    title: "Strategic Excellence",
    description: "We combine deep technical expertise with business acumen to deliver solutions that drive measurable outcomes.",
  },
  {
    title: "Partnership Approach",
    description: "We work alongside your teams, transferring knowledge and building internal capabilities that last.",
  },
  {
    title: "Innovation Focus",
    description: "We stay at the forefront of data and AI technologies to bring cutting-edge solutions to our clients.",
  },
  {
    title: "Results Driven",
    description: "Every engagement is measured by the tangible business impact we deliver to our clients.",
  },
]

export function MissionSection() {
  return (
    <>
      {/* Hero */}
      <section className="pt-16 pb-24 md:pt-20 md:pb-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-emerald-600 dark:text-accent-emerald">
                About us
              </p>
              <h1 className="mt-5 font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-foreground dark:text-white md:text-7xl">
                About Sage Advisory
              </h1>
              <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted-foreground dark:text-white/80 md:text-2xl">
                We are a specialized consulting firm focused exclusively on enterprise data strategy,
                AI transformation, and cloud modernization.
              </p>
            </div>

            {/* Branded graphic panel */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-emerald-300 dark:border-accent-emerald/20 bg-emerald-50/60 dark:bg-[#10231c] shadow-2xl">
              <div
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 70% 30%, rgba(52,211,153,0.18), transparent 55%)",
                }}
                aria-hidden
              />
              {/* concentric arcs motif */}
              <svg
                className="absolute -right-10 -top-10 h-72 w-72 text-emerald-500/30 dark:text-accent-emerald/25"
                viewBox="0 0 200 200"
                fill="none"
                aria-hidden
              >
                {[40, 70, 100].map((r) => (
                  <circle key={r} cx="100" cy="100" r={r} stroke="currentColor" strokeWidth="1" />
                ))}
              </svg>
              <div className="relative flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
                <span className="font-serif text-6xl font-semibold text-emerald-700 dark:text-white">
                  Sage
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-emerald-600/80 dark:text-accent-emerald/80">
                  Wisdom-driven advisory
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-emerald-600 dark:text-accent-emerald">
                Vision
              </p>
              <h2 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-foreground dark:text-white md:text-5xl">
                A wisdom-driven future
              </h2>
              <p className="mt-5 text-xl leading-relaxed text-muted-foreground dark:text-white/70">
                To shape a future where wisdom-driven decisions create enduring competitive
                advantage through data, AI, and decentralized innovation.
              </p>
            </div>
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-emerald-600 dark:text-accent-emerald">
                Mission
              </p>
              <h2 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-foreground dark:text-white md:text-5xl">
                From complexity to clarity
              </h2>
              <p className="mt-5 text-xl leading-relaxed text-muted-foreground dark:text-white/70">
                Sage Advisory empowers organizations to turn complexity into clarity by combining
                strategic wisdom, deep analytical insight, agentic &amp; emerging technologies, and
                execution excellence to deliver measurable business outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative overflow-hidden py-32 md:min-h-[720px]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          src="/videos/values-bg.mp4"
        />
        <div className="absolute inset-0 bg-[#081a14]/80" />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-accent-emerald">
            Principles
          </p>
          <h2 className="mt-4 font-serif text-5xl font-semibold tracking-tight text-white md:text-6xl">
            Our values
          </h2>
          <p className="mt-4 text-xl text-white/65 md:text-2xl">The principles that guide everything we do.</p>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-white/10 bg-[#10231c]/80 p-8 backdrop-blur-sm transition-all hover:border-accent-emerald/40 hover:bg-[#183028]/90"
              >
                <h3 className="font-serif text-2xl font-semibold text-white">{value.title}</h3>
                <p className="mt-3 text-lg leading-relaxed text-white/65">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
