import { z } from 'zod';

export const PaymentMethodType = {
  BeezieWallet: 'BeezieWallet',
  ExternalWallet: 'ExternalWallet',
  Card: 'Card',
} as const;
export const paymentMethodTypeSchema = z.enum(PaymentMethodType);
export type PaymentMethodType = z.infer<typeof paymentMethodTypeSchema>;

export const paymentMethodSchema = z.discriminatedUnion('type', [
  z.object({
    type: paymentMethodTypeSchema.exclude([PaymentMethodType.Card]),
    name: z.string(),
    balance: z.number(),
  }),
  z.object({
    type: paymentMethodTypeSchema.extract([PaymentMethodType.Card]),
    name: z.string(),
  }),
]);

export type PaymentMethod = z.infer<typeof paymentMethodSchema>;
