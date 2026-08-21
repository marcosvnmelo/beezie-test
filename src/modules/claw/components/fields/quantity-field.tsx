import { MinusIcon, PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { cn } from '@/lib/utils';
import { useFieldContext } from '@/modules/claw/contexts/claw-form-context';

interface QuantityFieldProps {
  id?: string;
  fieldClassName?: string;
  min?: number;
  max: number;
}

export function QuantityField(props: QuantityFieldProps) {
  const field = useFieldContext<number>();

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const inputId = props.id ?? field.name;

  const quantity = field.state.value;
  const min: number = props.min ?? 1;
  const max: number = props.max;

  return (
    <Field
      data-invalid={isInvalid}
      className={cn(
        'bg-secondary grid grid-cols-3 gap-0 overflow-hidden rounded-lg',
        props.fieldClassName,
      )}
    >
      <Button
        id={`${inputId}-minus`}
        type="button"
        variant="secondary"
        className="hover:bg-secondary aspect-square size-auto p-3"
        onClick={() => field.handleChange(quantity - 1)}
        disabled={quantity <= min}
      >
        <MinusIcon className="size-5" />
      </Button>
      <span
        id={`${inputId}-display`}
        className="flex items-center justify-center"
      >
        {quantity}
      </span>
      <Button
        id={`${inputId}-plus`}
        type="button"
        variant="secondary"
        className="hover:bg-secondary aspect-square size-auto p-3"
        onClick={() => field.handleChange(quantity + 1)}
        disabled={quantity >= max}
      >
        <PlusIcon className="size-5" />
      </Button>
    </Field>
  );
}
