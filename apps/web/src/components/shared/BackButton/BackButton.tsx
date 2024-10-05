import React, { FC } from 'react';
import { backArrow } from '../../../constants/assets/sharedAssets';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  callback?: () => void;
}

export const BackButton: FC<BackButtonProps> = ({ callback }) => {
  const navigate = useNavigate();
  const onRedirectBack = () => callback ? callback() : navigate(-1);

  return (
    <button
      onClick={onRedirectBack}
      className="flex gap-2 items-center text-primary-normal"
    >
      <img src={backArrow} />
      Regresar
    </button>
  )
};