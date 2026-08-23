import { z } from 'zod';

import { paymentMethodTypeSchema } from './payment-method.schema';

export const ReviewAndPayStepTabs = {
  Wallet: 'Wallet',
  Card: 'Card',
} as const;
export type ReviewAndPayStepTabs = keyof typeof ReviewAndPayStepTabs;

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
      isPromotionCodeApplied: z.boolean().default(false),
    }),
    reviewAndPayStep: z.object({
      paymentMethod: paymentMethodTypeSchema,
    }),
  });
}

export type ClawForm = z.infer<ReturnType<typeof createClawFormSchema>>;

export const ClawFormSubmitAction = {
  ApplyPromoCode: 'ApplyPromoCode',
  ClearPromotionCode: 'ClearPromotionCode',
  OpenPaymentReview: 'OpenPaymentReview',
  ClosePaymentReview: 'ClosePaymentReview',
} as const;
export type ClawFormSubmitAction = keyof typeof ClawFormSubmitAction;
