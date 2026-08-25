import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import type { Claw } from '../../../schemas/claws.schema';
import { ClawForm } from '../../form/claw-form';
import { ClawOdds } from './claw-odds/claw-odds';
import { CrateCards } from './crate-cards';
import { ClawCardErrorBoundary } from './error-boundary';
import { PriceAndPoints } from './price-and-points';

interface ClawCardProps {
  claw: Claw;
}

export function ClawCard(props: ClawCardProps) {
  return (
    <ClawCardErrorBoundary>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold md:text-2xl">
            {props.claw.name}
          </CardTitle>
          <CardDescription className="hidden md:block">
            {
              "Open instantly to reveal your collectible and decide whether to hold or SWAP. Each box contains a graded or authenticated item from slabs to sealed products, securely stored in our Brink's vault."
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PriceAndPoints claw={props.claw} />

          <ClawForm claw={props.claw} />

          <Separator />

          <ClawOdds oddsData={props.claw.oddsData} />

          <Separator />

          <CrateCards claw={props.claw} />
        </CardContent>
      </Card>
    </ClawCardErrorBoundary>
  );
}
