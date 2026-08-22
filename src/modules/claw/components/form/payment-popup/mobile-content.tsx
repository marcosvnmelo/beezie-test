import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { clawFormOpts } from '@/modules/claw/constants/claw-form-options';
import { claws } from '@/modules/claw/constants/claws';
import { withClawForm } from '@/modules/claw/hooks/use-claw-form';
import {
  ClawFormSubmitAction,
  ReviewAndPayStepTabs,
} from '@/modules/claw/schemas/claw-form.schema';

import { OrderSummaryCard } from './order-summary-card';

export const MobileContent = withClawForm({
  ...clawFormOpts,
  render: function Render({ form }) {
    // TODO: Get claw from query params
    const claw = claws[0]!;

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

          <TabsContent value={ReviewAndPayStepTabs.Wallet}></TabsContent>
          <TabsContent value={ReviewAndPayStepTabs.Card}></TabsContent>
        </Tabs>

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
