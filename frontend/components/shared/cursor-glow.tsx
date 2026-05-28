"use client"

import { useEffect, useRef } from "react"

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let rafId = 0
    let lastX = window.innerWidth / 2
    let lastY = window.innerHeight / 2

    const apply = () => {
      el.style.setProperty("--cx", `${lastX}px`)
      el.style.setProperty("--cy", `${lastY}px`)
      rafId = 0
    }

    const handler = (e: MouseEvent) => {
      lastX = e.clientX
      lastY = e.clientY
      if (rafId) return
      rafId = requestAnimationFrame(apply)
    }

    apply()
    window.addEventListener("mousemove", handler, { passive: true })
    return () => {
      window.removeEventListener("mousemove", handler)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] mix-blend-screen"
      style={{
        background:
          "radial-gradient(circle 180px at var(--cx, 50%) var(--cy, 50%), rgba(110, 231, 183, 0.13), rgba(110, 231, 183, 0.04) 40%, transparent 70%)",
      }}
    />
  )
}
