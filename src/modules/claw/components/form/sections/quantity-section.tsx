import { Button } from '@/components/ui/button';
import { clawFormOpts } from '@/modules/claw/constants/claw-form-options';
import { withClawForm } from '@/modules/claw/hooks/use-claw-form';
import { ClawFormSubmitAction } from '@/modules/claw/schemas/claw-form.schema';

export const QuantitySection = withClawForm({
  ...clawFormOpts,
  props: {
    maxQuantity: 0,
  },
  render: function Render({ form, maxQuantity }) {
    return (
      <div className="fixed inset-x-0 bottom-0 z-10 flex gap-4 bg-black/70 p-4 supports-backdrop-filter:bg-black/10 supports-backdrop-filter:backdrop-blur-sm md:static md:p-0">
        <form.AppField name="quantityStep.quantity">
          {(field) => (
            <field.QuantityField fieldClassName="w-auto" max={maxQuantity} />
          )}
        </form.AppField>

        <Button
          type="submit"
          className="h-12 flex-1 rounded-lg font-semibold"
          onClick={() =>
            form.handleSubmit({
              submitAction: ClawFormSubmitAction.OpenPaymentReview,
            })
          }
        >
          Start Now
        </Button>
      </div>
    );
  },
});
