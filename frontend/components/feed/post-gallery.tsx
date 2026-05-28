"use client"

import { useState } from "react"
import { ImageIcon } from "lucide-react"

type Props = {
  images: string[]
}

function Tile({
  src,
  className,
  overlay,
}: {
  src: string
  className: string
  overlay?: string
}) {
  const [failed, setFailed] = useState(false)
  return (
    <a
      href={failed ? undefined : src}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block overflow-hidden bg-[#13241d] ${className}`}
    >
      {failed ? (
        <div className="flex h-full w-full items-center justify-center border border-emerald-400/15">
          <ImageIcon className="h-6 w-6 text-emerald-400/40" />
        </div>
      ) : (
        <img
          src={src}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      )}
      {overlay && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/55 text-2xl font-semibold text-white">
          {overlay}
        </div>
      )}
    </a>
  )
}

export function PostGallery({ images }: Props) {
  if (!images.length) return null

  const count = images.length
  const visible = images.slice(0, 4)
  const extra = Math.max(0, count - 4)

  if (count === 1) {
    return (
      <div className="mt-4 max-h-[500px] overflow-hidden border-y border-white/5">
        <Tile src={visible[0]} className="h-full w-full" />
      </div>
    )
  }

  if (count === 2) {
    return (
      <div className="mt-4 grid h-[360px] grid-cols-2 gap-0.5 overflow-hidden border-y border-white/5">
        <Tile src={visible[0]} className="h-full w-full" />
        <Tile src={visible[1]} className="h-full w-full" />
      </div>
    )
  }

  // 3 or 4+ : tall left + stacked right
  const rightTiles = visible.slice(1)
  const rightRows = rightTiles.length
  return (
    <div className="mt-4 grid h-[440px] grid-cols-[1.4fr_1fr] gap-0.5 overflow-hidden border-y border-white/5">
      <Tile src={visible[0]} className="h-full w-full" />
      <div
        className="grid gap-0.5"
        style={{ gridTemplateRows: `repeat(${rightRows}, minmax(0, 1fr))` }}
      >
        {rightTiles.map((src, i) => {
          const isLast = i === rightTiles.length - 1
          return (
            <Tile
              key={`${src}-${i}`}
              src={src}
              className="h-full w-full"
              overlay={isLast && extra > 0 ? `+${extra}` : undefined}
            />
          )
        })}
      </div>
    </div>
  )
}
