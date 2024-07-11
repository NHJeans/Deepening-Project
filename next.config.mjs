/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
      }
    ],
  },
};

export default nextConfig;
