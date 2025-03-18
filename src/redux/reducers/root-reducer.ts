import { combineReducers } from '@reduxjs/toolkit';
import { shareReducer } from './share-reducer';
import { userReducer } from './user-reducer';
import { AnyAction } from 'redux';
import { UserActionTypes } from '../actions/user-action';

const combinedReducer = combineReducers({
  share: shareReducer,
  user: userReducer,
});

export const rootReducer = (
  state: ReturnType<typeof combinedReducer> | undefined = undefined,
  action: AnyAction
) => {
  switch (action.type) {
    case UserActionTypes.logout: {
      return {
        ...combinedReducer(undefined, action),
        share: { isLoading: false },
      };
    }
    default:
      return combinedReducer(state, action);
  }
};
