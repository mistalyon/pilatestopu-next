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
    async redirects() {
        return [
            // City redirects (old /{city}-pilates -> /p-c/{city})
            {
                source: '/p-c/istanbul-pilates',
                destination: '/p-c/istanbul',
                permanent: true,
            },
            {
                source: '/malatya-pilates',
                destination: '/p-c/malatya',
                permanent: true,
            },
            {
                source: '/bursa-pilates',
                destination: '/p-c/bursa',
                permanent: true,
            },
            // Neighborhood redirects (old /{neighborhood}-pilates -> /p-c/{city}/{neighborhood})
            {
                source: '/kadikoy-pilates',
                destination: '/p-c/istanbul/kadikoy',
                permanent: true,
            },
            {
                source: '/gorukle-pilates',
                destination: '/p-c/bursa/gorukle',
                permanent: true,
            },
            {
                source: '/nilufer-pilates',
                destination: '/p-c/bursa/nilufer',
                permanent: true,
            },
            {
                source: '/mudanya-pilates',
                destination: '/p-c/bursa/mudanya',
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
