export type FeedPost = {
  id: string
  author: {
    name: string
    role: string
    initials: string
  }
  postedAt: string
  body: string
  images?: string[]
  tags: string[]
  likeCount: number
  commentCount: number
}

export const feedPosts: FeedPost[] = [
  {
    id: "post-001",
    author: {
      name: "Sangeeth Thuruthippallil",
      role: "Founder & Managing Partner",
      initials: "ST",
    },
    postedAt: "2026-05-22T14:30:00Z",
    body:
      "Closed out a 12-week data operating model engagement with a Fortune 100 insurer this week. Biggest takeaway after 20+ years of doing this: the technology is almost never the blocker. The blocker is whether the business and data teams share the same definition of 'customer.' If you fix nothing else this quarter, fix that.",
    images: [
      "/images/feed/insurer-workshop-1.jpg",
      "/images/feed/insurer-workshop-2.jpg",
      "/images/feed/insurer-workshop-3.jpg",
      "/images/feed/insurer-workshop-4.jpg",
    ],
    tags: ["Financial Services", "Data Strategy"],
    likeCount: 47,
    commentCount: 8,
  },
  {
    id: "post-002",
    author: {
      name: "Sangeeth Thuruthippallil",
      role: "Founder & Managing Partner",
      initials: "ST",
    },
    postedAt: "2026-05-18T09:15:00Z",
    body:
      "Kickoff this morning for a healthcare client's Generative AI governance program. Three things every governance framework needs that most miss: (1) a model registry with provenance, (2) an evaluation harness tied to clinical guardrails, (3) an escalation path that doesn't dead-end in IT. More to share as we ship.",
    images: [
      "/images/feed/healthcare-kickoff-1.jpg",
      "/images/feed/healthcare-kickoff-2.jpg",
      "/images/feed/healthcare-kickoff-3.jpg",
    ],
    tags: ["Healthcare", "AI Transformation", "Governance"],
    likeCount: 62,
    commentCount: 14,
  },
  {
    id: "post-003",
    author: {
      name: "Sangeeth Thuruthippallil",
      role: "Founder & Managing Partner",
      initials: "ST",
    },
    postedAt: "2026-05-12T16:00:00Z",
    body:
      "We migrated a retail client's reporting stack from a 14-year-old on-prem warehouse to a modern lakehouse over the last 8 months. Time-to-insight on weekly merchandising decisions went from 6 days to under 30 minutes. The unlock wasn't the tech — it was finally giving the merchandising team direct query access without IT in the middle.",
    images: [
      "/images/feed/retail-lakehouse-1.jpg",
      "/images/feed/retail-lakehouse-2.jpg",
    ],
    tags: ["Retail", "Cloud Modernization"],
    likeCount: 38,
    commentCount: 5,
  },
  {
    id: "post-004",
    author: {
      name: "Sangeeth Thuruthippallil",
      role: "Founder & Managing Partner",
      initials: "ST",
    },
    postedAt: "2026-05-05T11:45:00Z",
    body:
      "Quick reflection from a utilities client engagement this month: every enterprise I've worked with underestimates how much value sits in metadata. Not the data itself — the metadata. Lineage, ownership, freshness, sensitivity. The clients that win in the next decade will treat metadata as a first-class product, not a compliance afterthought.",
    tags: ["Utilities", "Data Governance"],
    likeCount: 54,
    commentCount: 11,
  },
]
