import { os } from '@orpc/server';

import { paymentMethods } from '@/modules/claw/constants/payment-method';

import { delayMiddleware } from './middlewares';

const list = os.use(delayMiddleware).handler(async () => {
  return paymentMethods;
});

export const paymentRouter = {
  list,
};
