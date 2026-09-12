import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

const sizes = {
  sm: { shell: "h-11 w-11", core: "h-9 w-9", icon: "h-4 w-4", radius: "rounded-[0.85rem]", coreRadius: "rounded-[0.65rem]" },
  md: { shell: "h-14 w-14", core: "h-11 w-11", icon: "h-5 w-5", radius: "rounded-2xl", coreRadius: "rounded-xl" },
  lg: { shell: "h-20 w-20", core: "h-16 w-16", icon: "h-7 w-7", radius: "rounded-[1.5rem]", coreRadius: "rounded-2xl" },
}

/**
 * Double-bezel icon badge: an outer "machined" shell + an inner core panel
 * with a soft top highlight and inset ring, so the icon reads as a small
 * physical object rather than a flat colored square.
 */
export function IconBadge({
  icon: Icon,
  size = "md",
  className,
}: {
  icon: LucideIcon
  size?: "sm" | "md" | "lg"
  className?: string
}) {
  const s = sizes[size]

  return (
    <div
      className={cn(
        "relative flex flex-shrink-0 items-center justify-center border border-emerald-950/[0.06] bg-emerald-950/[0.03] transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] dark:border-white/[0.06] dark:bg-white/[0.03]",
        s.shell,
        s.radius,
        className
      )}
    >
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-emerald-500/18 to-emerald-500/6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] ring-1 ring-inset ring-emerald-400/25 dark:from-accent-emerald/22 dark:to-accent-emerald/6 dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] dark:ring-accent-emerald/25",
          s.core,
          s.coreRadius
        )}
      >
        {/* top sheen */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/50 to-transparent opacity-70 dark:from-white/10"
          aria-hidden
        />
        <Icon
          className={cn("relative z-10 text-emerald-700 dark:text-accent-emerald", s.icon)}
          strokeWidth={1.6}
        />
      </div>
    </div>
  )
}
