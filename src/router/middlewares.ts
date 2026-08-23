import { os } from '@orpc/server';

import { artificialDelay } from '@/helpers/artificial-delay';

export const delayMiddleware = os.middleware(async ({ next }) => {
  await artificialDelay();

  return await next();
});
