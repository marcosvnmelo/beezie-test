import { useSuspenseQuery } from '@tanstack/react-query';

import { orpc } from '@/lib/orpc';

import type { PaymentMethod, PaymentMethodType } from '../schemas/payment-method.schema';

type Prettify<T> = { [K in keyof T]: T[K] } & {};

type ExtractAndNarrow<T, K> = T extends { type: infer Type }
  ? K extends Type
    ? Prettify<Omit<T, 'type'>>
    : never
  : never;

type PaymentMethodMap = {
  [K in PaymentMethodType]: ExtractAndNarrow<PaymentMethod, K>;
};

export function usePaymentMethodsSuspenseQuery() {
  const { data } = useSuspenseQuery(
    orpc.payment.list.queryOptions({
      select(data) {
        // type PaymentMethod = (typeof data)[number];

        return Object.values(data).reduce((acc, pm) => {
          // @ts-expect-error complex type assignment
          acc[pm.type] = pm;
          return acc;
        }, {} as PaymentMethodMap);
      },
    }),
  );

  return {
    paymentMethodMap: data as PaymentMethodMap,
  };
}
