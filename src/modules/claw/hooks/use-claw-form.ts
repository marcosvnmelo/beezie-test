import { createFormHook } from '@tanstack/react-form-nextjs';

import validatePromoCodeAction from '@/modules/claw/actions/validate-promo-code';
import { QuantityField } from '@/modules/claw/components/form/fields/quantity-field';
import { TextField } from '@/modules/claw/components/form/fields/text-field';
import { clawFormOpts } from '@/modules/claw/constants/claw-form-options';
import { fieldContext, formContext } from '@/modules/claw/contexts/claw-form-context';

import { ClawFormSubmitAction } from '../schemas/claw-form';

export const {
  useAppForm,
  useTypedAppFormContext: useClawFormContext,
  withForm: withClawForm,
  withFieldGroup: withClawFieldGroup,
} = createFormHook({
  fieldComponents: {
    QuantityField,
    TextField,
  },
  formComponents: {},
  fieldContext,
  formContext,
});

interface FormMeta {
  submitAction: ClawFormSubmitAction | null;
}

// Metadata is not required to call form.handleSubmit().
// Specify what values to use as default if no meta is passed
const defaultMeta: FormMeta = {
  submitAction: null,
};

export function useClawForm() {
  return useAppForm({
    ...clawFormOpts,
    onSubmitMeta: defaultMeta,
    onSubmit: async ({ value, meta, formApi }) => {
      if (meta.submitAction === ClawFormSubmitAction.ApplyPromoCode) {
        const promotionCode = value.quantityStep.promotionCode;

        const result = await validatePromoCodeAction(promotionCode);

        if (!result.valid) {
          // TODO: Add toast
          console.log('result', result);
        }

        formApi.setFieldValue('quantityStep.isPromotionCodeApplied', result.valid);
      }

      if (meta.submitAction === ClawFormSubmitAction.ClearPromotionCode) {
        formApi.setFieldValue('quantityStep.promotionCode', '');
        formApi.setFieldValue('quantityStep.isPromotionCodeApplied', false);
      }

      if (meta.submitAction === ClawFormSubmitAction.OpenPaymentReview) {
        console.log('openPaymentReview', value);
      }
    },
  });
}
