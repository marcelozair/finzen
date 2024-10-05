import React, { useState } from 'react';
import { FieldError } from 'react-hook-form';
import { Input, InputProps } from '@nextui-org/react';

import { EyeFilledIcon } from './icons/EyeFilledIcon';
import { EyeSlashFilledIcon } from './icons/EyeSlashFilledIcon';

interface IPasswordFieldProps extends React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> {
  label: string;
  error: FieldError | undefined;
}

export const PasswordField = React.forwardRef<HTMLInputElement, IPasswordFieldProps>(
  ({ error, label, ...rest }, ref) => {
    const [show, setShow] = useState(false);

    const changeShow = () => setShow(!show);

    return (
      <Input
        {...rest as InputProps}

        label={label}
        baseRef={ref}
        isInvalid={!!error}
        errorMessage={error?.message}
        type={show ? "text" : "password"}

        endContent={
          <button className="focus:outline-none" type="button" onClick={changeShow} aria-label="toggle password visibility">
            {show ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
      />
    )
  }
)