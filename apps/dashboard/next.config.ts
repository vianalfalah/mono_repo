import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
}

export default nextConfig

// Force port in development
if (process.env.NODE_ENV === 'development') {
  process.env.PORT = '3001'
}
