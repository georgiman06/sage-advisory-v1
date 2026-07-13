import { cn } from "@/lib/utils"

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  /** Tighten the top padding (e.g. first section after a hero). */
  flushTop?: boolean
}

/**
 * Standard vertical rhythm for every page section: py-24 md:py-32.
 * Keeps the whole site on one spacing scale instead of ad-hoc py values.
 */
export function Section({ className, flushTop, children, ...props }: SectionProps) {
  return (
    <section
      className={cn("py-24 md:py-32", flushTop && "pt-16 md:pt-20", className)}
      {...props}
    >
      <div className="mx-auto max-w-6xl px-6">{children}</div>
    </section>
  )
}

type SectionHeaderProps = {
  eyebrow?: string
  title: React.ReactNode
  intro?: React.ReactNode
  align?: "left" | "center"
  className?: string
}

/**
 * Consistent header block: mono eyebrow → serif H2 → intro.
 * Fixed mt scale so headers never drift between sections.
 */
export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: SectionHeaderProps) {
  const centered = align === "center"
  return (
    <div
      className={cn(
        "max-w-2xl",
        centered && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-accent-emerald">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
      {intro && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          {intro}
        </p>
      )}
    </div>
  )
}
