import { CircleHelpIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface HelpDialogProps extends React.PropsWithChildren {
  triggerLabel: string;
  icon: (className: string) => React.ReactNode;

  title: string;
  description: string;
}

export function HelpDialog(props: HelpDialogProps) {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            className="size-auto rounded-full p-0"
            title={props.triggerLabel}
            aria-label={props.triggerLabel}
          />
        }
      >
        <CircleHelpIcon className="size-4 text-muted-foreground group-hover/button:text-secondary-foreground" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2.5 text-xl">
            <span className="rounded-lg bg-muted p-2">
              {props.icon(cn('size-4 text-muted-foreground'))}
            </span>
            {props.title}
          </DialogTitle>

          <DialogDescription>{props.description}</DialogDescription>
        </DialogHeader>

        {props.children}
      </DialogContent>
    </Dialog>
  );
}
