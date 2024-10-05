export interface AuthState {
  profile: null | AuthProfileState;
  user: null | AuthUserState;
}

export interface AuthUserState {
  id: number;
  name: string;
  email: string;
  picture: string | null;
}

export interface AuthProfileState {
  id: number;
  name: string;
}


/* --------- Auth Payloades --------- */

export interface ISignUpPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ISignInPayload {
  email: string;
  password: string;
}

/* --------- Auth Api Responses --------- */

export interface ISignInResponse {
  message: string;
  token: string;
  user: IUser;
}

export interface ISignUpResponse {
  message: string;
  token: string;
  user: IUser;
}

export interface IUser {
  id: number
  sub: string;
  name: string;
  email: string;
  password: string;
  picture: null | string;
  provider: string;
  profileId: null | number;
  profile?: null | AuthProfileState;
  createdAt: string;
  updatedAt: string;
};

export interface ICreateProfilePayload {
  name: string;
}

export interface ICreateProfileResponse extends AuthProfileState {}