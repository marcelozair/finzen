import { addAxiosAuthorization } from '../api/config';

export const getAuthorizationToken = (): string => {
  return localStorage.getItem('authorization-token') || '';
};

export const setAuthorizationToken = (token: string) => {
  localStorage.setItem('authorization-token', token);
  addAxiosAuthorization();
  return;
};
