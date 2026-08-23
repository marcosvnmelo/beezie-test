'use client';

import type { VariantProps } from 'class-variance-authority';
import { Radio as RadioPrimitive } from '@base-ui/react/radio';
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn('grid w-full gap-3', className)}
      {...props}
    />
  );
}

const radioGroupItemVariants = cva(
  'group/radio-group-item peer relative flex aspect-square size-4 shrink-0 rounded-full border border-input outline-none group-has-[:focus-visible]/field-label:ring-0 group-has-[:focus-visible]/field-label:not-data-checked:border-input after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:text-primary-foreground group-has-[:focus-visible]/field-label:data-checked:border-primary',
  {
    variants: {
      variant: {
        default:
          'data-checked:border-primary data-checked:bg-primary dark:data-checked:bg-primary',
        beezie: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const radioGroupItemIndicatorVariants = cva(
  'flex size-4 items-center justify-center',
  {
    variants: {
      variant: {
        default: '',
        beezie: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const radioGroupItemIndicatorSpanVariants = cva(
  'absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full',
  {
    variants: {
      variant: {
        default: 'bg-primary-foreground',
        beezie: 'bg-primary',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function RadioGroupItem({
  className,
  variant = 'default',
  ...props
}: RadioPrimitive.Root.Props & VariantProps<typeof radioGroupItemVariants>) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(radioGroupItemVariants({ variant }), className)}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className={cn(radioGroupItemIndicatorVariants({ variant }))}
      >
        <span
          className={cn(radioGroupItemIndicatorSpanVariants({ variant }))}
        />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  );
}

export { RadioGroup, RadioGroupItem };
