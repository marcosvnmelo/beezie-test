import { Button } from '@/components/ui/button';
import { clawFormOpts } from '@/modules/claw/constants/claw-form-options';
import { withClawFieldGroup } from '@/modules/claw/hooks/use-claw-form';

export const QuantitySection = withClawFieldGroup({
  defaultValues: clawFormOpts.defaultValues.quantityStep,
  props: {
    maxQuantity: 0,
  },
  render: function Render({ group, maxQuantity }) {
    // TODO: Trigger next step
    return (
      <div className="fixed inset-x-0 bottom-0 flex gap-4 bg-black/70 p-4 supports-backdrop-filter:bg-black/10 supports-backdrop-filter:backdrop-blur-sm md:static md:p-0">
        <group.AppField name="quantity">
          {(field) => (
            <field.QuantityField fieldClassName="w-auto" max={maxQuantity} />
          )}
        </group.AppField>

        <Button type="button" className="h-12 flex-1 rounded-lg font-semibold">
          Start Now
        </Button>
      </div>
    );
  },
});
