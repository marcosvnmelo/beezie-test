import { os } from '@orpc/server';

import { clawRouter } from './claw.router';
import { delayMiddleware } from './middlewares';
import { paymentRouter } from './payment.router';
import { userRouter } from './user.router';

export const router = os.use(delayMiddleware).router({
  claw: clawRouter,
  payment: paymentRouter,
  user: userRouter,
});
