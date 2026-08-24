import { useState } from 'react';
import { createFormHook } from '@tanstack/react-form-nextjs';

import { client } from '@/lib/orpc';
import validatePromoCodeAction from '@/modules/claw/actions/validate-promo-code';
import { QuantityField } from '@/modules/claw/components/form/fields/quantity-field';
import { TextField } from '@/modules/claw/components/form/fields/text-field';
import { clawFormOpts } from '@/modules/claw/constants/claw-form-options';
import { fieldContext, formContext } from '@/modules/claw/contexts/claw-form-context';
import {
  ClawFormStep,
  ClawFormSubmitAction,
  createClawFormSchema,
} from '@/modules/claw/schemas/claw-form.schema';

import { useClawSuspenseQuery } from './use-claw-suspense-query';

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
  const { claw } = useClawSuspenseQuery();

  const [step, setStep] = useState<ClawFormStep>(ClawFormStep.Quantity);

  const form = useAppForm({
    ...clawFormOpts,
    validators: {
      onSubmit: createClawFormSchema({
        quantityStep: { maxQuantity: claw.validations.maxQuantity },
      }),
    },
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
          setStep(ClawFormStep.ReviewAndPay);
          break;
        }
        case ClawFormSubmitAction.ClosePaymentReview: {
          setStep(ClawFormStep.Quantity);
          break;
        }
        case ClawFormSubmitAction.ConfirmPayment: {
          setStep(ClawFormStep.PendingConfirmation);

          const result = await client.payment.confirmPayment({
            clawId: claw.id,
            quantity: value.quantityStep.quantity,
            promotionCode: value.quantityStep.promotionCode,
            paymentMethod: value.reviewAndPayStep.paymentMethod,
          });

          if (!result.success) {
            // TODO: Add toast
            console.log('result', result);
          }

          setStep(ClawFormStep.RevealAnimation);

          break;
        }
        case ClawFormSubmitAction.CompleteRevealAnimation: {
          setStep(ClawFormStep.Swap);
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
