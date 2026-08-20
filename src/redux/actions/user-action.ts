import { requestAPI } from '../../api/api';
import logout from '../../auth/services/logout';
import { logError, logSuccess } from '../../services/logger';
import {
  CollectionInitType,
  CollectionType,
  UserPersonalInfoType,
} from '../../types';
import { setIsAuthAction } from './auth-action';
import { clearCollectionStateAction } from './collection-action';
import { clearCollectionsStateAction } from './collections-action';

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

const pullOutCollectionAction = (collectionId: CollectionType) => ({
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
  (credentials: CredentialsType) => (dispatch: any) => {
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

export const logOutThunk = (userId: string) => (dispatch: any) => {
  requestAPI.logOutUser(userId).then(() => {
    dispatch(logoutUserAction());
    dispatch(clearCollectionsStateAction());
    dispatch(clearCollectionStateAction());
  });
};

export const loginThunk = (_userId: string) => (dispatch: any) => {
  dispatch(setIsAuthAction(true));
};

export const getUserPersonalInfoThunk =
  (payload: CredentialsType) => (dispatch: any) => {
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

export const getCollectionThemesThunk = () => (dispatch: any) => {
  requestAPI.getThemes().then((response) => {
    if (Array.isArray(response)) {
      dispatch(setCollectionThemesAction(response));
    }
  });
};

export const getMyCollectionsThunk =
  (userId: number, page = 1) =>
  (dispatch: any) => {
    dispatch(setIsLoadingAction(true));

    requestAPI
      .getMyCollections(userId, page)
      .finally(() => dispatch(setIsLoadingAction(false)))
      .then((response) => {
        dispatch(setMyCollectionsAction(response as CollectionType[]));
      });
  };

export const setEditCollectionThunk =
  (collectionId: number) => (dispatch: any) => {
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

export const getEditCollectionsThunk = (userId: string) => (dispatch: any) => {
  requestAPI
    .getEditCollections(userId)
    .then((response) =>
      dispatch(setEditCollectionsAction(response as CollectionType[]))
    );
};

export const setDeleteCollectionThunk =
  (collectionId: number) => (dispatch: any) => {
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
  (userId: string) => (dispatch: any) => {
    requestAPI
      .getDeleteCollections(userId)
      .then((response) =>
        dispatch(setDeleteCollectionsAction(response as CollectionType[]))
      );
  };

export const updateCollectionThunk = (collection: any) => (dispatch: any) => {
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
  (collectionId: any) => (dispatch: any) => {
    requestAPI.pullOutCollection(collectionId).then((response) => {
      if (response.code === 1) {
        dispatch(pullOutCollectionAction(collectionId));
      }
    });
  };

export const toggleLikeThunk =
  (userId: number, itemId: number) => (dispatch: any) => {
    requestAPI.toogleLike(userId, itemId).then((response) => {
      if (response.code === 0) return;
      if (response.message === 'like') {
        dispatch(setLikeAction(itemId));
        dispatch(increaseLikesAction(itemId));
      } else if (response.message === 'dislike') {
        dispatch(setDislikeAction(itemId));
        dispatch(decreaseLikesAction(itemId));
      }
    });
  };

export const createNewCollectionThunk =
  (collectionInfo: CollectionInitType) => (dispatch: any) => {
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
  (collectionId: number) => (dispatch: any) => {
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
