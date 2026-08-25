import { os } from '@orpc/server';

import { env } from '@/env';

import { authMiddleware } from './middlewares';

const me = os.use(authMiddleware).handler(async () => {
  const userData = {
    balance: 190,
    image: `${env.NEXT_PUBLIC_BASE_URL}/mock/avatar.jpg`,
  };

  return userData;
});

export const userRouter = {
  me,
};
