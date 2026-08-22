import { requestAPI } from '../../api/api';
import type { AppDispatchType } from '../index';
import { SearchUserType, ItemType } from '../../types';

export enum SearchActionTypes {
  setSearchUsers = 'SET-SEARCH-USERS',
  setSearchItems = 'SET-SEARCH-ITEMS',
  clearSearchData = 'CLEAR-SEARCH-DATA',
  setSearchList = 'SET-SEARCH-LIST',
}

// another type!
const setSearchUsersAction = (users: SearchUserType[]) => ({
  type: SearchActionTypes.setSearchUsers,
  users,
});

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
  requestAPI.search(substr).then((response) => {
    if (
      !response ||
      !Array.isArray(response.result) ||
      response.result.length === 0
    ) {
      return null;
    }

    if (response.type === 'users') {
      return dispatch(setSearchUsersAction(response.result));
    }
    return dispatch(setSearchItemsAction(response.result));
  });
};
