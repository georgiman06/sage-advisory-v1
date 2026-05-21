/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  env: {
    // Server-side only: internal ALB DNS for SSR fetches (stays within VPC)
    INTERNAL_API_URL: process.env.INTERNAL_API_URL ?? "http://localhost:8001",
  },
}

export default nextConfig
