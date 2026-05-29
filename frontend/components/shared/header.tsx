"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { useTheme } from "next-themes"
import { ThemeToggle } from "@/components/shared/theme-toggle"

interface HeaderProps {
  activePage?: "home" | "capabilities" | "about" | "insights" | "case-studies" | "contact"
  variant?: "default" | "dark"
}

const capabilityDropdownItems = [
  { href: "/capabilities", label: "Capabilities & Technology" },
  { href: "/capabilities?section=services", label: "Services & Outcomes" },
]

const aboutDropdownItems = [
  { href: "/about", label: "Mission Statement & Vision" },
  { href: "/about?section=founder", label: "Meet the Founder" },
]

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
  const [capHovered, setCapHovered] = useState(false)
  const [aboutHovered, setAboutHovered] = useState(false)
  const { resolvedTheme } = useTheme()
  const isThemeDark = resolvedTheme === "dark"

  return (
    <header className={`sticky top-0 z-50 ${isDark ? "border-b border-white/10 bg-[#1a3529]" : "border-b border-border bg-background"}`}>
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
            const isCapabilities = page === "capabilities"
            const isAbout = page === "about"

            if (isCapabilities || isAbout) {
              const dropdownItems = isCapabilities ? capabilityDropdownItems : aboutDropdownItems
              const hovered = isCapabilities ? capHovered : aboutHovered
              const setHovered = isCapabilities ? setCapHovered : setAboutHovered

              return (
                <div
                  key={page}
                  className="relative"
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  {/* Trigger */}
                  <Link
                    href={href}
                    className={`group relative flex items-center gap-1 text-base font-medium transition-colors ${
                      isDark
                        ? isActive ? "text-white" : "text-white/70 hover:text-white"
                        : isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {label}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${hovered ? "rotate-180" : ""} ${
                        isDark ? "text-white/50" : "text-muted-foreground"
                      }`}
                    />
                    <span
                      className={`absolute -bottom-1 left-0 h-[2px] rounded-full transition-all duration-300 ease-out ${
                        isDark ? "bg-emerald-400" : "bg-foreground"
                      } ${isActive || hovered ? "w-full" : "w-0 group-hover:w-full"}`}
                    />
                  </Link>

                  {/* Dropdown panel */}
                  <div
                    className={`absolute left-1/2 top-full -translate-x-1/2 pt-4 transition-all duration-200 ${
                      hovered ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-1"
                    }`}
                  >
                    <div
                      className={`min-w-[240px] overflow-hidden rounded-xl border shadow-xl backdrop-blur-sm ${
                        isDark
                          ? "border-emerald-400/20 bg-[#162923]/98"
                          : "border-border bg-white/98"
                      }`}
                    >
                      {dropdownItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`group/item relative flex items-center px-5 py-3.5 text-sm font-medium transition-colors ${
                            isDark
                              ? "text-white/75 hover:bg-emerald-400/10 hover:text-white"
                              : "text-muted-foreground hover:bg-emerald-50 hover:text-foreground"
                          }`}
                        >
                          <span className="relative">
                            {item.label}
                            <span
                              className={`absolute -bottom-0.5 left-0 h-[1.5px] w-0 rounded-full transition-all duration-300 ease-out group-hover/item:w-full ${
                                isDark ? "bg-emerald-400" : "bg-emerald-500"
                              }`}
                            />
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )
            }

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

        {/* Theme toggle (desktop) */}
        <div className="ml-auto hidden items-center md:flex">
          <ThemeToggle variant={variant} />
        </div>

        {/* Hamburger button (mobile only) */}
        <button
          className={`flex items-center justify-center rounded-md p-2 transition-colors md:hidden ${
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
        <div className={`border-t md:hidden ${
          isDark
            ? `border-white/10 ${isThemeDark ? "bg-[#0d1f1a]" : "bg-background"}`
            : "border-border bg-background"
        }`}>
          <nav className="flex flex-col px-4 py-3">
            {navLinks.map(({ href, label, page }) => {
              const isActive = activePage === page
              const isCapabilities = page === "capabilities"
              const isAbout = page === "about"
              const mobileSubItems = isCapabilities
                ? capabilityDropdownItems
                : isAbout
                ? aboutDropdownItems
                : null

              return (
                <div key={page}>
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`border-b py-3 text-base font-medium transition-colors block ${
                      isDark ? "border-white/10" : "border-border"
                    } ${
                      isDark
                        ? isActive ? "text-white" : "text-white/65 hover:text-white"
                        : isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {label}
                  </Link>

                  {mobileSubItems && mobileSubItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-2 border-b py-2.5 pl-5 text-sm font-medium transition-colors ${
                        isDark ? "border-white/10 text-emerald-400/80 hover:text-emerald-300" : "border-border text-emerald-600 hover:text-emerald-700"
                      }`}
                    >
                      <span className="h-px w-3 rounded-full bg-current opacity-50" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              )
            })}

            {/* Appearance row */}
            <div className={`flex items-center justify-between py-2 ${
              isDark ? "text-white/65" : "text-muted-foreground"
            }`}>
              <span className="text-sm font-medium">Appearance</span>
              <ThemeToggle variant={variant} />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
