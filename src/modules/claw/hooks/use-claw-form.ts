import { createFormHook } from '@tanstack/react-form-nextjs';

import { fieldContext, formContext } from '@/modules/claw/contexts/claw-form-context';

import { QuantityField } from '../components/fields/quantity-field';
import { clawFormOpts } from '../constants/claw-form-options';

export const {
  useAppForm,
  useTypedAppFormContext: useClawFormContext,
  withForm: withClawForm,
  withFieldGroup: withClawFieldGroup,
} = createFormHook({
  fieldComponents: {
    QuantityField,
  },
  formComponents: {},
  fieldContext,
  formContext,
});

export function useClawForm() {
  return useAppForm({
    ...clawFormOpts,
  });
}
