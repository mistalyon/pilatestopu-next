/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.pilatestopu.com",
      },
      {
        protocol: "https",
        hostname: "pilatestopu.com",
      },
      {
        protocol: "https",
        hostname: "cwcmgdfsozipuoiidmdf.supabase.co",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
