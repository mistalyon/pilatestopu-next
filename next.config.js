/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
          remotePatterns: [
            {
                      protocol: 'https',
                      hostname: 'pilatestopu.com',
            },
            {
                      protocol: 'https',
                      hostname: 'www.pilatestopu.com',
            },
            {
                      protocol: 'https',
                      hostname: '*.supabase.co',
            },
                ],
    },
    async redirects() {
          return [];
    },
};

module.exports = nextConfig;
