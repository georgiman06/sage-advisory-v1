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
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h1 className="text-5xl font-bold tracking-tight text-foreground dark:text-white md:text-7xl">
                About Sage Advisory
              </h1>
              <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted-foreground dark:text-white/80 md:text-2xl">
                We are a specialized consulting firm focused exclusively on enterprise data strategy,
                AI transformation, and cloud modernization.
              </p>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-emerald-300 dark:border-emerald-400/25 bg-emerald-50/60 dark:bg-[#162923]/60 shadow-2xl">
              <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-[0.2em] text-emerald-400/70">
                Team photo
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <p className="text-base font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400/80">
                Vision
              </p>
              <h2 className="mt-4 text-4xl font-bold text-foreground dark:text-white md:text-5xl">
                A wisdom-driven future
              </h2>
              <p className="mt-5 text-xl leading-relaxed text-muted-foreground dark:text-white/70">
                To shape a future where wisdom-driven decisions create enduring competitive
                advantage through data, AI, and decentralized innovation.
              </p>
            </div>
            <div>
              <p className="text-base font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400/80">
                Mission
              </p>
              <h2 className="mt-4 text-4xl font-bold text-foreground dark:text-white md:text-5xl">
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
        <div className="absolute inset-0 bg-[#0d1f1a]/75" />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <p className="text-base font-bold uppercase tracking-[0.2em] text-emerald-400/80">
            Principles
          </p>
          <h2 className="mt-4 text-5xl font-bold tracking-tight text-white md:text-6xl">
            Our values
          </h2>
          <p className="mt-3 text-2xl text-white/65">The principles that guide everything we do.</p>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-white/10 bg-[#162923]/80 p-8 backdrop-blur-sm transition-all hover:border-emerald-400/40 hover:bg-[#1a3027]/90"
              >
                <h3 className="text-2xl font-bold text-white">{value.title}</h3>
                <p className="mt-3 text-xl leading-relaxed text-white/65">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
