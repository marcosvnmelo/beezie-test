'use client';

import { Activity } from 'react';
import dynamic from 'next/dynamic';

import type { Claw } from '@/modules/claw/schemas/claws.schema';
import { useClawForm } from '@/modules/claw/hooks/use-claw-form';

import { ClawFormStep } from '../../schemas/claw-form.schema';
import { PromotionCodeSection } from './sections/promotion-code-section';
import { QuantitySection } from './sections/quantity-section';

const PaymentPopup = dynamic(
  () => import('./payment-popup/payment-popup').then((mod) => mod.PaymentPopup),
  {
    ssr: false,
  },
);
const PendingConfirmationPopup = dynamic(
  () =>
    import('./pending-confirmation-popup/pending-confirmation-popup').then(
      (mod) => mod.PendingConfirmationPopup,
    ),
  {
    ssr: false,
  },
);

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

        <Activity
          mode={step === ClawFormStep.ReviewAndPay ? 'visible' : 'hidden'}
        >
          <PaymentPopup form={form} />
        </Activity>

        <Activity
          mode={
            step === ClawFormStep.PendingConfirmation ? 'visible' : 'hidden'
          }
        >
          <PendingConfirmationPopup form={form} />
        </Activity>
      </form.AppForm>
    </form>
  );
}
