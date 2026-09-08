"use client"

import { useMemo } from "react"

type Particle = {
  x: number
  y: number
  size: number
  rotate: number
  color: string
  delay: number
  duration: number
}

const PALETTE = ["#34d399", "#6ee7b7", "#fbbf24", "#5eead4", "#a78bfa"]

/**
 * Ambient scattered-triangle field — a restrained nod to the
 * "constellation on black velvet" reference: small outlined triangles
 * drifting at low opacity, never competing with foreground type.
 * Deterministic (seeded) so server/client markup matches.
 */
function seededRandom(seed: number) {
  let value = seed
  return () => {
    value = (value * 9301 + 49297) % 233280
    return value / 233280
  }
}

export function ParticleField({
  count = 42,
  className,
}: {
  count?: number
  className?: string
}) {
  const particles = useMemo<Particle[]>(() => {
    const rand = seededRandom(1337)
    return Array.from({ length: count }, (_, i) => ({
      x: rand() * 100,
      y: rand() * 100,
      size: 4 + rand() * 10,
      rotate: rand() * 360,
      color: PALETTE[i % PALETTE.length],
      delay: rand() * 6,
      duration: 5 + rand() * 6,
    }))
  }, [count])

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute animate-particle-drift"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: 0.5,
          }}
        >
          <svg
            viewBox="0 0 10 10"
            width={p.size}
            height={p.size}
            style={{ transform: `rotate(${p.rotate}deg)` }}
          >
            <polygon
              points="5,0.6 9.4,9.2 0.6,9.2"
              fill="none"
              stroke={p.color}
              strokeWidth="0.9"
            />
          </svg>
        </span>
      ))}
    </div>
  )
}
