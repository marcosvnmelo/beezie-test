'use client';

import { clawFormOpts } from '@/modules/claw/constants/claw-form-options';
import { withClawForm } from '@/modules/claw/hooks/use-claw-form';
import { ClawFormSubmitAction } from '@/modules/claw/schemas/claw-form.schema';

import { ResponsivePopup } from '../shared/responsive-popup';
import { DesktopContent } from './desktop-content';
import { MobileContent } from './mobile-content';

export const PaymentPopup = withClawForm({
  ...clawFormOpts,
  render: function Render({ form }) {
    return (
      <ResponsivePopup
        title="Review & pay"
        titleClassName="text-lg  font-semibold"
        onClose={() =>
          form.handleSubmit({
            submitAction: ClawFormSubmitAction.ClosePaymentReview,
          })
        }
        dialogContentClassName="sm:max-w-188"
        dialogContent={<DesktopContent form={form} />}
        drawerContent={<MobileContent form={form} />}
      />
    );
  },
});
