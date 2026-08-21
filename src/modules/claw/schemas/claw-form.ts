import { z } from 'zod';

const paymentMethodsSchema = z.enum(['beezie-wallet', 'external-wallet', 'card']);
export type PaymentMethods = z.infer<typeof paymentMethodsSchema>;

const reviewAndPayStepTabs = z.enum(['wallet', 'card']);

interface CreateClawFormProps {
  quantityStep: {
    maxQuantity: number;
  };
}

export function createClawFormSchema({ quantityStep }: CreateClawFormProps) {
  if (quantityStep.maxQuantity < 1) {
    throw new Error('maxQuantity must be greater than 0');
  }

  return z.object({
    quantityStep: z.object({
      quantity: z.number().min(1).max(quantityStep.maxQuantity),
      promotionCode: z.string().or(z.literal('')),
    }),
    reviewAndPayStep: z.discriminatedUnion('tab', [
      z.object({
        tab: reviewAndPayStepTabs.extract(['wallet']),
        paymentMethod: paymentMethodsSchema.extract(['beezie-wallet', 'external-wallet']),
      }),
      z.object({
        tab: reviewAndPayStepTabs.extract(['card']),
        paymentMethod: paymentMethodsSchema.extract(['card']),
      }),
    ]),
  });
}

export type ClawForm = z.infer<ReturnType<typeof createClawFormSchema>>;
