import { useCallback } from 'react';
import { useSelector } from '@tanstack/react-form-nextjs';

import { cn } from '@/lib/utils';
import { clawFormOpts } from '@/modules/claw/constants/claw-form-options';
import { withClawForm } from '@/modules/claw/hooks/use-claw-form';
import { ClawFormSubmitAction } from '@/modules/claw/schemas/claw-form.schema';

import { ResponsivePopup } from '../shared/responsive-popup';
import { SwapPopupFooter } from './swap-footer';
import { SwapItem } from './swap-item';

export const SwapPopup = withClawForm({
  ...clawFormOpts,
  render: function Render({ form }) {
    const isSubmitting = useSelector(form.store, (s) => s.isSubmitting);

    const keepItems = useCallback(() => {
      if (isSubmitting) return;
      form.handleSubmit({ submitAction: ClawFormSubmitAction.KeepItems });
    }, [form, isSubmitting]);

    return (
      <ResponsivePopup
        title=""
        titleClassName=""
        dialogContentClassName={cn(
          'sm:aspect-7/5 sm:w-[calc(100%-var(--spacing)*4)] sm:max-w-350',
          'md:has-data-multiple:gap-0',
        )}
        onClose={keepItems}
      >
        <form
          className={cn(
            'group/form peer p-4 pb-10 has-data-multiple:pb-0',
            'grid flex-1 gap-x-2 gap-y-2.5 overflow-y-auto',
            'has-data-multiple:grid-cols-2',
            'md:has-data-multiple:grid-cols-4 md:has-data-multiple:gap-4 md:has-data-multiple:px-0 md:has-data-multiple:pt-8',
          )}
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <form.Field name="swapStep.items" mode="array">
            {(field) =>
              field.state.value.map((_, i, array) => (
                <form.Field key={i} name={`swapStep.items[${i}]`}>
                  {(field) => (
                    <SwapItem
                      form={form}
                      multiple={array.length > 1}
                      item={field.state.value}
                      onSelect={() =>
                        field.handleChange({
                          ...field.state.value,
                          selected: !field.state.value.selected,
                        })
                      }
                      onSubmit={() => form.handleSubmit()}
                      onKeep={keepItems}
                    />
                  )}
                </form.Field>
              ))
            }
          </form.Field>
        </form>

        <SwapPopupFooter form={form} />
      </ResponsivePopup>
    );
  },
});
