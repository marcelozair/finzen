import { Button as CustomButton } from "@nextui-org/button";

import React from 'react';


interface IButtonFieldProps {
  type?: 'button' | 'submit';
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  style?: 'primary' | 'danger' | 'success'
  variant?: "bordered" | "solid" | "light" | "flat" | "faded" | "shadow" | "ghost"
}

export const Button: React.FC<IButtonFieldProps> = (props) => {
  const {
    onClick,
    children,
    className,
    loading = false,
    type = 'button',
    style = 'primary',
    variant = 'solid'
  } = props;

  return (
    <CustomButton
      className={className}
      isLoading={loading}
      type={type}
      variant={variant}
      onClick={onClick}
      color={style}
    >
      {children}
    </CustomButton>
  )
};
