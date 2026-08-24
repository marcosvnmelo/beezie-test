import { os } from '@orpc/server';
import { z } from 'zod';

import { artificialDelay } from '@/helpers/artificial-delay';
import validatePromoCodeAction from '@/modules/claw/actions/validate-promo-code';
import { paymentMethods } from '@/modules/claw/constants/payment-method';
import { clawSchema } from '@/modules/claw/schemas/claws.schema';
import { paymentMethodTypeSchema } from '@/modules/claw/schemas/payment-method.schema';

const list = os.handler(async () => {
  return paymentMethods;
});

const confirmPayment = os
  .input(
    z.object({
      clawId: clawSchema.shape.id,
      quantity: z.number(),
      promotionCode: z.string().optional(),
      paymentMethod: paymentMethodTypeSchema,
    }),
  )
  .output(
    z
      .object({
        success: z.literal(true),
      })
      .or(
        z.object({
          success: z.literal(false),
          message: z.string(),
        }),
      ),
  )
  .handler(async ({ input }) => {
    if (input.promotionCode) {
      const result = await validatePromoCodeAction(input.promotionCode);
      if (!result.valid) {
        return {
          success: false,
          message: result.message,
        };
      }
    }

    await artificialDelay(5000, 6000);

    return {
      success: true,
    };
  });

export const paymentRouter = {
  list,
  confirmPayment,
};
