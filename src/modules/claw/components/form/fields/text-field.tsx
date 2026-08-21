import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useFieldContext } from '@/modules/claw/contexts/claw-form-context';

interface TextFieldProps {
  id?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  fieldClassName?: string;
  fieldContent?: React.ReactNode;
  fieldOrientation?: React.ComponentProps<typeof Field>['orientation'];
}

export function TextField(props: TextFieldProps) {
  const field = useFieldContext<string>();

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const inputId = props.id ?? field.name;

  return (
    <Field
      data-invalid={isInvalid}
      className={props.fieldClassName}
      orientation={props.fieldOrientation}
    >
      {props.label && <FieldLabel htmlFor={inputId}>{props.label}</FieldLabel>}

      <Input
        id={inputId}
        name={field.name}
        data-testid={`input-${field.name}`}
        type="text"
        placeholder={props.placeholder}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        disabled={props.disabled}
        aria-invalid={isInvalid}
      />

      {props.fieldContent && <FieldContent>{props.fieldContent}</FieldContent>}

      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
