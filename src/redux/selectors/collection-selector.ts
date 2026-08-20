import { AppStateType } from '..';
import { ItemType } from '../../types';

export function getCollectionIdSelector(state: AppStateType): number {
  return state.collection.id as number;
}

export function getCollectionIconSelector(state: AppStateType): any {
  return state.collection.icon;
}

export function getCollectionDescriptionSelector(state: AppStateType): string {
  return state.collection.description as string;
}

export function getCollectionThemeSelector(state: AppStateType): string {
  return state.collection.theme as string;
}

export function getCollectionCreatedAtSelector(state: AppStateType): string {
  return state.collection.createdAt as string;
}

export function getCollectionUpdatedAtSelector(state: AppStateType): string {
  return state.collection.updatedAt as string;
}

export function getCollectionCustomFieldsSelector(state: AppStateType): any {
  return state.collection.customFields;
}

export function getCollectionListSelector(
  state: AppStateType,
): ItemType[] | null {
  return state.collection.list;
}

export function getCollectionTargetItemSelector(
  state: AppStateType,
): ItemType | null {
  return state.collection.targetItem;
}

export function getEditItemList(state: AppStateType): Array<ItemType | null> {
  return state.collection.listEditItems;
}

export function getDeleteItemList(state: AppStateType): Array<ItemType | null> {
  return state.collection.listDeleteItems;
}

export function getMatchTagsSelector(state: AppStateType) {
  return state.collection.matchTags;
}

export function getAuthorIdSelector(state: AppStateType) {
  return state.collection.userId;
}

export function getUntouchedComments(state: AppStateType) {
  return state.collection.untouchedComments;
}

export function getIsLoading(state: AppStateType): boolean {
  return state.collection.isLoading;
}
