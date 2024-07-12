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
        hostname: "k.kakaocdn.net", // 여기에 k.kakaocdn.net 호스트네임을 추가합니다.
        pathname: "/dn/**",
      },
    ],
  },
};

export default nextConfig;
