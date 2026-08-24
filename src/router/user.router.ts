import { os } from '@orpc/server';

import { env } from '@/env';

const me = os.handler(async () => {
  const userData = {
    balance: 190,
    image: `${env.NEXT_PUBLIC_BASE_URL}/mock/avatar.jpg`,
  };

  return userData;
});

export const userRouter = {
  me,
};
