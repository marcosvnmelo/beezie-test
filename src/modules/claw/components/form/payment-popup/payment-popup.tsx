'use client';

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
import { clawFormOpts } from '@/modules/claw/constants/claw-form-options';
import { withClawForm } from '@/modules/claw/hooks/use-claw-form';
import { ClawFormSubmitAction } from '@/modules/claw/schemas/claw-form.schema';

import { DesktopContent } from './desktop-content';
import { MobileContent } from './mobile-content';

const title = 'Review & pay';
const titleClassName = 'text-lg leading-4 font-semibold';

interface PaymentPopupProps {
  step: keyof (typeof clawFormOpts)['defaultValues'];
}

export const PaymentPopup = withClawForm({
  ...clawFormOpts,
  props: {
    step: 'quantityStep',
  } as PaymentPopupProps,
  render: function Render({ form, step }) {
    const isDesktop = useMediaQuery('(min-width: 768px)');

    const open = step === 'reviewAndPayStep';

    function setOpen(open: boolean) {
      if (!open) {
        form.handleSubmit({
          submitAction: ClawFormSubmitAction.ClosePaymentReview,
        });
      }
    }

    if (isDesktop) {
      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-188">
            <DialogHeader>
              <DialogTitle className={titleClassName}>{title}</DialogTitle>
            </DialogHeader>
            <DesktopContent form={form} />
          </DialogContent>
        </Dialog>
      );
    }

    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader className="flex-row items-center justify-between px-6 pt-6">
            <DrawerTitle className={cn(titleClassName, 'text-left')}>
              {title}
            </DrawerTitle>

            <DrawerClose
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="size-auto p-0"
                >
                  <XIcon className="size-5 text-muted-foreground" />
                  <span className="sr-only">Close</span>
                </Button>
              }
            />
          </DrawerHeader>
          <MobileContent form={form} />
        </DrawerContent>
      </Drawer>
    );
  },
});
