/** @type {import('next').NextConfig} */
const nextConfig = {
      images: {
        domains: ['127.0.0.1','back.zanvisionlabs.com'],
        unoptimized:true
      },
      output: 'standalone',
      // eslint
      // how to i off estline 
      eslint: {
        ignoreDuringBuilds: true,
      },
};

export default nextConfig;
