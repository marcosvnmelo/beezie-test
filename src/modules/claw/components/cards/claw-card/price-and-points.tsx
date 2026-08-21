import type { Claw } from '@/modules/claw/schemas/claws';
import { formatBalance } from '@/helpers/format-balance';

interface PriceAndPointsProps {
  claw: Claw;
}

export function PriceAndPoints(props: Pick<PriceAndPointsProps, 'claw'>) {
  const formattedPrice = formatBalance(props.claw.values.price);

  return (
    <p className="text-xl leading-7 font-semibold md:text-2xl md:leading-8">
      {formattedPrice}
      <span className="text-primary ms-2 align-middle text-xs leading-3 md:ms-1.5 md:text-sm md:leading-normal">
        +{props.claw.values.points} points
      </span>
    </p>
  );
}
