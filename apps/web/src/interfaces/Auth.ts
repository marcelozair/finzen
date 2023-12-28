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

export interface ISignInPayload {
  email: string;
  password: string;
}

export interface ISignInResponse {
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
  profileSelected: null | number;
  profile?: null | AuthProfileState;
  createdAt: string;
  updatedAt: string;
};

export interface ICreateProfilePayload {
  name: string;
}

export interface ICreateProfileResponse extends AuthProfileState {}