import { Button } from '@/components/ui/button';
import { clawFormOpts } from '@/modules/claw/constants/claw-form-options';
import { claws } from '@/modules/claw/constants/claws';
import { withClawForm } from '@/modules/claw/hooks/use-claw-form';
import { ClawFormSubmitAction } from '@/modules/claw/schemas/claw-form.schema';

import { OrderSummaryCard } from './order-summary-card';

export const DesktopContent = withClawForm({
  ...clawFormOpts,
  render: function Render({ form }) {
    // TODO: Get claw from query params
    const claw = claws[0]!;

    return (
      <form
        className="grid grid-cols-2 items-start gap-6"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div></div>

        <form.Subscribe
          selector={(state) => state.values.quantityStep.quantity}
        >
          {(quantity) => <OrderSummaryCard claw={claw} quantity={quantity} />}
        </form.Subscribe>

        <Button
          type="submit"
          size="lg"
          className="col-span-2 mx-auto w-full max-w-90 font-semibold"
          onClick={() =>
            form.handleSubmit({
              submitAction: ClawFormSubmitAction.OpenPaymentReview,
            })
          }
        >
          Confirm
        </Button>
      </form>
    );
  },
});
