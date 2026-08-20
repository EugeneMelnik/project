import { requestAPI } from '../../api/api';
import { CollectionType, ItemType } from '../../types';

export enum SearchActionTypes {
  setSearchUsers = 'SET-SEARCH-USERS',
  setSearchItems = 'SET-SEARCH-ITEMS',
  clearSearchData = 'CLEAR-SEARCH-DATA',
  setSearchList = 'SET-SEARCH-LIST',
}

// another type!
const setSearchUsersAction = (
  users: {
    name: string;
    surname: string;
    collections: Array<CollectionType | null>;
  }[],
) => ({
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

export const searchThunk = (substr: string) => (dipatch: any) => {
  requestAPI.search(substr).then((response) => {
    if (!response.result.length) return null;

    if (response.type === 'users') {
      return dipatch(setSearchUsersAction(response.result));
    }
    return dipatch(setSearchItemsAction(response.result));
  });
};
