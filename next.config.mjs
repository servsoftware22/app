/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  images: {
    domains: ["localhost", "bnijneyvxdnvsrjohjpl.supabase.co"],
  },
};

export default nextConfig;
