/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "seo-heist.s3.amazonaws.com",
        port: "",
        pathname: "/user_**/**",
      },
    ],
    domains: ["images.unsplash.com"],
  },
  experimental: {
    mdxRs: true,
  },
};

module.exports = nextConfig;
