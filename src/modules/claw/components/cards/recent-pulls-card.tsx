import Image from 'next/image';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatCurrency } from '@/helpers/format-currency';
import { cn } from '@/lib/utils';

import type { Item } from '../../schemas/item.schema';
import { oddColorMap } from '../../constants/odds';
import { generateItems } from '../../helpers/generate-items';

const mockData: Item[] = generateItems({
  amount: 50,
  nameGenerator: ({ randomYear, randomNumber, randomCondition }) => {
    return `${randomYear} Palden Fates Garchomp EX #${randomNumber} PSA ${randomCondition}`;
  },
  imageUrl: '/mock/recent-pull-item.webp',
});

export function RecentPullsCard() {
  return (
    <Card className="[--card-spacing:--spacing(4)] md:[--card-spacing:--spacing(6)]">
      <CardHeader>
        <CardTitle className="text-center text-lg font-semibold md:text-2xl">
          Recent Pulls
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="max-h-150 md:max-h-160">
          <div className="grid gap-2.5">
            {mockData.map((item) => (
              <RecentPullItemCard key={item.id} item={item} />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

interface RecentPullItemCardProps {
  item: Item;
}

function RecentPullItemCard({ item }: RecentPullItemCardProps) {
  const formattedFMV = formatCurrency(item.fmv);

  return (
    <div className="flex items-center gap-1 rounded-lg bg-secondary p-2 md:gap-4 md:p-2.5">
      <div className="relative aspect-square h-16 overflow-hidden rounded-md md:h-full">
        <Image
          src={item.image}
          alt=""
          width="42"
          height="42"
          aria-hidden="true"
          className="absolute h-full w-auto scale-125 object-cover opacity-75 blur-2xl"
        />
        <Image
          src={item.image}
          alt={item.name}
          width="84"
          height="84"
          className="relative object-contain"
        />
      </div>
      <div className="flex flex-1 items-center justify-between gap-6 px-2">
        <div className="space-y-2">
          <div className="text-xs font-medium md:text-base md:font-semibold">
            {item.name}
          </div>
          <div className="text-xs font-normal text-muted-foreground md:text-sm">
            {item.owner.name}
          </div>
        </div>
        <div className="shrink-0 items-end text-right text-xs leading-none font-medium whitespace-nowrap text-muted-foreground md:text-sm">
          ~FMV
          <br />
          <span
            className={cn(
              oddColorMap[item.oddType],
              'text-sm font-semibold text-(--color-odd) md:text-lg',
            )}
          >
            {formattedFMV}
          </span>
        </div>
      </div>
    </div>
  );
}
