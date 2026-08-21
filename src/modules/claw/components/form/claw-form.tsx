'use client';

import { useSelector } from '@tanstack/react-form-nextjs';

import type { Claw } from '../../schemas/claws';
import { useClawForm } from '../../hooks/use-claw-form';
import { PromotionCodeSection } from './sections/promotion-code-section';
import { QuantitySection } from './sections/quantity-section';

interface ClawFormProps {
  claw: Claw;
}

export function ClawForm(props: ClawFormProps) {
  const form = useClawForm();

  const formErrors = useSelector(form.store, (formState) => formState.errors);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {formErrors.map((error) => (
        <p key={error as string}>{error}</p>
      ))}
      <form.AppForm>
        <QuantitySection
          form={form}
          fields="quantityStep"
          maxQuantity={props.claw.validations.maxQuantity}
        />

        <PromotionCodeSection form={form} />
      </form.AppForm>
    </form>
  );
}
