import { z } from 'zod';

import { paymentMethodTypeSchema } from './payment-method.schema';

export const ReviewAndPayStepTabs = {
  Wallet: 'Wallet',
  Card: 'Card',
} as const;
export type ReviewAndPayStepTabs = keyof typeof ReviewAndPayStepTabs;

export const ClawFormStep = {
  Quantity: 'Quantity',
  ReviewAndPay: 'ReviewAndPay',
  PendingConfirmation: 'PendingConfirmation',
  RevealAnimation: 'RevealAnimation',
  Swap: 'Swap',
} as const;
export type ClawFormStep = keyof typeof ClawFormStep;

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

export type ClawFormInput = z.input<ReturnType<typeof createClawFormSchema>>;
export type ClawForm = z.output<ReturnType<typeof createClawFormSchema>>;

export const ClawFormSubmitAction = {
  ApplyPromoCode: 'ApplyPromoCode',
  ClearPromotionCode: 'ClearPromotionCode',
  OpenPaymentReview: 'OpenPaymentReview',
  ClosePaymentReview: 'ClosePaymentReview',
  ConfirmPayment: 'ConfirmPayment',
  CompleteRevealAnimation: 'CompleteRevealAnimation',
} as const;
export type ClawFormSubmitAction = keyof typeof ClawFormSubmitAction;
