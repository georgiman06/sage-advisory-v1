"use client"

import { ThumbsUp, MessageCircle, Share2 } from "lucide-react"
import type { FeedPost } from "@/lib/feed-posts"
import { PostGallery } from "./post-gallery"

function relativeTime(iso: string): string {
  const then = new Date(iso).getTime()
  const now = Date.now()
  const diffMs = now - then
  const minutes = Math.floor(diffMs / 60000)
  if (minutes < 60) return `${Math.max(1, minutes)}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  const weeks = Math.floor(days / 7)
  if (weeks < 5) return `${weeks}w ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  const years = Math.floor(days / 365)
  return `${years}y ago`
}

type Props = {
  post: FeedPost
  onRequireSignIn: () => void
}

export function PostCard({ post, onRequireSignIn }: Props) {
  return (
    <article className="rounded-xl border border-white/10 bg-[#0f1815]/80 backdrop-blur-sm transition-colors hover:border-emerald-400/30">
      <header className="flex items-center gap-3 px-5 pt-5">
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-sm font-semibold text-emerald-300">
          {post.author.initials}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white">{post.author.name}</p>
          <p className="truncate text-xs text-white/55">{post.author.role}</p>
          <p className="mt-0.5 text-xs text-white/40">{relativeTime(post.postedAt)}</p>
        </div>
      </header>

      <div className="px-5 pt-4">
        <p className="whitespace-pre-line text-sm leading-relaxed text-white/85">{post.body}</p>
      </div>

      {post.images && post.images.length > 0 && <PostGallery images={post.images} />}

      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 px-5 pt-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-emerald-400/25 bg-emerald-500/10 px-2 py-0.5 text-[11px] text-emerald-100"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <footer className="mt-4 flex items-center gap-1 border-t border-white/10 px-3 py-2">
        <button
          onClick={onRequireSignIn}
          className="flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm text-white/65 transition-colors hover:bg-white/5 hover:text-white"
        >
          <ThumbsUp className="h-4 w-4" />
          <span>{post.likeCount}</span>
        </button>
        <button
          onClick={onRequireSignIn}
          className="flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm text-white/65 transition-colors hover:bg-white/5 hover:text-white"
        >
          <MessageCircle className="h-4 w-4" />
          <span>{post.commentCount}</span>
        </button>
        <button
          onClick={() => {
            if (typeof navigator !== "undefined" && navigator.clipboard) {
              navigator.clipboard.writeText(`${window.location.origin}/case-studies#${post.id}`).catch(() => {})
            }
          }}
          className="flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm text-white/65 transition-colors hover:bg-white/5 hover:text-white"
        >
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </button>
      </footer>
    </article>
  )
}
