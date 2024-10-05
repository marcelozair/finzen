import React from 'react';
import { FieldError } from 'react-hook-form';
import { Input, InputProps } from '@nextui-org/react';

import './TextField.scss'

interface ITextFieldProps extends React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> {
  label: string;
  error?: FieldError | undefined | null;
}

export const TextField = React.forwardRef<HTMLInputElement, ITextFieldProps>(
  ({ label, error, disabled, ...rest }, ref) => {
    return (
      <Input
      {...rest as InputProps}

      label={label}
      baseRef={ref}
      isDisabled={disabled}
      isInvalid={!!error}
      errorMessage={error?.message}
      type="text"
      />
    )
  }
)