import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  activePage?: "home" | "capabilities" | "about" | "insights" | "case-studies" | "contact"
  variant?: "default" | "dark"
}

export function Header({ activePage = "home", variant = "default" }: HeaderProps) {
  const isDark = variant === "dark"
  
  return (
    <header className={isDark ? "border-b border-white/10" : "border-b border-border bg-background"}>
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Sage Advisory LLC"
            width={200}
            height={80}
            className="h-16 w-auto rounded-sm"
            priority
          />
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className={`text-sm transition-colors ${
              isDark 
                ? activePage === "home" ? "font-medium text-white" : "text-white/70 hover:text-white"
                : activePage === "home" ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Home
          </Link>
          <Link
            href="/capabilities"
            className={`text-sm transition-colors ${
              isDark 
                ? activePage === "capabilities" ? "font-medium text-white" : "text-white/70 hover:text-white"
                : activePage === "capabilities" ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Capabilities
          </Link>
          <Link
            href="/about"
            className={`text-sm transition-colors ${
              isDark 
                ? activePage === "about" ? "font-medium text-white" : "text-white/70 hover:text-white"
                : activePage === "about" ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            About
          </Link>
          <Link
            href="/insights"
            className={`text-sm transition-colors ${
              isDark 
                ? activePage === "insights" ? "font-medium text-white" : "text-white/70 hover:text-white"
                : activePage === "insights" ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Insights
          </Link>
          <Link
            href="/case-studies"
            className={`text-sm transition-colors ${
              isDark 
                ? activePage === "case-studies" ? "font-medium text-white" : "text-white/70 hover:text-white"
                : activePage === "case-studies" ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Case Studies
          </Link>
          <Link
            href="/contact"
            className={`text-sm transition-colors ${
              isDark 
                ? activePage === "contact" ? "font-medium text-white" : "text-white/70 hover:text-white"
                : activePage === "contact" ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Contact
          </Link>
        </nav>
        <Button size="sm">Get Started</Button>
      </div>
    </header>
  )
}
