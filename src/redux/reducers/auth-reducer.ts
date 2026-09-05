import { AnyAction } from 'redux';
import { AUTH } from '../actions/auth-action';

const initState: { isAuth: boolean } = {
  isAuth: false,
};

function authReducer(state = initState, action: AnyAction) {
  switch (action.type) {
    case AUTH.setIsAuth: {
      return {
        ...state,
        isAuth: action.isAuth,
      };
    }
    default:
      return state;
  }
}

export default authReducer;
