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
  active = false,
  className,
}: {
  icon: LucideIcon
  size?: "sm" | "md" | "lg"
  /** Emphasized "current checkpoint" state — brighter core, glow ring, slight scale-up. */
  active?: boolean
  className?: string
}) {
  const s = sizes[size]

  return (
    <div
      className={cn(
        "relative flex flex-shrink-0 items-center justify-center border transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
        active
          ? "scale-110 border-emerald-400/50 shadow-[0_0_0_4px_rgba(16,185,129,0.12)] dark:border-accent-emerald/50 dark:shadow-[0_0_0_4px_rgba(16,185,129,0.16)]"
          : "scale-100 border-emerald-950/[0.06] bg-emerald-950/[0.03] dark:border-white/[0.06] dark:bg-white/[0.03]",
        s.shell,
        s.radius,
        className
      )}
    >
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] ring-1 ring-inset transition-[background,box-shadow] duration-500 dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]",
          active
            ? "bg-gradient-to-b from-emerald-500/32 to-emerald-500/12 ring-emerald-400/45 dark:from-accent-emerald/38 dark:to-accent-emerald/12 dark:ring-accent-emerald/45"
            : "bg-gradient-to-b from-emerald-500/18 to-emerald-500/6 ring-emerald-400/25 dark:from-accent-emerald/22 dark:to-accent-emerald/6 dark:ring-accent-emerald/25",
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
          className={cn(
            "relative z-10 transition-colors duration-500",
            active ? "text-emerald-800 dark:text-accent-emerald" : "text-emerald-700 dark:text-accent-emerald",
            s.icon
          )}
          strokeWidth={active ? 1.9 : 1.6}
        />
      </div>
    </div>
  )
}
