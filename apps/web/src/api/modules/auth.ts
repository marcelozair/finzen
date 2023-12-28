import { $axios } from '../config';
import { ICreateProfilePayload, ICreateProfileResponse, ISignInPayload, ISignInResponse } from '../../interfaces/Auth';

export const $authApi = {
  signIn: (data: ISignInPayload): Promise<ISignInResponse> => {
    return $axios.post('auth/sign-in', { data });
  },

  createProfile: (data: ICreateProfilePayload): Promise<ICreateProfileResponse> => {
    return $axios.post('profile/create', { data });
  }
};
