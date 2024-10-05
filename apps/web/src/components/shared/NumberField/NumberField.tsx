import React from 'react';
import { FieldError } from 'react-hook-form';
import { Input, InputProps } from '@nextui-org/react';

interface INumberFieldProps extends React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> {
  label: string;
  error?: FieldError | undefined | null;
  startContent?: React.ReactNode;
}

export const NumberField = React.forwardRef<HTMLInputElement, INumberFieldProps>(
  ({ label, disabled, startContent, error, ...rest }, ref) => {
    return (
      <Input
      {...rest as InputProps}

      label={label}
      baseRef={ref}
      isInvalid={!!error}
      errorMessage={error?.message}
      isDisabled={disabled}
      startContent={startContent}
      type="number"
      />
    )
  }
)