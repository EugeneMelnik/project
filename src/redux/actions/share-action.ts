export enum AUTH {
  setAccessToken = 'SET-ACCESS-TOKEN',
  setIsLoading = 'SET-IS-LOADING',
}

export const setAccessToken = (accessToken: string) => ({
  type: AUTH.setAccessToken,
  accessToken,
});

export const setIsLoading = (isLoading: boolean) => ({
  type: AUTH.setIsLoading,
  isLoading,
});
