import { useCallback, useMemo, useState } from 'react';
import { useSelector } from '@tanstack/react-form-nextjs';
import { LoaderCircleIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/helpers/format-currency';
import { useInterval } from '@/hooks/use-interval';
import { cn } from '@/lib/utils';
import { clawFormOpts } from '@/modules/claw/constants/claw-form-options';
import { withClawForm } from '@/modules/claw/hooks/use-claw-form';

export const SwapPopupFooter = withClawForm({
  ...clawFormOpts,
  render: function Render({ form }) {
    const isSubmitting = useSelector(form.store, (s) => s.isSubmitting);

    const selectedAmount = useSelector(
      form.store,
      (s) => s.values.swapStep.items.filter((i) => i.selected).length,
    );

    const selectedValueSum = useSelector(form.store, (s) =>
      s.values.swapStep.items
        .filter((i) => i.selected)
        .reduce((acc, item) => acc + item.fmv, 0),
    );

    const isSomeItemSelected = selectedAmount > 0;

    const submitButtonText = useMemo(() => {
      if (isSubmitting) {
        return 'SWAP in progress';
      }

      if (isSomeItemSelected) {
        return `${selectedAmount} items for ${formatCurrency(selectedValueSum)}`;
      }

      return 'Swap';
    }, [isSubmitting, isSomeItemSelected, selectedAmount, selectedValueSum]);

    function selectAll() {
      const items = form.getFieldValue('swapStep.items');

      form.setFieldValue(
        'swapStep.items',
        items.map((i) => ({ ...i, selected: true })),
      );
    }

    function clearSelection() {
      const items = form.getFieldValue('swapStep.items');

      form.setFieldValue(
        'swapStep.items',
        items.map((i) => ({ ...i, selected: false })),
      );
    }

    return (
      <div
        className={cn(
          'group/footer mt-auto hidden grid-cols-2 items-center gap-4 p-4',
          'peer-has-data-multiple:grid',
          'md:peer-has-data-multiple:grid-cols-[1fr_auto_auto]',
        )}
      >
        <Countdown timeInMinutes={15} />

        <Button
          variant="ghost"
          size="xs"
          className={cn(
            'h-5 place-self-end p-0',
            'md:group-peer-has-data-multiple/footer:self-center',
          )}
          onClick={isSomeItemSelected ? clearSelection : selectAll}
        >
          {isSomeItemSelected ? 'Clear' : 'Select All'}
        </Button>

        <Button
          type="submit"
          size="lg"
          className={cn(
            'col-span-2 mx-auto w-full max-w-90 font-semibold',
            'md:group-peer-has-data-multiple/footer:col-span-1 md:group-peer-has-data-multiple/footer:min-w-2xs',
          )}
          onClick={() => form.handleSubmit()}
          disabled={!isSomeItemSelected || isSubmitting}
        >
          {isSubmitting && <LoaderCircleIcon className="size-4 animate-spin" />}
          {submitButtonText}
        </Button>
      </div>
    );
  },
});

interface CountdownProps {
  timeInMinutes: number;
}

const SECOND_IN_MILLISECONDS = 1000;

function Countdown(props: CountdownProps) {
  const [count, setCount] = useState(props.timeInMinutes * 60);
  const [isCountdownRunning, setIsCountdownRunning] = useState(true);

  const timeDisplay = useMemo(() => {
    const minutes = Math.floor(count / 60);
    const seconds = count % 60;

    const minutesDisplay = minutes < 10 ? `0${minutes}` : minutes;
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;

    if (minutes === 0) {
      return `${secondsDisplay} sec`;
    }

    return `${minutesDisplay} min ${secondsDisplay} sec`;
  }, [count]);

  const countdownCallback = useCallback(() => {
    if (count === 0) {
      setIsCountdownRunning(false);
      return;
    }

    setCount(count - 1);
  }, [count]);

  useInterval(
    countdownCallback,
    isCountdownRunning ? SECOND_IN_MILLISECONDS : null,
  );

  return (
    <div className="text-xs font-medium">
      <span className="text-muted-foreground">Expires in:</span>
      {timeDisplay}
    </div>
  );
}
