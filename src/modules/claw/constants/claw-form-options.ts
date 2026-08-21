import { formOptions } from '@tanstack/react-form-nextjs';

import type { ClawForm } from '../schemas/claw-form';

export const clawFormOpts = formOptions({
  defaultValues: {
    quantityStep: {
      quantity: 1,
      promotionCode: '',
      isPromotionCodeApplied: false,
    },
    reviewAndPayStep: {
      tab: 'wallet',
      paymentMethod: 'beezie-wallet',
    },
  } satisfies ClawForm as ClawForm,
});
