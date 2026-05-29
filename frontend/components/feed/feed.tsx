"use client"

import { useMemo, useState } from "react"
import { feedPosts } from "@/lib/feed-posts"
import { PostCard } from "./post-card"
import { TagFilter } from "./tag-filter"
import { SignInModal } from "./sign-in-modal"
import { PostComposer } from "./post-composer"

export function Feed() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [signInOpen, setSignInOpen] = useState(false)

  const tagCounts = useMemo(() => {
    const counts = new Map<string, number>()
    for (const post of feedPosts) {
      for (const tag of post.tags) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1)
      }
    }
    return Array.from(counts.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
  }, [])

  const visiblePosts = useMemo(() => {
    if (!selectedTag) return feedPosts
    return feedPosts.filter((p) => p.tags.includes(selectedTag))
  }, [selectedTag])

  return (
    <section className="pb-24 pt-12 md:pt-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/80">
            Updates
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground dark:text-white md:text-4xl">
            What our team is working on
          </h1>
          <p className="mt-4 text-base text-muted-foreground dark:text-white/70 md:text-lg">
            A running log of active engagements and field notes from the team — strategy through execution.
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_280px]">
          <div className="mx-auto w-full max-w-[640px] space-y-6 lg:mx-0">
            <PostComposer />
            {visiblePosts.length === 0 ? (
              <div className="rounded-xl border border-emerald-200/60 dark:border-white/10 bg-white/60 dark:bg-[#162923]/60 p-10 text-center text-sm text-muted-foreground dark:text-white/60">
                No posts match this filter yet.
              </div>
            ) : (
              visiblePosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onRequireSignIn={() => setSignInOpen(true)}
                />
              ))
            )}
          </div>

          <TagFilter
            tagCounts={tagCounts}
            selectedTag={selectedTag}
            onSelect={setSelectedTag}
          />
        </div>
      </div>

      <SignInModal open={signInOpen} onOpenChange={setSignInOpen} />
    </section>
  )
}
