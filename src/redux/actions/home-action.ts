import { requestAPI } from '../../api/api';
import { CollectionType, ItemType } from '../../types';
import type { AppDispatchType } from '../index';
import { setSearchItemsAction, setSearchListAction } from './search-action';

export enum HomeActionTypes {
  setBigCollections = 'SET-BIG-COLLECTIONS',
  setLastItems = 'SET-LAST-ITEMS',
  getLastAddItems = 'GET-LAST-ADD-ITEMS',
  setAllTags = 'SET-ALL-TAGS',
  setIsLoading = 'SET-IS-HOME-LOADING',
}

export const setIsLoadingAction = (isLoading: boolean) => ({
  type: HomeActionTypes.setIsLoading,
  isLoading,
});

export const setBigCollectionsAction = (collections: CollectionType[]) => ({
  type: HomeActionTypes.setBigCollections,
  collections,
});

export const setLastItemsAction = () => ({
  type: HomeActionTypes.setLastItems,
});

export const setAllTagsAction = (tags: { conten: string }[]) => ({
  type: HomeActionTypes.setAllTags,
  tags,
});

const getLastAddItemsAction = (items: ItemType[]) => ({
  type: HomeActionTypes.getLastAddItems,
  items,
});

export const getBigCollectionsThunk = () => (dispatch: AppDispatchType) => {
  dispatch(setIsLoadingAction(true));

  requestAPI
    .getBigCollections()
    .finally(() => dispatch(setIsLoadingAction(false)))
    .then((response) => {
      if (Array.isArray(response)) {
        dispatch(setBigCollectionsAction(response as CollectionType[]));
      }
    });
};

export const getLastAddItemsThunk = () => (dispatch: AppDispatchType) => {
  requestAPI.getLastAddItems().then((response) => {
    if (Array.isArray(response)) {
      dispatch(getLastAddItemsAction(response as ItemType[]));
    }
  });
};

export const getAllTagsThunk = () => (dispatch: AppDispatchType) => {
  requestAPI.getAllTags().then((response) => {
    if (Array.isArray(response)) {
      dispatch(setAllTagsAction(response));
    }
  });
};

export const searchItemsByTagThunk =
  (tag: string) => (dispatch: AppDispatchType) => {
    requestAPI.searchItemsByTag(tag).then((response) => {
      dispatch(setSearchItemsAction(response.items));
      dispatch(setSearchListAction());
    });
  };
