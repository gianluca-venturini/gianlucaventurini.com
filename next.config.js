/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["assets.tina.io"],
    },
    async rewrites() {
        return [
            {
                source: '/admin',
                destination: '/admin/index.html',
            },
        ]
    },
};

module.exports = nextConfig
