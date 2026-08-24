import { useState } from 'react';
import { createFormHook } from '@tanstack/react-form-nextjs';

import { toast } from '@/components/ui/toast';
import { artificialDelay } from '@/helpers/artificial-delay';
import { formatCurrency } from '@/helpers/format-currency';
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

import { fireConfetti } from '../helpers/fire-confetti';
import { generateItems } from '../helpers/generate-items';
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

  const clawFormSchema = createClawFormSchema({
    quantityStep: { maxQuantity: claw.validations.maxQuantity },
  });

  const form = useAppForm({
    ...clawFormOpts,
    validators: {
      onSubmit: clawFormSchema,
    },
    onSubmit: async ({ value, meta, formApi }) => {
      function resetForm() {
        setStep(ClawFormStep.Quantity);
        formApi.reset();
      }

      switch (meta.submitAction) {
        case ClawFormSubmitAction.ApplyPromoCode: {
          const promotionCode = value.quantityStep.promotionCode;

          const result = await validatePromoCodeAction(promotionCode);

          if (!result.valid) {
            toast.add({
              title: 'Invalid Promotion Code',
              description: result.message,
              type: 'error',
            });
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
            toast.add({
              title: 'Payment Failed',
              description: result.message,
              type: 'error',
            });

            setStep(ClawFormStep.ReviewAndPay);
            break;
          }

          setStep(ClawFormStep.RevealAnimation);

          break;
        }
        case ClawFormSubmitAction.CompleteRevealAnimation: {
          const generatedItems = generateItems({
            amount: value.quantityStep.quantity,
            nameGenerator(values) {
              return `${values.randomYear} Japanese Promo Poncho Wear Pikachu #${values.randomNumber} PSA ${values.randomCondition}`;
            },
            imageUrl: '/mock/swap.jpg',
          });
          formApi.setFieldValue(
            'swapStep.items',
            clawFormSchema.shape.swapStep.shape.items.parse(generatedItems),
          );

          setStep(ClawFormStep.Swap);
          await fireConfetti();
          break;
        }
        case ClawFormSubmitAction.KeepItems: {
          resetForm();
          break;
        }
        case null: {
          const items = value.swapStep.items;

          const selectedItems =
            items.length === 1 ? [items[0]!] : items.filter((i) => i.selected);

          const totalValue = selectedItems.reduce((acc, item) => acc + item.fmv, 0);

          await artificialDelay(2000, 4000);

          toast.add({
            title: 'Swap success',
            description: `${formatCurrency(totalValue)} will be credited to your wallet shortly.`,
            type: 'success',
          });

          resetForm();
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
