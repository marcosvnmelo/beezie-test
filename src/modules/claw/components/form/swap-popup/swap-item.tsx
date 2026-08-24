import Image from 'next/image';
import { CheckIcon, LoaderCircleIcon, PlusIcon } from 'lucide-react';

import type { ClawFormInput } from '@/modules/claw/schemas/claw-form.schema';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/helpers/format-currency';
import { cn } from '@/lib/utils';
import { clawFormOpts } from '@/modules/claw/constants/claw-form-options';
import { withClawForm } from '@/modules/claw/hooks/use-claw-form';

interface SwapItemProps {
  multiple: boolean;

  item: ClawFormInput['swapStep']['items'][number];
  onSelect: () => void;
  onSubmit: () => void;
  onKeep: () => void;
}

export const SwapItem = withClawForm({
  ...clawFormOpts,
  props: {} as SwapItemProps,
  render: function Render({ form, ...props }) {
    return (
      <div
        className={cn(
          'group/swap-item grid gap-5',
          'md:grid-cols-2 md:gap-8',
          'data-multiple:gap-2.5 data-multiple:rounded-lg data-multiple:border data-multiple:bg-card-gradient data-multiple:p-1',
          'md:data-multiple:grid-cols-1',
          'data-selected:border-primary',
        )}
        data-multiple={props.multiple ? 'true' : undefined}
        data-selected={props.item.selected ? 'true' : undefined}

        onClick={props.multiple ? props.onSelect : undefined}
      >
        <div
          className={cn(
            'relative aspect-square w-full overflow-hidden rounded-2xl',
            'group-data-multiple/swap-item:rounded-md',
          )}
        >
          <Image
            src={props.item.image}
            alt={props.item.name}
            fill
            sizes="(max-width: 767px) 284px, (min-width: 768px) 650px"
            className="pointer-events-none"
          />
          <div
            className={cn(
              'absolute top-1 right-1 hidden size-4 items-center justify-center rounded-full bg-card',
              'group-data-multiple/swap-item:flex',
              'md:group-data-multiple/swap-item:size-5',
              'group-data-selected/swap-item:bg-primary group-data-selected/swap-item:text-primary-foreground',
            )}
          >
            {props.item.selected ? (
              <CheckIcon className="size-2.5 md:group-data-multiple/swap-item:size-3.5" />
            ) : (
              <PlusIcon className="size-2.5 md:group-data-multiple/swap-item:size-3.5" />
            )}
          </div>
        </div>
        <div
          className={cn(
            'flex flex-col gap-6 md:gap-14',
            'group-data-multiple/swap-item:gap-2.5',
            'md:group-data-multiple/swap-item:gap-2.5',
          )}
        >
          <div
            className={cn(
              'line-clamp-2 text-lg font-semibold md:text-4xl',
              'group-data-multiple/swap-item:text-xs group-data-multiple/swap-item:font-medium',
              'group-data-multiple/swap-item:font-semibold md:group-data-multiple/swap-item:text-sm',
            )}
          >
            {props.item.name}
          </div>

          <div className="flex flex-col gap-2.5 group-data-multiple/swap-item:hidden">
            <div className="text-sm font-medium text-muted-foreground">
              Swap Value
            </div>
            <div className="text-4xl font-semibold text-primary md:text-6xl">
              {formatCurrency(props.item.fmv)}
            </div>
          </div>

          <form.Subscribe selector={(s) => s.isSubmitting}>
            {(isSubmitting) => (
              <Button
                type="button"
                className={cn(
                  'hidden text-xs font-semibold',
                  'group-data-multiple/swap-item:flex',
                  'md:group-data-multiple/swap-item:h-10 md:group-data-multiple/swap-item:text-sm',
                )}
                onClick={props.onSelect}
                disabled={props.item.selected || isSubmitting}
              >
                {isSubmitting && (
                  <LoaderCircleIcon className="size-4 animate-spin" />
                )}
                {isSubmitting
                  ? 'SWAP in progress'
                  : `Swap for ${formatCurrency(props.item.fmv)}`}
              </Button>
            )}
          </form.Subscribe>

          <div className="flex flex-col gap-3 group-data-multiple/swap-item:hidden">
            <form.Subscribe selector={(s) => s.isSubmitting}>
              {(isSubmitting) => (
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 font-semibold"
                  onClick={props.onSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <LoaderCircleIcon className="size-4 animate-spin" />
                  )}
                  {isSubmitting ? 'SWAP in progress' : 'Swap Now'}
                </Button>
              )}
            </form.Subscribe>
            <Button
              type="submit"
              variant="secondary"
              size="lg"
              className="h-12 text-muted-foreground"
              onClick={props.onKeep}
            >
              Keep Item
            </Button>
          </div>
        </div>
      </div>
    );
  },
});
