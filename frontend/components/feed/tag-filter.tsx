"use client"

import { Info } from "lucide-react"

type Props = {
  tagCounts: { tag: string; count: number }[]
  selectedTag: string | null
  onSelect: (tag: string | null) => void
}

export function TagFilter({ tagCounts, selectedTag, onSelect }: Props) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 space-y-6">
        <div className="rounded-xl border border-white/10 bg-[#0f1815]/80 p-5 backdrop-blur-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/80">
            Filter
          </p>
          <h3 className="mt-2 text-sm font-semibold text-white">Topics</h3>
          <div className="mt-4 flex flex-col gap-1.5">
            <button
              onClick={() => onSelect(null)}
              className={`flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors ${
                selectedTag === null
                  ? "bg-emerald-500/15 text-emerald-100"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span>All updates</span>
            </button>
            {tagCounts.map(({ tag, count }) => {
              const active = selectedTag === tag
              return (
                <button
                  key={tag}
                  onClick={() => onSelect(active ? null : tag)}
                  className={`flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors ${
                    active
                      ? "bg-emerald-500/15 text-emerald-100"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span>{tag}</span>
                  <span className="text-xs text-white/40">{count}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#0f1815]/60 p-5 backdrop-blur-sm">
          <div className="flex items-start gap-2">
            <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400/80" />
            <div>
              <h3 className="text-sm font-semibold text-white">About this feed</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-white/60">
                Real updates from our team on active engagements — strategy, transformation, and execution in motion. Reading is open to everyone; signing in to like or comment is coming soon.
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
