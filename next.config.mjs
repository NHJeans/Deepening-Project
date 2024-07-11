/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'm.secondmorning.co.kr',
      'saayznmhcfprtrehndli.supabase.co',
      'k.kakaocdn.net'
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.secondmorning.co.kr",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "saayznmhcfprtrehndli.supabase.co",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "k.kakaocdn.net",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;