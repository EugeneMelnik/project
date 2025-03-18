import { RootState } from '..';

export function accessTokenSelector(state: RootState) {
  return state.share.accessToken;
}

export function isLoadingSelector(state: RootState) {
  return state.share.isLoading;
}
