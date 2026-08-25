import { Card } from '@/components/ui/card';

interface GradientCardRow {
  label: string;
  value: string;
}

interface GradientCardProps {
  rows: GradientCardRow[];
}

export function GradientCard(props: GradientCardProps) {
  return (
    <Card className="gap-3.5 bg-card-gradient px-4 py-5">
      {props.rows.map((row) => (
        <div
          key={row.label}
          className="flex w-full items-center justify-between gap-3"
        >
          <span className="text-xs text-muted-foreground">{row.label}</span>
          <span className="text-sm font-medium">{row.value}</span>
        </div>
      ))}
    </Card>
  );
}
