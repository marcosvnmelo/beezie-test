import { formOptions } from '@tanstack/react-form-nextjs';

import type { ClawForm, ClawFormSubmitAction } from '../schemas/claw-form.schema';
import { PaymentMethods, ReviewAndPayStepTabs } from '../schemas/claw-form.schema';

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
      tab: ReviewAndPayStepTabs.Wallet,
      paymentMethod: PaymentMethods.BeezieWallet,
    },
  } satisfies ClawForm as ClawForm,
  onSubmitMeta: defaultMeta,
});
