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

module.exports = nextConfig
