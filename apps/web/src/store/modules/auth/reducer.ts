import { PayloadAction } from '@reduxjs/toolkit';
import { AuthState, ICreateProfileResponse, ISignInResponse } from '../../../interfaces/Auth';
import { initialState } from './initialState';

const authReducer = {
  setSession(state: AuthState, { payload }: PayloadAction<ISignInResponse>) {
    const { profile, name, email, picture, id } = payload.user;

    if (profile) {
      state.profile = {
        id: profile.id,
        name: profile.name
      }
    }

    state.user = {
      id,
      name,
      email,
      picture,
    }

    return state;
  },

  setProfile(state: AuthState, { payload }: PayloadAction<ICreateProfileResponse>) {
    state.profile = {
      id: payload.id,
      name: payload.name
    }

    return state;
  },

  removeSession(state: AuthState) {
    state = initialState;
    return state;
  }
};

export default authReducer;
