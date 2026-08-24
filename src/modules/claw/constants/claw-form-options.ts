import { formOptions } from '@tanstack/react-form-nextjs';

import type {
  ClawForm,
  ClawFormInput,
  ClawFormSubmitAction,
} from '../schemas/claw-form.schema';
import { PaymentMethodType } from '../schemas/payment-method.schema.ts';

interface FormMeta {
  submitAction: ClawFormSubmitAction | null;
}

const defaultMeta: FormMeta = {
  submitAction: null,
};

export const clawFormOpts = formOptions({
  defaultValues: {
    quantityStep: {
      quantity: 1,
      promotionCode: '',
      isPromotionCodeApplied: false,
    },
    reviewAndPayStep: {
      paymentMethod: PaymentMethodType.BeezieWallet,
    },
  } satisfies ClawForm as ClawFormInput,
  onSubmitMeta: defaultMeta,
});
