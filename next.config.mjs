/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverExternalPackages: ['@supabase/ssr']
  },
  images: {
    domains: ['localhost'],
  },
}

export default nextConfig 