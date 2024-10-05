import classNames from 'classnames';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import './SelectField.scss';
import { FieldError } from 'react-hook-form';
import { Spin } from '../Spin/Spin';
import { Select, SelectItem, SelectProps } from '@nextui-org/react';

export interface Option {
  value: string | number;
  label: string;
}

interface SelectFieldProps extends React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> {
  label: string;
  loading?: boolean;
  options: Option[];
  onCallback?: (value: string | number) => void;
  error?: FieldError | undefined | null;
  type?: 'text' | 'password';
}


export const SelectField = React.forwardRef<HTMLInputElement, SelectFieldProps>(
  ({ label, disabled, loading, required, onCallback, options, error, ...rest }, ref) => {

    return (
      <Select 
        {...rest as SelectProps}
        label={label}
        isDisabled={disabled}
        isLoading={loading}
        isRequired={required}
        isInvalid={!!error}
        errorMessage={error?.message}
        // onSelect={onCallback}
      >
        {options.map((option) => (
          <SelectItem key={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
    )

    // return (
    //   <div className="select-field" ref={selectorRef}>
    //     <label className="select-field__label">{label}</label>
    //     <input
    //       {...rest}
    //       autoComplete='off'
    //       className={!!error ? "select-field__input-error" : "select-field__input"}
    //       type={type}
    //       value={selected?.label || ''}
    //       onFocus={() => setShow(true)}
    //       disabled={disabled}
    //       ref={ref}
    //     />
    //     <div className="relative">
    //       {show && loading && (
    //         <ul className="select-field__options">
    //           <div className="options__not-found">
    //             <Spin black={true} />
    //           </div>
    //         </ul>
    //       )}

    //       {show && !loading && (
    //         <ul className="select-field__options">
    //         {options.length > 0 ? renderOptions() : <p className="options__not-found">No results found</p>}
    //         </ul>
    //       )}
    //     </div>

    //     {!!error && <p className="text-field__message-error">{error.message || 'Información inválida'}</p>}
    //   </div>
    // )
  }
)