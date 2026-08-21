import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { clawFormOpts } from '@/modules/claw/constants/claw-form-options';
import { withClawFieldGroup } from '@/modules/claw/hooks/use-claw-form';

export const PromotionCodeSection = withClawFieldGroup({
  defaultValues: clawFormOpts.defaultValues.quantityStep,
  render: function Render({ group }) {
    // TODO: Validate code on server side
    return (
      <Accordion>
        <AccordionItem>
          <AccordionTrigger>Apply promo code</AccordionTrigger>
          <AccordionContent>
            <group.Field name="promotionCode">
              {(field) => {
                const isApplyButtonDisabled = field.state.value.length === 0;

                return (
                  <Field orientation="horizontal">
                    <Input
                      placeholder="Enter Code"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant={isApplyButtonDisabled ? 'secondary' : 'default'}
                      disabled={isApplyButtonDisabled}
                    >
                      Apply
                    </Button>
                  </Field>
                );
              }}
            </group.Field>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  },
});
