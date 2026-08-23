import { useState } from 'react';
import { createFormHook } from '@tanstack/react-form-nextjs';

import type { ClawForm } from '@/modules/claw/schemas/claw-form.schema';
import validatePromoCodeAction from '@/modules/claw/actions/validate-promo-code';
import { QuantityField } from '@/modules/claw/components/form/fields/quantity-field';
import { TextField } from '@/modules/claw/components/form/fields/text-field';
import { clawFormOpts } from '@/modules/claw/constants/claw-form-options';
import { fieldContext, formContext } from '@/modules/claw/contexts/claw-form-context';
import { ClawFormSubmitAction } from '@/modules/claw/schemas/claw-form.schema';

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

export function useClawForm() {
  const [step, setStep] = useState<keyof ClawForm>('quantityStep');

  const form = useAppForm({
    ...clawFormOpts,
    onSubmit: async ({ value, meta, formApi }) => {
      switch (meta.submitAction) {
        case ClawFormSubmitAction.ApplyPromoCode: {
          const promotionCode = value.quantityStep.promotionCode;

          const result = await validatePromoCodeAction(promotionCode);

          if (!result.valid) {
            // TODO: Add toast
            console.log('result', result);
          }

          formApi.setFieldValue('quantityStep.isPromotionCodeApplied', result.valid);
          break;
        }
        case ClawFormSubmitAction.ClearPromotionCode: {
          formApi.setFieldValue('quantityStep.promotionCode', '');
          formApi.setFieldValue('quantityStep.isPromotionCodeApplied', false);
          break;
        }
        case ClawFormSubmitAction.OpenPaymentReview: {
          setStep('reviewAndPayStep');
          break;
        }
        case ClawFormSubmitAction.ClosePaymentReview: {
          setStep('quantityStep');
          break;
        }
        case null: {
          console.log('submit payment', value);
          break;
        }
        default: {
          throw new Error(`Unknown submit action: ${meta.submitAction satisfies never}`);
        }
      }
    },
  });

  return {
    form,
    step,
  };
}
