/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Use this app directory as Turbopack root (avoids "multiple lockfiles" warning when repo has root + studiomain-app)
  turbopack: {
    root: process.cwd(),
  },
}

export default nextConfig
