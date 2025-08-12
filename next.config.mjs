/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  images: {
    domains: ["localhost", "bnijneyvxdnvsrjohjpl.supabase.co"],
  },

  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
