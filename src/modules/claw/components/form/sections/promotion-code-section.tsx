import { useSelector } from '@tanstack/react-form-nextjs';
import { LoaderCircleIcon } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { clawFormOpts } from '@/modules/claw/constants/claw-form-options';
import { withClawForm } from '@/modules/claw/hooks/use-claw-form';
import { ClawFormSubmitAction } from '@/modules/claw/schemas/claw-form';

export const PromotionCodeSection = withClawForm({
  ...clawFormOpts,
  render: function Render({ form }) {
    const isSubmitting = useSelector(form.store, (s) => s.isSubmitting);
    const isInputEmpty = useSelector(
      form.store,
      (s) => s.values.quantityStep.promotionCode.length === 0,
    );
    const isPromotionCodeApplied = useSelector(
      form.store,
      (s) => s.values.quantityStep.isPromotionCodeApplied,
    );

    return (
      <Accordion>
        <AccordionItem>
          <AccordionTrigger>Apply promo code</AccordionTrigger>
          <AccordionContent>
            <form.AppField
              name="quantityStep.promotionCode"
              validators={{
                onChangeListenTo: ['quantityStep.isPromotionCodeApplied'],
              }}
            >
              {(field) => (
                <field.TextField
                  placeholder="Enter Code"
                  disabled={isPromotionCodeApplied}
                  fieldOrientation="horizontal"
                  fieldContent={
                    <Button
                      type="submit"
                      onClick={() =>
                        form.handleSubmit({
                          submitAction: isPromotionCodeApplied
                            ? ClawFormSubmitAction.ClearPromotionCode
                            : ClawFormSubmitAction.ApplyPromoCode,
                        })
                      }
                      variant={isInputEmpty ? 'secondary' : 'default'}
                      disabled={isInputEmpty || isSubmitting}
                    >
                      {isSubmitting && (
                        <LoaderCircleIcon className="size-4 animate-spin" />
                      )}
                      {isPromotionCodeApplied ? 'Clear' : 'Apply'}
                    </Button>
                  }
                />
              )}
            </form.AppField>
            {isPromotionCodeApplied && (
              <span className="text-xs font-normal text-green-500">
                🎉 Code applied!
              </span>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  },
});
