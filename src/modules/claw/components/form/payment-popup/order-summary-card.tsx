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
  const formattedTotal = formatCurrency(
    props.claw.values.price * props.quantity,
  );
  const totalPoints = props.claw.values.points * props.quantity;

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
      value: formattedTotal,
    },
    {
      type: 'points',
      value: `+${totalPoints} points`,
    },
  ];

  return (
    <div className="grid grid-rows-[auto_1fr] gap-4 md:gap-3">
      <Label className="text-muted-foreground">Order Summary</Label>

      <Card className="bg-card-gradient px-4! py-6! [--card-spacing:--spacing(3)] max-md:hidden">
        {rows.map((row, index) => (
          <OrderSummaryRow key={index} item={row} />
        ))}
      </Card>

      <MobileCard
        item={{
          name: props.claw.name,
          quantity: props.quantity,
        }}
        total={formattedTotal}
        totalPoints={totalPoints}
      />
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
const valueClassNames = 'text-sm  font-semibold text-foreground';

interface OrderSummaryRowProps {
  item: OrderSummaryRowItem;
}

function OrderSummaryRow(props: OrderSummaryRowProps) {
  if (props.item.type === 'item') {
    return (
      <div className={rowClassNames}>
        <p className="text-sm font-medium text-muted-foreground">
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
        <p className="text-sm font-semibold text-foreground">
          {props.item.value}
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-end">
      <p className="text-xs font-medium text-primary">{props.item.value}</p>
    </div>
  );
}

interface MobileCardProps {
  item: {
    name: string;
    quantity: number;
  };
  total: string;
  totalPoints: number;
}

function MobileCard(props: MobileCardProps) {
  return (
    <div className="flex items-center justify-between rounded-md border bg-card-gradient p-3 md:hidden">
      <div>
        <p className="text-sm font-semibold">{props.item.name}</p>
        <p className="text-xs font-medium text-muted-foreground">
          Quantity: {props.item.quantity}
        </p>
      </div>

      <div className="text-end">
        <p className="text-sm font-semibold">{props.total}</p>
        <p className="text-xs font-medium text-primary">{`+${props.totalPoints} pts`}</p>
      </div>
    </div>
  );
}
