import { AppStateType } from '..';
import { CollectionType, ItemType } from '../../types';

export function getCollectionsSelector(
  state: AppStateType,
): CollectionType[] | null {
  return state.home.collections;
}

export function getItemsSelector(state: AppStateType): ItemType[] | null {
  return state.home.list;
}

export function getTagsSelector(
  state: AppStateType,
): { content: string }[] | null {
  return state.home.tags;
}

export function getIsLoading(state: AppStateType): boolean {
  return state.home.isLoading;
}
