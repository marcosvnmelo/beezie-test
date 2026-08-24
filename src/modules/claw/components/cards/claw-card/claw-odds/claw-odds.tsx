import type { OddsData } from '@/modules/claw/schemas/odds.schema';
import { formatCurrency } from '@/helpers/format-currency';

import { AverageHelpDialog } from './help-dialogs/average-help-dialog';
import { OddsHelpDialog } from './help-dialogs/odds-help-dialog';
import { OddCards } from './odd-cards';

interface ClawOddsProps {
  oddsData: OddsData;
}

export function ClawOdds(props: ClawOddsProps) {
  const formattedAverage = formatCurrency(props.oddsData.averageValue);

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

      <OddCards oddsData={props.oddsData} />
    </div>
  );
}
