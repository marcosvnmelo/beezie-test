import type { Claw } from '@/modules/claw/schemas/claws.schema';
import { formatCurrency } from '@/helpers/format-currency';

interface PriceAndPointsProps {
  claw: Claw;
}

export function PriceAndPoints(props: Pick<PriceAndPointsProps, 'claw'>) {
  const formattedPrice = formatCurrency(props.claw.values.price);

  return (
    <p className="text-xl font-semibold md:text-2xl">
      {formattedPrice}
      <span className="ms-2 align-middle text-xs text-primary md:ms-1.5 md:text-sm md:leading-normal">
        +{props.claw.values.points} points
      </span>
    </p>
  );
}
