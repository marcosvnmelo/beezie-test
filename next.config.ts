import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: isDev ? [new URL('http://localhost:3000/**')] : [],
    dangerouslyAllowLocalIP: isDev,
  },
};

export default nextConfig;
