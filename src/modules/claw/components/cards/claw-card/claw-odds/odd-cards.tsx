import type {
  Odd,
  OddData,
  OddsData,
} from '@/modules/claw/schemas/odds.schema';
import { formatCurrency } from '@/helpers/format-currency';
import { cn } from '@/lib/utils';
import { odds } from '@/modules/claw/constants/odds';

interface OddCardsProps {
  oddsData: OddsData;
}

export function OddCards(props: OddCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-1 sm:grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] md:gap-2">
      {odds.map((odd) => (
        <OddCard
          key={odd.type}
          odd={odd}
          data={props.oddsData.odds[odd.type]}
        />
      ))}
    </div>
  );
}

interface OddCardProps {
  odd: Odd;
  data: OddData;
}

function OddCard(props: OddCardProps) {
  return (
    <div
      className={cn(
        props.odd.colorClassName,
        'inline-flex flex-col items-start justify-start gap-2 self-stretch rounded-md border-l border-(--color-odd) bg-linear-to-r from-(--color-odd)/10 to-card-secondary/0 p-2 md:py-3',
      )}
    >
      <div className="inline-flex items-start justify-between self-stretch text-(--color-odd)">
        <div className="justify-center text-sm font-medium">
          {props.odd.name}
        </div>
        <div className="text-base-chart-4 justify-center text-right text-xs font-medium">
          {props.data.percent}%
        </div>
      </div>
      <div className="justify-center text-xs font-medium text-muted-foreground">
        {formatOddValue(props.data.value)}
      </div>
    </div>
  );
}

function formatOddValue(value: OddData['value']) {
  if (typeof value === 'number') {
    return formatCurrency(value);
  }

  return `${formatCurrency(value[0])} - ${formatCurrency(value[1])}`;
}
