/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["m.secondmorning.co.kr", "saayznmhcfprtrehndli.supabase.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
};

export default nextConfig;
