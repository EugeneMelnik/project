import { requestAPI } from '../../api/api';
import logout from '../../auth/services/logout';
import { logError, logSuccess } from '../../services/logger';
import {
  CollectionInitType,
  CollectionType,
  CollectionUpdateType,
  UserPersonalInfoType,
} from '../../types';
import { setIsAuthAction } from './auth-action';
import { clearCollectionStateAction } from './collection-action';
import { clearCollectionsStateAction } from './collections-action';
import type { AppDispatchType } from '../index';

export interface CredentialsType {
  id: string;
  name: string;
  surname: string;
  email: string;
}

export enum UserActionTypes {
  setUserPersonalInfo = 'SET-USER-PERSONAL-INFO',
  setMyCollections = 'SET-MY-COLLECTIONS',
  setEditCollections = 'SET-EDIT-COLLECTIONS',
  updateEditCollections = 'UPDATE-EDIT-COLLECTIONS',
  setDeleteCollections = 'SET-DELETE-COLLECTIONS',
  updateDeleteCollections = 'UPDATE-DELETE-COLLECTIONS',
  pullOutCollectionAction = 'PULL-OUT-COLLECTION',
  setLike = 'SET-LIKE',
  setDislike = 'SET-DISLIKE',
  increaseLikes = 'INCREASE-LIKES',
  decreaseLikes = 'DECREASE-LIKES',
  addNewCollection = 'ADD-NEW-COLLECTION',
  getThemes = 'GET-THEMES',
  deleteCollection = 'DELETE-COLLECTION',
  updateCollection = 'UPDATE-COLLECTION',
  setMeIsNotAdmin = 'SET-ME-IS-NOT-ADMIN',
  logoutUser = 'LOGOUT-USER',
  setIsLoading = 'SET-IS-USER-LOADING',
  setUserId = 'SET-USER-ID',
}

const setUserPersonalInfoAction = (payload: UserPersonalInfoType) => ({
  type: UserActionTypes.setUserPersonalInfo,
  payload,
});

export const setIsLoadingAction = (isLoading: boolean) => ({
  type: UserActionTypes.setIsLoading,
  isLoading,
});

const setCollectionThemesAction = (
  themes: { id: number; value: string }[]
) => ({
  type: UserActionTypes.getThemes,
  themes,
});

const addNewCollectionAction = (data: {
  collection: CollectionType;
  countCollections: number;
}) => ({
  type: UserActionTypes.addNewCollection,
  data,
});

const updateCollectionAction = (collection: CollectionType) => ({
  type: UserActionTypes.updateCollection,
  collection,
});

const decreaseLikesAction = (itemId: number) => ({
  type: UserActionTypes.decreaseLikes,
  itemId,
});

export const setUserIdAction = (userId: number) => ({
  type: UserActionTypes.setUserId,
  userId,
});

const increaseLikesAction = (itemId: number) => ({
  type: UserActionTypes.increaseLikes,
  itemId,
});

const setMyCollectionsAction = (collections: CollectionType[]) => ({
  type: UserActionTypes.setMyCollections,
  collections,
});

const setEditCollectionsAction = (collections: CollectionType[]) => ({
  type: UserActionTypes.setEditCollections,
  collections,
});

const setDeleteCollectionsAction = (collections: CollectionType[]) => ({
  type: UserActionTypes.setDeleteCollections,
  collections,
});

const updateEditCollectionsAction = (collectionId: number) => ({
  type: UserActionTypes.updateEditCollections,
  collectionId,
});

const pullOutCollectionAction = (collectionId: number) => ({
  type: UserActionTypes.pullOutCollectionAction,
  collectionId,
});

export const logoutUserAction = () => ({
  type: UserActionTypes.logoutUser,
});

const setLikeAction = (itemId: number) => ({
  type: UserActionTypes.setLike,
  itemId,
});

const setDislikeAction = (itemId: number) => ({
  type: UserActionTypes.setDislike,
  itemId,
});

const updateDeleteCollections = (collectionId: number) => ({
  type: UserActionTypes.updateDeleteCollections,
  collectionId,
});

const deleteCollectionAction = (collectionId: number) => ({
  type: UserActionTypes.deleteCollection,
  collectionId,
});

export const setMeIsNotAdminAction = (userId: number) => ({
  type: UserActionTypes.setMeIsNotAdmin,
  userId,
});

export const signUpThunk =
  (credentials: CredentialsType) => (dispatch: AppDispatchType) => {
    dispatch(setIsAuthAction(false));

    requestAPI
      .signUpUser(credentials)
      .finally(() => {
        dispatch(setIsAuthAction(true));
      })
      .then((res) => {
        dispatch(setUserPersonalInfoAction(res));
      });
  };

export const logOutThunk = (userId: string) => (dispatch: AppDispatchType) => {
  requestAPI.logOutUser(userId).then(() => {
    dispatch(logoutUserAction());
    dispatch(clearCollectionsStateAction());
    dispatch(clearCollectionStateAction());
  });
};

