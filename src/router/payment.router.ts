import { os } from '@orpc/server';

import { paymentMethods } from '@/modules/claw/constants/payment-method';

const list = os.handler(async () => {
  return paymentMethods;
});

export const paymentRouter = {
  list,
};
