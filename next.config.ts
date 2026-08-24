import type { NextConfig } from 'next';

import { env } from '@/env';

const isDev = env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [new URL(`${env.NEXT_PUBLIC_BASE_URL}/**`)],
    dangerouslyAllowLocalIP: isDev,
  },
};

export default nextConfig;
