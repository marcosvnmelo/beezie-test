import { os } from '@orpc/server';

import { artificialDelay } from '@/helpers/artificial-delay';

export const delayMiddleware = os.middleware(async ({ next }) => {
  await artificialDelay();

  return await next();
});

export const authMiddleware = os.middleware(async ({ next }) => {
  const { headers } = await import('next/headers');

  await artificialDelay(50, 500);

  return await next({ context: { headers: await headers() } });
});
