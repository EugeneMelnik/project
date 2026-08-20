import { requestAPI } from '../../api/api';
import { UserType } from '../../types';
import { setMeIsNotAdminAction } from './user-action';

export enum AdminActionTypes {
  setTargetUser = 'SET-TARGET-USER',
  setTargetCollections = 'SET-TARGET-COLLECTIONS',
  setAllUsers = 'SET-ALL-USERS',
  setUserBlock = 'SET-USER-BLOCK',
  setUserUnblock = 'SET-USER-UNBLOCK',
  deleteUser = 'DELETE-USER',
  setUserIsAdmin = 'SET-USER-IS-ADMIN',
  setUserIsNotAdmin = 'SET-USER-IS-NOT-ADMIN',
  clearAdminState = 'CLEAR-ADMIN-STATE',
  setIsLoading = 'SET-IS-ADMIN-LOADING',
}

export const setIsLoadingAction = (isLoading: boolean) => ({
  type: AdminActionTypes.setIsLoading,
  isLoading,
});

export const setTargetUser = (user: any) => ({
  type: AdminActionTypes.setTargetUser,
  user,
});

export const setAllUsers = (users: UserType[]) => ({
  type: AdminActionTypes.setAllUsers,
  users,
});

export const setUserBlock = (userId: number) => ({
  type: AdminActionTypes.setUserBlock,
  userId,
});

export const setUserIsAdmin = (userId: number) => ({
  type: AdminActionTypes.setUserIsAdmin,
  userId,
});

export const setUserIsNotAdmin = (userId: number) => ({
  type: AdminActionTypes.setUserIsNotAdmin,
  userId,
});

export const clearAdminStateAction = () => ({
  type: AdminActionTypes.clearAdminState,
});

export const setUserUnblock = (userId: number) => ({
  type: AdminActionTypes.setUserUnblock,
  userId,
});

export const deleteUser = (userId: number) => ({
  type: AdminActionTypes.deleteUser,
  userId,
});

export const setTargetUserCollectons = (collections: any) => ({
  type: AdminActionTypes.setTargetCollections,
  collections,
});

export const getTargetUserCollectionsThunk = (userId: number, page = 1) => (dispatch: any) => {
  requestAPI.getUserCollections(userId, page).then((response) => {
    dispatch(setTargetUserCollectons(response));
  });
};

export const getTargetUserThunk = (userId: number) => (dispatch: any) => {
  dispatch(setIsLoadingAction(true));

  requestAPI
    .getTargetUser(userId)
    .finally(() => dispatch(setIsLoadingAction(false)))
    .then((response) => {
      dispatch(setTargetUser(response));
    });
};

export const getAllUsersThunk = () => (dispatch: any) => {
  dispatch(setIsLoadingAction(true));

  requestAPI
    .getAllUsers()
    .finally(() => dispatch(setIsLoadingAction(false)))
    .then((response) => dispatch(setAllUsers(response)));
};

export const blockUserThunk = (userId: number) => (dispatch: any) => {
  requestAPI.blockUser(userId).then(() => dispatch(setUserBlock(userId)));
};

export const unblockUserThunk = (userId: number) => (dispatch: any) => {
  requestAPI.unblockUser(userId).then(() => dispatch(setUserUnblock(userId)));
};

export const setIsAdminThunk = (userId: number) => (dispatch: any) => {
  requestAPI.setIsAdmin(userId).then(() => dispatch(setUserIsAdmin(userId)));
};

export const removeFromAdminsThunk = (userId: number) => (dispatch: any) => {
  requestAPI.setIsNotAdmin(userId).then(() => {
    dispatch(setUserIsNotAdmin(userId));
    dispatch(setMeIsNotAdminAction(userId));
  });
};

export const deleteUserThunk = (userId: number) => (dispatch: any) => {
  requestAPI.deleteUser(userId).then(() => dispatch(deleteUser(userId)));
};
