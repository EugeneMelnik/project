import { AnyAction } from 'redux';
import { AUTH } from '../actions/share-action';

const initState: { accessToken?: string; isLoading: boolean } = {
  isLoading: true,
};

export function shareReducer(state = initState, action: AnyAction) {
  switch (action.type) {
    case AUTH.setAccessToken: {
      return {
        ...state,
        accessToken: action.accessToken,
      };
    }
    case AUTH.setIsLoading: {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    default:
      return state;
  }
}
