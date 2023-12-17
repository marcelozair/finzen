export interface IAuth0Payload {
  sub: string;
  iss: string;
  aud: string[];
  iat: number;
  exp: number;
  azp: string;
  scope: string;
}
