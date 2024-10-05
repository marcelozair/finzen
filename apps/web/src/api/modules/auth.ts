import { $axios } from '../config';
import { ICreateProfilePayload, ICreateProfileResponse, ISignInPayload, ISignInResponse, ISignUpPayload, ISignUpResponse } from '../../interfaces/Auth';

export const $authApi = {
  signIn: (data: ISignInPayload): Promise<ISignInResponse> => {
    return $axios.post('auth/sign-in', { data });
  },

  signUp:(data: ISignUpPayload): Promise<ISignUpResponse> => {
    const { name, email, password } = data;
    return $axios.post('auth/sign-up', { data: { name, email, password } });
  },

  createProfile: (data: ICreateProfilePayload): Promise<ICreateProfileResponse> => {
    return $axios.post('profile/create', { data });
  },

  session: (): Promise<ISignInResponse> => {
    return $axios.post('auth/session');
  }
};
