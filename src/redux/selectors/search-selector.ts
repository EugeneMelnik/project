import { AppStateType } from '..';
import { CollectionType, ItemType } from '../../types';

export function getSearchItemsSelector(state: AppStateType): ItemType[] | null {
  return state.search.itemsSearch;
}

export function getSearchUsersSelector(state: AppStateType):
| {
  name: string;
  surname: string;
  collections: Array<CollectionType | null>;
}[]
| null {
  return state.search.usersSearch;
}

export function getSearchListSelector(state: AppStateType):
| ItemType[]
| {
  name: string;
  surname: string;
  collections: Array<CollectionType | null>;
}[]
| null {
  return state.search.listSearch;
}

export function getIsLoading(state: AppStateType): boolean {
  return state.search.isLoading;
}
