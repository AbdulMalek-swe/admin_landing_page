/** @type {import('next').NextConfig} */
const nextConfig = {
      images: {
        domains: ['127.0.0.1','test.zan.com.bd'],
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
