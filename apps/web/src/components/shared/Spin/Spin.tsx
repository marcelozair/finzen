import SpinIcon from '/images/icons/shared/circle-notch-solid.svg'
import SpinIconBlack from '/images/icons/shared/circle-notch-black.svg'
import { FC } from 'react';

interface SpinProps {
  black?: boolean;
}

export const Spin: FC<SpinProps> = ({ black }) => {
  if (black) return <img src={SpinIconBlack} className="opacity-50 inline w-4 h-4 text-gray-200 animate-spin" />

  return (
    <img src={SpinIcon} className="opacity-50 inline w-4 h-4 text-gray-200 animate-spin" />
  )
}