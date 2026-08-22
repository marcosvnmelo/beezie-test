import { z } from 'zod';

export const PaymentMethods = {
  BeezieWallet: 'BeezieWallet',
  ExternalWallet: 'ExternalWallet',
  Card: 'Card',
} as const;
const paymentMethodsSchema = z.enum(PaymentMethods);
export type PaymentMethods = z.infer<typeof paymentMethodsSchema>;

export const ReviewAndPayStepTabs = {
  Wallet: 'Wallet',
  Card: 'Card',
} as const;
const reviewAndPayStepTabs = z.enum(ReviewAndPayStepTabs);
export type ReviewAndPayStepTabs = z.infer<typeof reviewAndPayStepTabs>;

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
    reviewAndPayStep: z.discriminatedUnion('tab', [
      z.object({
        tab: reviewAndPayStepTabs.extract([ReviewAndPayStepTabs.Wallet]),
        paymentMethod: paymentMethodsSchema.extract([
          PaymentMethods.BeezieWallet,
          PaymentMethods.ExternalWallet,
        ]),
      }),
      z.object({
        tab: reviewAndPayStepTabs.extract([ReviewAndPayStepTabs.Card]),
        paymentMethod: paymentMethodsSchema.extract([PaymentMethods.Card]),
      }),
    ]),
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
