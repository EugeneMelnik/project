import { AppStateType } from '..';
import { CollectionType } from '../../types';

export function getUserIdFirebase(state: AppStateType): string {
  return state.user.userId;
}

export function getUserId(state: AppStateType): number {
  return state.user.id;
}

export function getUserName(state: AppStateType): string {
  return state.user.name;
}

export function getUserSurname(state: AppStateType): string {
  return state.user.surname;
}

export function getUserStatus(state: AppStateType): 'active' | 'blocked' {
  return state.user.status;
}

export function getUserTheme(state: AppStateType): 'light' | 'dark' {
  return state.user.theme;
}

export function getUserEmail(state: AppStateType) {
  return state.user.email;
}

export function getUserCollectionThemes(state: AppStateType) {
  return state.user.themes;
}

export function getUserRole(state: AppStateType) {
  return state.user.role;
}

export function getIsLoading(state: AppStateType) {
  return state.user.isLoading;
}

export function getMyCollectionsSelector(state: AppStateType): {
  collections: CollectionType[] | null;
  countCollections: number;
} {
  return state.user.myCollections;
}

export function getEditCollections(
  state: AppStateType,
): Array<CollectionType | null> {
  return state.user.listEditCollections;
}

export function getDeleteCollections(
  state: AppStateType,
): Array<CollectionType | null> {
  return state.user.listDeleteCollections;
}

export function getLikesSelector(
  state: AppStateType,
): null | { itemId: number }[] {
  return state.user.likes;
}
