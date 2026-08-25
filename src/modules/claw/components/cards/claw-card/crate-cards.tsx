import Image from 'next/image';
import Link from 'next/link';

import type { Claw } from '@/modules/claw/schemas/claws.schema';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/helpers/format-currency';
import { claws } from '@/modules/claw/constants/claws';

interface CrateCardsProps {
  claw: Claw;
}

export function CrateCards(props: CrateCardsProps) {
  return (
    <div className="flex w-full flex-col gap-3 md:gap-2">
      <h2 className="text-sm font-medium md:text-base">More Claw Machines:</h2>
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        {claws
          .filter((c) => c.id !== props.claw.id)
          .map((claw) => (
            <CrateCard key={claw.id} claw={claw} />
          ))}
      </div>
    </div>
  );
}

function CrateCard(props: Pick<CrateCardsProps, 'claw'>) {
  const formattedPrice = formatCurrency(props.claw.values.price);
  return (
    <Button
      variant="link"
      className="block size-auto border border-muted-foreground/25 bg-secondary py-4 text-center hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]"
      nativeButton={false}
      render={<Link href={`/claw/${props.claw.id}`} />}
    >
      <Image
        src={props.claw.medias.boxIcon.url}
        alt={`${props.claw.name} crate`}
        width={40}
        height={32}
        className="mx-auto mb-2 shrink-0"
      />
      <p className="mb-1 text-sm font-semibold text-foreground md:text-base">
        {formattedPrice}
      </p>
      <p className="text-xs font-medium text-muted-foreground md:text-sm">
        {props.claw.name}
      </p>
    </Button>
  );
}
