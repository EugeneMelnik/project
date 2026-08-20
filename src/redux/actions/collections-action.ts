import { requestAPI } from '../../api/api';

export enum CollectionsActionTypes {
  setAllCollections = 'SET-ALL-COLLECTIONS',
  setTargetCollections = 'SET-TARGET-COLLECTIONS',
  setAllUserCollections = 'SET-ALL-USER-COLLECTIONS',
  clearCollectionsState = 'CLEAR-COLLECTIONS-STATE',
  setIsLoading = 'SET-IS-COLLECTIONS-LOADING',
}

export const setIsLoadingAction = (isLoading: boolean) => ({
  type: CollectionsActionTypes.setIsLoading,
  isLoading,
});

export const clearCollectionsStateAction = () => ({
  type: CollectionsActionTypes.clearCollectionsState,
});

const setAllCollectionsAction = (users: any) => ({
  type: CollectionsActionTypes.setAllCollections,
  users,
});

const setAllUserCollectionsAction = (user: any) => ({
  type: CollectionsActionTypes.setAllUserCollections,
  user,
});

const setTargetCollectionsAction = (user: any) => ({
  type: CollectionsActionTypes.setTargetCollections,
  user,
});

export const getAllCollectionsThunk = (userId?: number) => (dispatch: any) => {
  dispatch(setIsLoadingAction(true));

  requestAPI
    .getAllCollections(userId)
    .finally(() => dispatch(setIsLoadingAction(false)))
    .then((response) => {
      dispatch(setAllCollectionsAction(response));
    });
};

export const getUserCollectionsThunk = (userId: number, page = 1) => (dispatch: any) => {
  dispatch(setIsLoadingAction(true));

  requestAPI
    .getUserCollections(userId, page)
    .finally(() => dispatch(setIsLoadingAction(false)))
    .then((response) => {
      dispatch(
        setAllUserCollectionsAction({ id: userId, collections: response }),
      );
    });
};

export const getTargetCollectionsThunk = (userId: number | string, page = 1) => (dispatch: any) => {
  dispatch(setIsLoadingAction(true));

  requestAPI
    .getTargetCollections(userId, page)
    .finally(() => dispatch(setIsLoadingAction(false)))
    .then(([response]) => {
      dispatch(setTargetCollectionsAction(response));
    });
};
