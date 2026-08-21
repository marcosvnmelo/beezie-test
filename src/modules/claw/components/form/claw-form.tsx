'use client';

import type { Claw } from '../../schemas/claws';
import { useClawForm } from '../../hooks/use-claw-form';
import { PromotionCodeSection } from './sections/promotion-code-section';
import { QuantitySection } from './sections/quantity-section';

interface ClawFormProps {
  claw: Claw;
}

export function ClawForm(props: ClawFormProps) {
  const form = useClawForm();

  return (
    <form.AppForm>
      <QuantitySection
        form={form}
        fields="quantityStep"
        maxQuantity={props.claw.validations.maxQuantity}
      />

      <PromotionCodeSection form={form} fields="quantityStep" />
    </form.AppForm>
  );
}
