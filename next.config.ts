import type { NextConfig } from 'next';

import { env } from '@/env';

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [new URL(`${env.NEXT_PUBLIC_BASE_URL}/**`)],
    dangerouslyAllowLocalIP: env.NEXT_PUBLIC_BASE_URL.includes('localhost'),
  },
};

export default nextConfig;
