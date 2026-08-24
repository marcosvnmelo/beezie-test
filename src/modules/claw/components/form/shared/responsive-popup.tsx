import { XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';

interface ResponsivePopupProps extends React.PropsWithChildren {
  title: string;
  titleClassName: string;

  onClose: () => void;

  dialogContent?: React.ReactNode;
  drawerContent?: React.ReactNode;

  dialogContentClassName?: string;
  drawerContentClassName?: string;
}

export function ResponsivePopup(props: ResponsivePopupProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  function setOpen(open: boolean) {
    if (!open) {
      props.onClose();
    }
  }

  if (isDesktop) {
    return (
      <Dialog open onOpenChange={setOpen}>
        <DialogContent className={props.dialogContentClassName}>
          <DialogHeader>
            <DialogTitle className={props.titleClassName}>
              {props.title}
            </DialogTitle>
          </DialogHeader>

          {props.children ? props.children : props.dialogContent}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open onOpenChange={setOpen}>
      <DrawerContent className={props.drawerContentClassName}>
        <DrawerHeader className="flex-row items-center justify-between px-6 pt-6">
          <DrawerTitle className={cn('text-left', props.titleClassName)}>
            {props.title}
          </DrawerTitle>

          <DrawerClose
            render={
              <Button variant="ghost" size="icon-sm" className="size-auto p-0">
                <XIcon className="size-5 text-muted-foreground" />
                <span className="sr-only">Close</span>
              </Button>
            }
          />
        </DrawerHeader>

        {props.children ? props.children : props.drawerContent}
      </DrawerContent>
    </Drawer>
  );
}
