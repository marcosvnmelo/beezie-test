import type { PaymentMethod } from '../schemas/payment-method.schema';
import { PaymentMethodType } from '../schemas/payment-method.schema';

const createPaymentMethods = <T extends PaymentMethod[]>(
  arr: T & (PaymentMethodType extends T[number]['type'] ? T : never),
) => arr;

export const paymentMethods = createPaymentMethods([
  {
    type: PaymentMethodType.BeezieWallet,
    name: 'Beezie wallet',
    balance: 2500,
  },
  {
    type: PaymentMethodType.ExternalWallet,
    name: 'External wallet',
    balance: 50,
  },
  {
    type: PaymentMethodType.Card,
    name: 'Credit / Debit',
  },
]) as PaymentMethod[];
