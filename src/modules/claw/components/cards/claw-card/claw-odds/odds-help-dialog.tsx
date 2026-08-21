import { CircleHelpIcon, PercentIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function OddsHelpDialog() {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            className="size-auto rounded-full p-0"
            aria-label="Odds info"
          />
        }
      >
        <CircleHelpIcon className="size-4 text-muted-foreground group-hover/button:text-secondary-foreground" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2.5 text-xl">
            <span className="rounded-lg bg-muted p-2">
              <PercentIcon className="size-4 text-muted-foreground" />
            </span>
            Odds
          </DialogTitle>

          <DialogDescription>
            Odds update in real time as items leave the Claw. Each pull is fully
            independent, with odds determined by the Fair Market Value of the
            items currently in the Claw.
          </DialogDescription>
        </DialogHeader>

        <Card className="gap-3.5 bg-linear-[163deg] from-[#232323] from-0% via-[#1B1B1B] via-50% to-[#1A1A1A] to-100% px-4 py-5">
          <div className="flex w-full items-center justify-between gap-3">
            <span className="text-xs leading-4 text-muted-foreground">
              Odds based on
            </span>
            <span className="text-sm leading-5 font-medium">
              Fair market value
            </span>
          </div>
          <div className="flex w-full items-center justify-between gap-3">
            <span className="text-xs leading-4 text-muted-foreground">
              Updates
            </span>
            <span className="text-sm leading-5 font-medium text-emerald-500">
              Real-time
            </span>
          </div>
        </Card>

        <div className="flex w-full items-start gap-1 text-muted-foreground">
          <CircleHelpIcon className="size-5" />
          <p className="text-ds-fg-secondary flex-1 text-sm leading-5 font-medium">
            FMV is based on multiple market sources and updated periodically to
            reflect current market conditions.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
