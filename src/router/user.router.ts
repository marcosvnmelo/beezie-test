import { os } from '@orpc/server';

import { authMiddleware } from './middlewares';

const me = os.use(authMiddleware).handler(async () => {
  const userData = {
    balance: 190,
    image: '/mock/avatar.jpg',
  };

  return userData;
});

export const userRouter = {
  me,
};
