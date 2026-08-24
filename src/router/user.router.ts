import { os } from '@orpc/server';

const me = os.handler(async () => {
  const userData = {
    balance: 190,
    image: 'http://localhost:3000/mock/avatar.jpg',
  };

  return userData;
});

export const userRouter = {
  me,
};
