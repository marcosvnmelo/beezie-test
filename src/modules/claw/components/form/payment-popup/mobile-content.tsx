import { Button } from '@/components/ui/button';
import { clawFormOpts } from '@/modules/claw/constants/claw-form-options';
import { withClawForm } from '@/modules/claw/hooks/use-claw-form';
import { ClawFormSubmitAction } from '@/modules/claw/schemas/claw-form.schema';

export const MobileContent = withClawForm({
  ...clawFormOpts,
  render: function Render({ form }) {
    return (
      <form
        className="grid items-start gap-6 p-6"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Button
          type="submit"
          size="lg"
          className="h-12"
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
