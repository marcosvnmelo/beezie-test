import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface GradientCardRow {
  label: string;
  value: string;
  valueColor: 'white' | 'green';
}

interface GradientCardProps {
  rows: GradientCardRow[];
}

export function GradientCard(props: GradientCardProps) {
  return (
    <Card className="gap-3.5 bg-linear-[163deg] from-[#232323] from-0% via-[#1B1B1B] via-50% to-[#1A1A1A] to-100% px-4 py-5">
      {props.rows.map((row) => (
        <div
          key={row.label}
          className="flex w-full items-center justify-between gap-3"
        >
          <span className="text-xs leading-4 text-muted-foreground">
            {row.label}
          </span>
          <span
            className={cn(
              'text-sm leading-5 font-medium',
              row.valueColor === 'green' && 'text-emerald-500',
            )}
          >
            {row.value}
          </span>
        </div>
      ))}
    </Card>
  );
}