export const loginThunk = (_userId: string) => (dispatch: AppDispatchType) => {
  dispatch(setIsAuthAction(true));
};

export const getUserPersonalInfoThunk =
  (payload: CredentialsType) => (dispatch: AppDispatchType) => {
    dispatch(setIsAuthAction(false));

    requestAPI
      .getUserInfo(payload)
      .finally(() => {
        dispatch(setIsAuthAction(true));
      })
      .then((response) => {
        if (!response?.user) {
          return;
        }

        if (response.user.status === 'blocked') {
          logError('Your account has been blocked');

          logout();
        } else {
          dispatch(setUserPersonalInfoAction(response.user));
        }
      });
  };

export const getCollectionThemesThunk = () => (dispatch: AppDispatchType) => {
  requestAPI.getThemes().then((response) => {
    if (Array.isArray(response)) {
      dispatch(setCollectionThemesAction(response));
    }
  });
};

export const getMyCollectionsThunk =
  (userId: number, page = 1) =>
  (dispatch: AppDispatchType) => {
    dispatch(setIsLoadingAction(true));

    requestAPI
      .getMyCollections(userId, page)
      .finally(() => dispatch(setIsLoadingAction(false)))
      .then((response) => {
        if (response && Array.isArray(response.collections)) {
          dispatch(setMyCollectionsAction(response));
        }
      });
  };

export const setEditCollectionThunk =
  (collectionId: number) => (dispatch: AppDispatchType) => {
    dispatch(setIsLoadingAction(true));

    requestAPI
      .setEditCollection(collectionId)
      .finally(() => dispatch(setIsLoadingAction(false)))
      .then((response) => {
        if (response.code === 1) {
          dispatch(updateEditCollectionsAction(collectionId));
        }
      });
  };

export const getEditCollectionsThunk =
  (userId: string) => (dispatch: AppDispatchType) => {
    requestAPI.getEditCollections(userId).then((response) => {
      if (Array.isArray(response)) {
        dispatch(setEditCollectionsAction(response));
      }
    });
  };

export const setDeleteCollectionThunk =
  (collectionId: number) => (dispatch: AppDispatchType) => {
    dispatch(setIsLoadingAction(true));

    requestAPI
      .setDeleteCollection(collectionId)
      .finally(() => dispatch(setIsLoadingAction(false)))
      .then((response) => {
        if (response.code === 1) {
          dispatch(updateDeleteCollections(collectionId));
        }
      });
  };

export const getDeleteCollectionsThunk =
  (userId: string) => (dispatch: AppDispatchType) => {
    requestAPI.getDeleteCollections(userId).then((response) => {
      if (Array.isArray(response)) {
        dispatch(setDeleteCollectionsAction(response));
      }
    });
  };

export const updateCollectionThunk =
  (collection: CollectionUpdateType) => (dispatch: AppDispatchType) => {
    dispatch(setIsLoadingAction(true));

    requestAPI
      .updateCollection(collection)
      .finally(() => dispatch(setIsLoadingAction(false)))
      .then((response) => {
        logSuccess('The collection has been updated');
        dispatch(updateCollectionAction(response));
      });
  };

export const pullOutCollectionThunk =
  (collectionId: number) => (dispatch: AppDispatchType) => {
    requestAPI.pullOutCollection(collectionId).then((response) => {
      if (response.code === 1) {
        dispatch(pullOutCollectionAction(collectionId));
      }
    });
  };

export const toggleLikeThunk =
  (userId: number, itemId: number) => (dispatch: AppDispatchType) => {
    requestAPI.toogleLike(userId, itemId).then((response) => {
      if (response?.liked) {
        dispatch(setLikeAction(itemId));
        dispatch(increaseLikesAction(itemId));
      } else if (response && response.liked === false) {
        dispatch(setDislikeAction(itemId));
        dispatch(decreaseLikesAction(itemId));
      }
    });
  };

export const createNewCollectionThunk =
  (collectionInfo: CollectionInitType) => (dispatch: AppDispatchType) => {
    dispatch(setIsLoadingAction(true));

    requestAPI
      .createCollection(collectionInfo)
      .finally(() => dispatch(setIsLoadingAction(false)))
      .then((response) => {
        dispatch(addNewCollectionAction(response));
        logSuccess('The collection has been created');
      });
  };

export const deleteCollectionThunk =
  (collectionId: number) => (dispatch: AppDispatchType) => {
    dispatch(setIsLoadingAction(true));

    requestAPI
      .deleteCollection(collectionId)
      .finally(() => dispatch(setIsLoadingAction(false)))
      .then((response) => {
        if (response.code === 1) {
          dispatch(deleteCollectionAction(collectionId));
          logSuccess('The collection has been deleted');
        }
      });
  };
