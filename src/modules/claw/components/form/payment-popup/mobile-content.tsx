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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatCurrency } from '@/helpers/format-currency';
import { clawFormOpts } from '@/modules/claw/constants/claw-form-options';
import { withClawForm } from '@/modules/claw/hooks/use-claw-form';
import { useClawSuspenseQuery } from '@/modules/claw/hooks/use-claw-suspense-query';
import { usePaymentMethodsSuspenseQuery } from '@/modules/claw/hooks/use-payment-methods-suspense-query';
import { ReviewAndPayStepTabs } from '@/modules/claw/schemas/claw-form.schema';
import {
  PaymentMethodType,
  paymentMethodTypeSchema,
} from '@/modules/claw/schemas/payment-method.schema';

import { OrderSummaryCard } from './order-summary-card';

export const MobileContent = withClawForm({
  ...clawFormOpts,
  render: function Render({ form }) {
    const { claw } = useClawSuspenseQuery();

    const { paymentMethodMap } = usePaymentMethodsSuspenseQuery();

    return (
      <form
        className="grid items-start gap-6 p-6"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Tabs
          defaultValue={ReviewAndPayStepTabs.Wallet}
          className="flex-row gap-6"
          onValueChange={(value) => {
            switch (value) {
              case ReviewAndPayStepTabs.Wallet:
                form.setFieldValue(
                  'reviewAndPayStep.paymentMethod',
                  PaymentMethodType.BeezieWallet,
                );
                break;
              case ReviewAndPayStepTabs.Card:
                form.setFieldValue(
                  'reviewAndPayStep.paymentMethod',
                  PaymentMethodType.Card,
                );
                break;
            }
          }}
        >
          <TabsList variant="beezie">
            <TabsTrigger value={ReviewAndPayStepTabs.Wallet} variant="beezie">
              Wallet
            </TabsTrigger>
            <TabsTrigger value={ReviewAndPayStepTabs.Card} variant="beezie">
              Credit / Debit
            </TabsTrigger>
          </TabsList>

          <form.Subscribe
            selector={(state) => state.values.quantityStep.quantity}
          >
            {(quantity) => <OrderSummaryCard claw={claw} quantity={quantity} />}
          </form.Subscribe>

          <TabsContent value={ReviewAndPayStepTabs.Wallet}>
            <FieldGroup>
              <form.Field name="reviewAndPayStep.paymentMethod">
                {(field) => (
                  <FieldSet className="grid grid-rows-subgrid">
                    <FieldLegend variant="label" className="mb-2.5">
                      Choose Wallet
                    </FieldLegend>
                    <RadioGroup
                      name={field.name}
                      value={field.state.value}
                      onValueChange={field.handleChange}
                      className="grid grid-cols-2"
                    >
                      {paymentMethodTypeSchema.options
                        .filter((pm) => pm !== PaymentMethodType.Card)
                        .map((pm) => (
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
                              />
                              <FieldContent>
                                <FieldTitle className="flex-col items-start">
                                  {paymentMethodMap[pm].name}
                                  <span>
                                    {formatCurrency(
                                      paymentMethodMap[pm].balance,
                                    )}
                                  </span>
                                </FieldTitle>
                              </FieldContent>
                            </Field>
                          </FieldLabel>
                        ))}
                    </RadioGroup>
                  </FieldSet>
                )}
              </form.Field>
            </FieldGroup>
          </TabsContent>
          <TabsContent value={ReviewAndPayStepTabs.Card}>
            <div className="flex h-32 w-full items-center justify-center text-sm font-medium text-muted-foreground">
              <span>Coinflow widget</span>
            </div>
          </TabsContent>
        </Tabs>

        <Button
          type="submit"
          size="lg"
          className="h-12"
          onClick={() => form.handleSubmit()}
        >
          Confirm
        </Button>
      </form>
    );
  },
});
