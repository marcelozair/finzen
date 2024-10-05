import { FC, ReactNode } from 'react';
import classNames from 'classnames';

import './ButtonContainer.scss'

interface ContainerProps {
  children: ReactNode;
  align?: 'start' | 'center' | 'end'
}

export const Container: FC<ContainerProps> = ({ align = 'start', children }) => {
  return (
    <div
      className={classNames(
        "buttons-container",
        { 'justify-start': align === 'start' },
        { 'justify-center': align === 'center' },
        { 'justify-end': align === 'end' },
      )}
    >
      {children}
    </div>
  )
};
