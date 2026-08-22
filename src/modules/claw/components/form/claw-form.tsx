'use client';

import type { Claw } from '@/modules/claw/schemas/claws.schema';
import { useClawForm } from '@/modules/claw/hooks/use-claw-form';

import { PaymentPopup } from './payment-popup/payment-popup';
import { PromotionCodeSection } from './sections/promotion-code-section';
import { QuantitySection } from './sections/quantity-section';

interface ClawFormProps {
  claw: Claw;
}

export function ClawForm(props: ClawFormProps) {
  const { form, step } = useClawForm();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <form.AppForm>
        <QuantitySection
          form={form}
          maxQuantity={props.claw.validations.maxQuantity}
        />

        <PromotionCodeSection form={form} />

        <PaymentPopup form={form} step={step} />
      </form.AppForm>
    </form>
  );
}
