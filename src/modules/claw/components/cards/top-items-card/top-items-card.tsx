import Image from 'next/image';

import type { Item } from '@/modules/claw/schemas/item';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/helpers/format-currency';
import { cn } from '@/lib/utils';
import { oddColorMap } from '@/modules/claw/constants/odds';
import { generateItems } from '@/modules/claw/helpers/generate-items';

const mockData: Item[] = generateItems({
  amount: 40,
  nameGenerator: ({ randomYear, randomNumber, randomCondition }) => {
    return `${randomYear} Legendary Collection Mewtwo #${randomNumber} CGC ${randomCondition}`;
  },
  imageUrl: 'http://localhost:3000/mock/top-item.webp',
});

export function TopItemsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-2xl leading-8 font-semibold">
          Top Items
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2 md:grid-cols-3">
        {mockData.map((item) => (
          <TopItemCard key={item.id} item={item} />
        ))}
      </CardContent>
    </Card>
  );
}

interface TopItemCardProps {
  item: Item;
}

function TopItemCard({ item }: TopItemCardProps) {
  const formattedFMV = formatCurrency(item.fmv);

  return (
    <div className="flex flex-col p-1">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg">
        <Image
          src={item.image}
          alt=""
          width="75"
          height="75"
          aria-hidden="true"
          className="absolute h-full w-auto scale-125 object-cover opacity-75 blur-2xl"
        />
        <Image
          src={item.image}
          alt={item.name}
          width="175"
          height="175"
          className="relative object-contain"
        />
      </div>
      <div className="px-2 py-1.5">
        <p className="line-clamp-2 text-xs leading-3 font-medium">
          {item.name}
        </p>

        <Separator className="my-2" />

        <p className="text-xs font-medium text-muted-foreground">
          ~FMV{' '}
          <span className={cn(oddColorMap[item.oddType], 'text-(--color-odd)')}>
            {formattedFMV}
          </span>
        </p>
      </div>
    </div>
  );
}
