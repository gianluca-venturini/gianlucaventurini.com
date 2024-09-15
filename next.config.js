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
    async redirects() {
        return [
          {
            source: '/blog/:path*',
            destination: '/posts/:path*',
            permanent: true
          },
        ]
    },    
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig);
