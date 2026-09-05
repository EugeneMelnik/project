import { AppStateType } from '..';
import { TargetUserType } from '../../types';

export function getAdminTargetUser(state: AppStateType): TargetUserType {
  return state.admin.targetUser as TargetUserType;
}

export function getAdminTargetCollections(state: AppStateType) {
  return state.admin.targetCollections;
}

export function getAdminUsers(state: AppStateType): TargetUserType[] | null {
  return state.admin.users as TargetUserType[] | null;
}

export function getIsLoading(state: AppStateType): boolean {
  return state.admin.isLoading;
}
