export interface CredentialsType {
  id: string;
  name: string;
  surname: string;
}

export enum AUTH {
  setIsAuth = 'SET-IS-AUTH',
}

export const setIsAuthAction = (isAuth: boolean) => ({
  type: AUTH.setIsAuth,
  isAuth,
});
