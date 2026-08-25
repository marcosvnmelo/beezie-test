import { Button } from '@/components/ui/button';
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { formatCurrency } from '@/helpers/format-currency';
import { clawFormOpts } from '@/modules/claw/constants/claw-form-options';
import { withClawForm } from '@/modules/claw/hooks/use-claw-form';
import { useClawSuspenseQuery } from '@/modules/claw/hooks/use-claw-suspense-query';
import { usePaymentMethodsSuspenseQuery } from '@/modules/claw/hooks/use-payment-methods-suspense-query';
import { ClawFormSubmitAction } from '@/modules/claw/schemas/claw-form.schema';
import {
  PaymentMethodType,
  paymentMethodTypeSchema,
} from '@/modules/claw/schemas/payment-method.schema';

import { OrderSummaryCard } from './order-summary-card';

export const DesktopContent = withClawForm({
  ...clawFormOpts,
  render: function Render({ form }) {
    const { claw } = useClawSuspenseQuery();

    const { paymentMethodMap } = usePaymentMethodsSuspenseQuery();

    return (
      <form
        className="grid grid-cols-2 items-stretch gap-6"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <form.Field name="reviewAndPayStep.paymentMethod">
          {(field) => (
            <FieldSet>
              <FieldLegend variant="label" className="text-muted-foreground">
                Compute Environment
              </FieldLegend>
              <FieldGroup>
                <RadioGroup
                  name={field.name}
                  value={field.state.value}
                  onValueChange={field.handleChange}
                  className="grid auto-rows-fr"
                >
                  {paymentMethodTypeSchema.options.map((pm) => (
                    <FieldLabel
                      key={pm}
                      htmlFor={`${field.name}-${pm}`}
                      variant="beezie"
                    >
                      <Field orientation="horizontal">
                        <RadioGroupItem
                          value={pm}
                          id={`${field.name}-${pm}`}
                          variant="beezie"
                          className="items-center"
                        />
                        <FieldContent className="flex-row items-center group-last/field-label:flex-col group-last/field-label:items-start">
                          <FieldTitle>{paymentMethodMap[pm].name}</FieldTitle>
                          {pm !== PaymentMethodType.Card ? (
                            <span className="ms-auto">
                              {formatCurrency(paymentMethodMap[pm].balance)}
                            </span>
                          ) : (
                            <p className="col-span-2 text-xs font-medium text-muted-foreground italic">
                              Processing fees may apply
                            </p>
                          )}
                        </FieldContent>
                      </Field>
                    </FieldLabel>
                  ))}
                </RadioGroup>
              </FieldGroup>
            </FieldSet>
          )}
        </form.Field>

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
              submitAction: ClawFormSubmitAction.ConfirmPayment,
            })
          }
        >
          Confirm
        </Button>
      </form>
    );
  },
});
