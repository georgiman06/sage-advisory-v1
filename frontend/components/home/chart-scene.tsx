"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

const BASE_COLOR = "#0a1f18"
const FOG_NEAR = 6
const FOG_FAR = 16

const LINE_SERIES = [
  { color: "#5fbf91", offsetZ: -1.0, amplitude: 0.8, speed: 0.35 },
  { color: "#2d7a5a", offsetZ: 0.0, amplitude: 1.0, speed: 0.30 },
  { color: "#c9a14a", offsetZ: 1.0, amplitude: 0.6, speed: 0.40 },
  { color: "#f5ecd0", offsetZ: 2.0, amplitude: 0.5, speed: 0.32 },
] as const

const POINTS_PER_SERIES = 140
const X_RANGE = 14 // chart spans x from -7 to +7
const CANDLE_COUNT = 36
const PARTICLE_COUNT = 500

function GridPlane() {
  const grid = useMemo(() => {
    const size = 24
    const divisions = 24
    const helper = new THREE.GridHelper(size, divisions, "#5fbf91", "#5fbf91")
    const mat = helper.material as THREE.LineBasicMaterial | THREE.LineBasicMaterial[]
    if (Array.isArray(mat)) {
      mat.forEach((m) => {
        m.transparent = true
        m.opacity = 0.08
      })
    } else {
      mat.transparent = true
      mat.opacity = 0.08
    }
    helper.position.y = -1.5
    return helper
  }, [])
  return <primitive object={grid} />
}

function ChartLine({
  color,
  offsetZ,
  amplitude,
  speed,
  paused,
}: {
  color: string
  offsetZ: number
  amplitude: number
  speed: number
  paused: React.RefObject<boolean>
}) {
  const ref = useRef<THREE.Line>(null!)
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const positions = new Float32Array(POINTS_PER_SERIES * 3)
    let y = 0
    const step = X_RANGE / (POINTS_PER_SERIES - 1)
    for (let i = 0; i < POINTS_PER_SERIES; i++) {
      const x = -X_RANGE / 2 + i * step
      // smooth random walk
      y += (Math.random() - 0.5) * 0.4
      y = THREE.MathUtils.clamp(y, -amplitude * 1.5, amplitude * 1.5)
      positions[i * 3 + 0] = x
      positions[i * 3 + 1] = y * amplitude
      positions[i * 3 + 2] = offsetZ
    }
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    return g
  }, [offsetZ, amplitude])

  const material = useMemo(
    () => new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.9 }),
    [color]
  )

  const lastYRef = useRef<number>(0)

  useFrame((_, dt) => {
    if (paused.current) return
    const positions = geometry.attributes.position.array as Float32Array
    const shift = speed * dt
    // shift everything left, then write a new sample at the rightmost slot
    for (let i = 0; i < POINTS_PER_SERIES - 1; i++) {
      positions[i * 3 + 0] = positions[(i + 1) * 3 + 0] - 0 // x stays gridded
      positions[i * 3 + 1] = positions[(i + 1) * 3 + 1]
    }
    // overwrite x with fixed grid each frame so points don't drift
    const step = X_RANGE / (POINTS_PER_SERIES - 1)
    for (let i = 0; i < POINTS_PER_SERIES; i++) {
      positions[i * 3 + 0] = -X_RANGE / 2 + i * step
    }
    // generate new point on the right
    const nextY = THREE.MathUtils.clamp(
      lastYRef.current + (Math.random() - 0.5) * 0.5 * amplitude,
      -amplitude * 1.5,
      amplitude * 1.5
    )
    lastYRef.current = nextY
    positions[(POINTS_PER_SERIES - 1) * 3 + 1] = nextY

    // accumulate small fractional shift to keep motion smooth
    // (the integer-step shift above already advances one slot per frame at 60fps with speed~0.35)
    // For finer motion we offset visually:
    if (ref.current) {
      ref.current.position.x = (ref.current.position.x - shift) % step
    }
    geometry.attributes.position.needsUpdate = true
  })

  const line = useMemo(() => new THREE.Line(geometry, material), [geometry, material])
  return <primitive object={line} ref={ref} />
}

