"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

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
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className={isDark ? "border-b border-white/10" : "border-b border-border bg-background"}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-20 md:gap-12 md:justify-start md:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-baseline gap-1 font-serif"
          onClick={() => setMobileOpen(false)}
        >
          <span className={`text-2xl font-bold tracking-tight md:text-3xl ${isDark ? "text-white" : "text-foreground"}`}>
            sage
          </span>
          <span className={`text-3xl font-semibold tracking-tight md:text-4xl ${isDark ? "text-white" : "text-foreground"}`}>
            Advisory LLC
          </span>
        </Link>

        {/* Desktop nav */}
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

        {/* Hamburger button (mobile only) */}
        <button
          className={`ml-auto flex items-center justify-center rounded-md p-2 transition-colors md:hidden ${
            isDark ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className={`border-t md:hidden ${isDark ? "border-white/10 bg-[#0d1f1a]" : "border-border bg-background"}`}>
          <nav className="flex flex-col px-4 py-3">
            {navLinks.map(({ href, label, page }) => {
              const isActive = activePage === page
              return (
                <Link
                  key={page}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`border-b py-3 text-base font-medium transition-colors ${
                    isDark ? "border-white/10" : "border-border"
                  } ${
                    isDark
                      ? isActive ? "text-white" : "text-white/65 hover:text-white"
                      : isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}
