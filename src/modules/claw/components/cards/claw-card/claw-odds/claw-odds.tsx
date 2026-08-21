import type { Odd } from '@/modules/claw/schemas/odds';
import { formatBalance } from '@/helpers/format-balance';
import { cn } from '@/lib/utils';
import { odds } from '@/modules/claw/constants/odds';

import { AverageHelpDialog } from './average-help-dialog';
import { OddsHelpDialog } from './odds-help-dialog';

export function ClawOdds() {
  // TODO: Get average value from server
  const formattedAverage = formatBalance(505);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-1">
            <span className="text-base leading-4 font-semibold text-foreground">
              Odds
            </span>

            <OddsHelpDialog />
          </div>
          <p className="text-xs font-medium text-muted-foreground">
            Updates every few seconds.
          </p>
        </div>

        <div className="flex items-center gap-1 md:items-center">
          <span className="text-xs text-muted-foreground">Average Value:</span>
          <span className="text-end font-semibold text-emerald-400 md:text-lg">
            {formattedAverage}
          </span>
          <AverageHelpDialog />
        </div>
      </div>

      <OddCards />
    </div>
  );
}

function OddCards() {
  return (
    <div className="grid grid-cols-2 gap-1 sm:grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] md:gap-2">
      {odds.map((odd) => (
        <OddCard key={odd.type} odd={odd} />
      ))}
    </div>
  );
}

interface OddCardProps {
  odd: Odd;
}

function OddCard(props: OddCardProps) {
  // TODO: Get odd data from API
  return (
    <div
      className={cn(
        props.odd.colorClassName,
        'inline-flex flex-col items-start justify-start gap-2 self-stretch rounded-md border-l border-(--color-odd) bg-linear-to-r from-(--color-odd)/10 to-black/0 px-2 py-3',
      )}
    >
      <div className="inline-flex items-start justify-between self-stretch text-(--color-odd)">
        <div className="justify-center text-sm leading-2.5 font-semibold">
          {props.odd.name}
        </div>
        <div className="text-base-chart-4 justify-center text-right text-xs leading-2.5 font-semibold">
          0.19%
        </div>
      </div>
      <div className="text-base-secondary-foreground justify-center text-xs leading-2.5 font-medium">
        $5001 - $8000
      </div>
    </div>
  );
}