function Candlesticks({ paused }: { paused: React.RefObject<boolean> }) {
  const groupRef = useRef<THREE.Group>(null)
  const candles = useMemo(() => {
    const arr: { x: number; height: number; color: string; key: number }[] = []
    let y = 0
    for (let i = 0; i < CANDLE_COUNT; i++) {
      const delta = (Math.random() - 0.5) * 0.6
      y += delta
      y = THREE.MathUtils.clamp(y, -1.8, 1.8)
      arr.push({
        x: -X_RANGE / 2 + (i / (CANDLE_COUNT - 1)) * X_RANGE,
        height: Math.max(0.15, Math.abs(delta) * 3 + Math.random() * 0.6),
        color: delta >= 0 ? "#5fbf91" : "#c9a14a",
        key: i,
      })
    }
    return arr
  }, [])

  useFrame((_, dt) => {
    if (paused.current) return
    if (groupRef.current) {
      groupRef.current.position.x -= 0.4 * dt
      if (groupRef.current.position.x < -X_RANGE) {
        groupRef.current.position.x = 0
      }
    }
  })

  return (
    <group ref={groupRef} position={[0, -0.5, -2]}>
      {candles.map((c) => (
        <mesh key={c.key} position={[c.x, c.height / 2, 0]}>
          <boxGeometry args={[0.18, c.height, 0.18]} />
          <meshStandardMaterial color={c.color} transparent opacity={0.75} />
        </mesh>
      ))}
      {/* duplicate trailing copy so the recycle is seamless */}
      {candles.map((c) => (
        <mesh key={c.key + CANDLE_COUNT} position={[c.x + X_RANGE, c.height / 2, 0]}>
          <boxGeometry args={[0.18, c.height, 0.18]} />
          <meshStandardMaterial color={c.color} transparent opacity={0.75} />
        </mesh>
      ))}
    </group>
  )
}

function ParticleField({ paused }: { paused: React.RefObject<boolean> }) {
  const ref = useRef<THREE.Points>(null!)
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14 - 2
    }
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    return g
  }, [])
  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: "#f5ecd0",
        size: 0.03,
        transparent: true,
        opacity: 0.55,
        sizeAttenuation: true,
      }),
    []
  )

  useFrame((_, dt) => {
    if (paused.current) return
    const positions = geometry.attributes.position.array as Float32Array
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3 + 0] -= 0.15 * dt
      if (positions[i * 3 + 0] < -15) positions[i * 3 + 0] = 15
    }
    geometry.attributes.position.needsUpdate = true
  })

  return <primitive object={new THREE.Points(geometry, material)} ref={ref} />
}

function FogSetup() {
  const { scene } = useThree()
  useEffect(() => {
    scene.fog = new THREE.Fog(BASE_COLOR, FOG_NEAR, FOG_FAR)
    scene.background = new THREE.Color(BASE_COLOR)
    return () => {
      scene.fog = null
      scene.background = null
    }
  }, [scene])
  return null
}

export function ChartScene() {
  const paused = useRef(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    paused.current = reducedMotion
  }, [reducedMotion])

  useEffect(() => {
    if (!wrapRef.current) return
    const io = new IntersectionObserver(
      ([entry]) => {
        paused.current = !entry.isIntersecting || reducedMotion
      },
      { threshold: 0.01 }
    )
    io.observe(wrapRef.current)
    return () => io.disconnect()
  }, [reducedMotion])

  return (
    <div ref={wrapRef} className="h-full w-full" style={{ background: BASE_COLOR }}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 3.2, 7], fov: 55 }}
        gl={{ antialias: true, alpha: false }}
      >
        <FogSetup />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 6, 4]} intensity={0.5} />
        <group rotation={[-0.18, -0.25, 0]}>
          <GridPlane />
          {LINE_SERIES.map((s, i) => (
            <ChartLine key={i} {...s} paused={paused} />
          ))}
          <Candlesticks paused={paused} />
        </group>
        <ParticleField paused={paused} />
      </Canvas>
    </div>
  )
}

export default ChartScene
