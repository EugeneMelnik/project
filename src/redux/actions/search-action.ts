import { requestAPI } from '../../api/api';
import type { AppDispatchType } from '../index';
import { CollectionType, ItemType } from '../../types';

export enum SearchActionTypes {
  setSearchUsers = 'SET-SEARCH-USERS',
  setSearchItems = 'SET-SEARCH-ITEMS',
  clearSearchData = 'CLEAR-SEARCH-DATA',
  setSearchList = 'SET-SEARCH-LIST',
}

export const setSearchItemsAction = (items: ItemType[]) => ({
  type: SearchActionTypes.setSearchItems,
  items,
});

export const clearSearchDataAction = () => ({
  type: SearchActionTypes.clearSearchData,
});

export const setSearchListAction = () => ({
  type: SearchActionTypes.setSearchList,
});

export const searchThunk = (substr: string) => (dispatch: AppDispatchType) => {
  dispatch(clearSearchDataAction());
  requestAPI.search(substr).then((response) => {
    if (
      !response ||
      !Array.isArray(response.items) ||
      !Array.isArray(response.collections)
    ) {
      return null;
    }

    const results = [
      ...response.items,
      ...response.collections.map((collection: CollectionType) => ({
        ...collection,
        isCollection: true,
      })),
    ];

    dispatch(setSearchItemsAction(results as ItemType[]));
    return results;
  });
};
