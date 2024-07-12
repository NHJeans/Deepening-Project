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
        protocol: "http",
        hostname: "k.kakaocdn.net",
        pathname: "/dn/**",
      },
    ],
  },
};

export default nextConfig;
