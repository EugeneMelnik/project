import { requestAPI } from '../../api/api';
import { CreateUserDto, ICredentials, IUser } from '../../types';
import { setAccessToken, setIsLoading } from './share-action';
import { AppDispatch, RootState } from '../index';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { setAuthorizationHeader } from '../../axios';

export enum UserActionTypes {
  login = 'LOGIN',
  logout = 'LOGOUT',
}

const authStorageKey = 'project-auth';

const loginAction = (payload: IUser) => ({
  type: UserActionTypes.login,
  payload,
});

function persistAuth(user: IUser, accessToken: string) {
  localStorage.setItem(authStorageKey, JSON.stringify({ user, accessToken }));
}

function clearPersistedAuth() {
  localStorage.removeItem(authStorageKey);
}

export const restoreAuthThunk = () => (dispatch: AppDispatch) => {
  try {
    const storedAuth = localStorage.getItem(authStorageKey);

    if (storedAuth) {
      const { user, accessToken } = JSON.parse(storedAuth) as {
        user: IUser;
        accessToken: string;
      };

      if (user && accessToken) {
        dispatch(loginAction(user));
        dispatch(setAccessToken(accessToken));
        setAuthorizationHeader(accessToken);
      }
    }
  } catch {
    clearPersistedAuth();
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const logoutUserAction = () => ({
  type: UserActionTypes.logout,
});

export const loginThunk =
  (credentials: ICredentials) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setIsLoading(true));

      const result = await requestAPI.loginUser(credentials);

      if (result) {
        dispatch(loginAction(result.user));
        dispatch(setAccessToken(result.accessToken));
        setAuthorizationHeader(result.accessToken);
        persistAuth(result.user, result.accessToken);
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };

export const signUpThunk =
  (userInfo: CreateUserDto) =>
  async (dispatch: ThunkDispatch<RootState, void, AnyAction>) => {
    try {
      dispatch(setIsLoading(true));

      const result = await requestAPI.signUpUser(userInfo);

      if (result) {
        dispatch(loginAction(result.user));
        dispatch(setAccessToken(result.accessToken));
        setAuthorizationHeader(result.accessToken);
        persistAuth(result.user, result.accessToken);
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };

export const logOutThunk =
  (userId: string) => async (dispatch: AppDispatch) => {
    try {
      await requestAPI.logOutUser(userId);
    } finally {
      dispatch(logoutUserAction());
      setAuthorizationHeader(undefined);
      clearPersistedAuth();
    }
  };
