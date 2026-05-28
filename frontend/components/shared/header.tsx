import Link from "next/link"

interface HeaderProps {
  activePage?: "home" | "capabilities" | "about" | "insights" | "case-studies" | "contact"
  variant?: "default" | "dark"
}

const navLinks = [
  { href: "/", label: "Home", page: "home" },
  { href: "/capabilities", label: "Capabilities", page: "capabilities" },
  { href: "/about", label: "About", page: "about" },
  { href: "/insights", label: "Insights", page: "insights" },
  { href: "/case-studies", label: "Case Studies", page: "case-studies" },
  { href: "/contact", label: "Contact", page: "contact" },
] as const

export function Header({ activePage = "home", variant = "default" }: HeaderProps) {
  const isDark = variant === "dark"

  return (
    <header className={isDark ? "border-b border-white/10" : "border-b border-border bg-background"}>
      <div className="mx-auto flex h-20 max-w-6xl items-center gap-12 px-6">
        <Link href="/" className="flex shrink-0 items-baseline gap-1.5 font-serif">
          <span className={`text-3xl font-bold tracking-tight ${isDark ? "text-white" : "text-foreground"}`}>
            sage
          </span>
          <span className={`text-4xl font-semibold tracking-tight ${isDark ? "text-white" : "text-foreground"}`}>
            Advisory LLC
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map(({ href, label, page }) => {
            const isActive = activePage === page
            return (
              <Link
                key={page}
                href={href}
                className={`group relative text-base font-medium transition-colors ${
                  isDark
                    ? isActive ? "text-white" : "text-white/70 hover:text-white"
                    : isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] rounded-full transition-all duration-300 ease-out ${
                    isDark ? "bg-emerald-400" : "bg-foreground"
                  } ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                />
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
