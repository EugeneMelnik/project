import { RootState } from '..';

export function userIdSelector(state: RootState) {
  return state.user.id;
}

export function userNameSelector(state: RootState) {
  return state.user.name;
}

export function userSurnameSelector(state: RootState) {
  return state.user.surname;
}

export function getUserStatus(state: RootState) {
  return state.user.status;
}

export function getUserEmail(state: RootState) {
  return state.user.email;
}

export function userRoleSelector(state: RootState) {
  return state.user.role;
}
