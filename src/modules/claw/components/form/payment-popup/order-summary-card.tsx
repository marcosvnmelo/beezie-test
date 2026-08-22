import type { Claw } from '@/modules/claw/schemas/claws.schema';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/helpers/format-currency';

interface OrderSummaryCardProps {
  claw: Claw;
  quantity: number;
}

export function OrderSummaryCard(props: OrderSummaryCardProps) {
  const rows: OrderSummaryRowItem[] = [
    {
      type: 'item',
      label: props.claw.name,
      value: formatCurrency(props.claw.values.price),
    },
    {
      type: 'item',
      label: 'Quantity',
      value: props.quantity,
    },
    {
      type: 'separator',
    },
    {
      type: 'total',
      value: formatCurrency(props.claw.values.price * props.quantity),
    },
    {
      type: 'points',
      value: `+${props.claw.values.points * props.quantity} points`,
    },
  ];

  return (
    <div>
      <Label className="mb-4 leading-5 font-semibold text-muted-foreground">
        Order Summary
      </Label>

      <Card className="bg-card-gradient px-4! py-6! [--card-spacing:--spacing(3)]">
        {rows.map((row, index) => (
          <OrderSummaryRow key={index} item={row} />
        ))}
      </Card>
    </div>
  );
}

type OrderSummaryRowItem =
  | {
      type: 'item';
      label: React.ReactNode;
      value: React.ReactNode;
    }
  | {
      type: 'separator';
    }
  | {
      type: 'total';
      value: React.ReactNode;
    }
  | {
      type: 'points';
      value: React.ReactNode;
    };

const rowClassNames = 'flex items-center justify-between gap-2';
const valueClassNames = 'text-sm leading-4 font-semibold text-foreground';

interface OrderSummaryRowProps {
  item: OrderSummaryRowItem;
}

function OrderSummaryRow(props: OrderSummaryRowProps) {
  if (props.item.type === 'item') {
    return (
      <div className={rowClassNames}>
        <p className="text-sm leading-3 font-medium text-muted-foreground">
          {props.item.label}
        </p>
        <p className={valueClassNames}>{props.item.value}</p>
      </div>
    );
  }

  if (props.item.type === 'separator') {
    return <Separator className="my-2" />;
  }

  if (props.item.type === 'total') {
    return (
      <div className={rowClassNames}>
        <p className={valueClassNames}>Total</p>
        <p className="text-sm leading-4 font-semibold text-foreground">
          {props.item.value}
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-end">
      <p className="text-xs leading-3 font-medium text-primary">
        {props.item.value}
      </p>
    </div>
  );
}
