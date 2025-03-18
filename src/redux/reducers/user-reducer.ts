import { AnyAction } from 'redux';
import { IUser } from '../../types';
import { UserActionTypes } from '../actions/user-action';

const initState: Partial<IUser> = {};

export function userReducer(
  state = initState,
  action: AnyAction
): Partial<IUser> {
  switch (action.type) {
    case UserActionTypes.login: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
}
