import { DollarSignIcon } from 'lucide-react';

import { formatBalance } from '@/helpers/format-balance';

import { GradientCard } from './gradient-card';
import { HelpDialog } from './help-dialog';

const gradientCardRows = [
  {
    label: 'Claw Price',
    value: formatBalance(30),
    valueColor: 'white' as const,
  },
  {
    label: 'Average Value',
    value: formatBalance(34),
    valueColor: 'green' as const,
  },
];

export function AverageHelpDialog() {
  return (
    <HelpDialog
      triggerLabel="Average Value info"
      icon={(className) => <DollarSignIcon className={className} />}
      title="Average Value"
      description="The Average Value is calculated using the Fair Market Value of every item currently in the Claw and updates as items leave the pool."
    >
      <div className="flex w-full flex-col gap-2">
        <span className="text-xs leading-none font-medium text-muted-foreground">
          Example
        </span>
        <GradientCard rows={gradientCardRows} />
      </div>
    </HelpDialog>
  );
}
