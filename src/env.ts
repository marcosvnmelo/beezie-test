import { createEnv } from '@t3-oss/env-nextjs';
import { vercel } from '@t3-oss/env-nextjs/presets-zod';
import { z } from 'zod';

export const env = createEnv({
  extends: [vercel()],
  shared: {
    NODE_ENV: z.enum(['development', 'production']).default('development'),
    NEXT_PUBLIC_BASE_URL: z.url().default('http://localhost:3000'),
  },
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_BASE_URL: process.env['VERCEL_URL'],
  },
});
