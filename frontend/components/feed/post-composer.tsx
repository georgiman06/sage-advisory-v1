"use client"

import { useEffect, useState, type ChangeEvent } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ImagePlus, X, User } from "lucide-react"

const MAX_PREVIEW_TILES = 4
const TITLE_MAX = 100
const BODY_MAX = 1000

export function PostComposer() {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [previews, setPreviews] = useState<string[]>([])

  useEffect(() => {
    const urls = files.map((f) => URL.createObjectURL(f))
    setPreviews(urls)
    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u))
    }
  }, [files])

  const reset = () => {
    setTitle("")
    setBody("")
    setTags("")
    setFiles([])
    setSubmitted(false)
  }

  const handleOpenChange = (next: boolean) => {
    setOpen(next)
    if (!next) reset()
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files
    if (!list) return
    setFiles(Array.from(list))
  }

  const removeFile = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx))
  }

  const visiblePreviews = previews.slice(0, MAX_PREVIEW_TILES)
  const extra = Math.max(0, previews.length - MAX_PREVIEW_TILES)

  return (
    <>
      <div className="rounded-xl border border-white/10 bg-[#0f1815]/80 p-4 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
            <User className="h-5 w-5" />
          </div>
          <button
            onClick={() => setOpen(true)}
            className="flex-1 rounded-full border border-white/10 bg-black/30 px-4 py-3 text-left text-sm text-white/55 transition-colors hover:border-emerald-400/40 hover:bg-black/40 hover:text-white/80"
          >
            Share an update with clients&hellip;
          </button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-xl border-emerald-400/25 bg-[#0f1815] text-white">
          <DialogHeader>
            <DialogTitle className="text-white">New update</DialogTitle>
          </DialogHeader>

          {submitted && (
            <div className="rounded-md border border-emerald-400/30 bg-emerald-500/10 p-3 text-sm text-emerald-100">
              Posting is restricted to team members. Real sign-in and publishing arrive with our authentication rollout. Your draft has been kept locally &mdash; nothing was sent.
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-emerald-400/80">
                Headline
              </label>
              <input
                value={title}
                maxLength={TITLE_MAX}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Closed out our healthcare GenAI engagement"
                className="mt-1.5 w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none placeholder:text-white/35 focus:border-emerald-400/40"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-emerald-400/80">
                Body
              </label>
              <textarea
                value={body}
                maxLength={BODY_MAX}
                onChange={(e) => setBody(e.target.value)}
                rows={5}
                placeholder="What did your team accomplish for the client? What's the takeaway?"
                className="mt-1.5 w-full resize-none rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none placeholder:text-white/35 focus:border-emerald-400/40"
              />
              <p className="mt-1 text-right text-[11px] text-white/40">
                {body.length}/{BODY_MAX}
              </p>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-emerald-400/80">
                Images
              </label>
              <label className="mt-1.5 flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-white/15 bg-black/20 px-3 py-6 text-sm text-white/55 transition-colors hover:border-emerald-400/40 hover:text-white/80">
                <ImagePlus className="h-4 w-4" />
                <span>Click to select images</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {visiblePreviews.length > 0 && (
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {visiblePreviews.map((url, i) => {
                    const isLast = i === visiblePreviews.length - 1
                    return (
                      <div
                        key={url}
                        className="relative aspect-square overflow-hidden rounded-md border border-white/10 bg-[#0a1410]"
                      >
                        <img src={url} alt="" className="h-full w-full object-cover" />
                        {isLast && extra > 0 && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/55 text-lg font-semibold text-white">
                            +{extra}
                          </div>
                        )}
                        <button
                          onClick={() => removeFile(i)}
                          className="absolute right-1 top-1 rounded-full bg-black/60 p-0.5 text-white/80 hover:text-white"
                          aria-label="Remove image"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-emerald-400/80">
                Tags
              </label>
              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Comma-separated: Healthcare, AI Transformation"
                className="mt-1.5 w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none placeholder:text-white/35 focus:border-emerald-400/40"
              />
            </div>
          </div>

          <div className="mt-2 flex items-center justify-end gap-3">
            {submitted ? (
              <Button onClick={() => handleOpenChange(false)}>Close</Button>
            ) : (
              <>
                <Button variant="ghost" onClick={() => handleOpenChange(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setSubmitted(true)}>Post</Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
