import React from 'react';

import './Button.scss'
import { Spin } from '../Spin/Spin';
import classNames from 'classnames';

interface IButtonFieldProps {
  type?: 'button' | 'submit';
  children: React.ReactNode;
  className?: string;
  loading: boolean;
}

export const Button: React.FC<IButtonFieldProps> = (props) => {
  const { type = 'button', children, loading } = props;

  return (
    <button
      type={type}
      disabled={loading}
      className="relative h-[40px] text-white px-3 rounded-md bg-primary-normal font-semibold flex items-center gap-2 justify-center"
    >
      <div className={classNames({ 'opacity-0': loading })}>{ children }</div>
      {loading && (
        <div className="w-full h-full top-0 l-0 flex items-center justify-center absolute">
          <Spin />
        </div>
      )}
    </button>
  )
};