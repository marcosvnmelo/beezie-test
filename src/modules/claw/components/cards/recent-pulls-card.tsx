import Image from 'next/image';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatBalance } from '@/helpers/format-balance';
import { cn } from '@/lib/utils';

import type { Item } from '../../schemas/item';
import { oddColorMap } from '../../constants/odds';
import { generateItems } from '../../helpers/generate-items';

const mockData: Item[] = generateItems({
  amount: 50,
  nameGenerator: ({ randomYear, randomNumber, randomCondition }) => {
    return `${randomYear} Palden Fates Garchomp EX #${randomNumber} PSA ${randomCondition}`;
  },
  imageUrl: 'http://localhost:3000/mock/recent-pull-item.webp',
});

export function RecentPullsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-2xl leading-8 font-semibold">
          Recent Pulls
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2.5">
        {mockData.map((item) => (
          <RecentPullItemCard key={item.id} item={item} />
        ))}
      </CardContent>
    </Card>
  );
}

interface RecentPullItemCardProps {
  item: Item;
}

function RecentPullItemCard({ item }: RecentPullItemCardProps) {
  const formattedFMV = formatBalance(item.fmv);

  return (
    <div className="flex items-center gap-4 rounded-lg bg-secondary p-2.5">
      <div className="relative aspect-square h-full overflow-hidden rounded-md">
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
      <div className="flex flex-1 items-start justify-between px-2">
        <div className="space-y-2">
          <div className="text-base leading-6 font-semibold">{item.name}</div>
          <div className="text-sm font-normal text-muted-foreground">
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
