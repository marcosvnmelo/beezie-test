import { CircleHelpIcon, PercentIcon } from 'lucide-react';

import { GradientCard } from './gradient-card';
import { HelpDialog } from './help-dialog';

const gradientCardRows = [
  {
    label: 'Odds based on',
    value: 'Fair Market Value',
  },
  {
    label: 'Updates',
    value: 'Real-time',
  },
];

export function OddsHelpDialog() {
  return (
    <HelpDialog
      triggerLabel="Odds info"
      icon={(className) => <PercentIcon className={className} />}
      title="Odds"
      description="Odds update in real time as items leave the Claw. Each pull is fully independent, with odds determined by the Fair Market Value of the items currently in the Claw."
    >
      <GradientCard rows={gradientCardRows} />

      <div className="flex w-full items-start gap-1 text-muted-foreground">
        <CircleHelpIcon className="size-5" />
        <p className="text-ds-fg-secondary flex-1 text-sm font-medium">
          FMV is based on multiple market sources and updated periodically to
          reflect current market conditions.
        </p>
      </div>
    </HelpDialog>
  );
}
