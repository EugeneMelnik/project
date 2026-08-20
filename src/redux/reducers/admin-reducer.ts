import { AnyAction } from 'redux';
import { AdminType, UserType } from '../../types';
import { AdminActionTypes } from '../actions/admin-action';

const initState: AdminType = {
  users: null,
  targetUser: null,
  targetCollections: {
    collections: null,
    countCollections: 0,
  },
  isLoading: false,
};

function adminReducer(state = initState, action: AnyAction) {
  switch (action.type) {
    case AdminActionTypes.setTargetUser: {
      return {
        ...state,
        targetUser: {
          ...action.user,
        },
        targetCollections: {
          ...state.targetCollections,
          collections: action.user.collections.countCollections
            ? [...action.user.collections.collections]
            : null,
          countCollections: action.user.collections.countCollections,
        },
      };
    }
    case AdminActionTypes.setIsLoading: {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    case AdminActionTypes.setTargetCollections: {
      return {
        ...state,
        targetCollections: {
          collections: [...action.collections.collections],
          countCollections: action.collections.countCollections,
        },
      };
    }
    case AdminActionTypes.setUserBlock: {
      return {
        ...state,
        users: state.users && [
          ...state.users.map((user) => {
            if (user.id === action.userId) {
              user.status = 'blocked';
            }

            return user;
          }),
        ],
      };
    }
    case AdminActionTypes.setUserUnblock: {
      return {
        ...state,
        users: state.users && [
          ...state.users.map((user) => {
            if (user.id === action.userId) {
              user.status = 'active';
            }

            return user;
          }),
        ],
      };
    }
    case AdminActionTypes.setUserIsAdmin: {
      return {
        ...state,
        users: state.users && [
          ...state.users.map((user) => {
            if (user.id === action.userId) {
              user.role = 'Admin';
            }

            return user;
          }),
        ],
      };
    }
    case AdminActionTypes.setUserIsNotAdmin: {
      return {
        ...state,
        users: state.users && [
          ...state.users.map((user) => {
            if (user.id === action.userId) {
              user.role = 'User';
            }

            return user;
          }),
        ],
      };
    }
    case AdminActionTypes.setAllUsers: {
      return {
        ...state,
        users: [...action.users],
      };
    }
    case AdminActionTypes.deleteUser: {
      return {
        ...state,
        users: state.users && [
          ...state.users.filter((user: UserType) => user.id !== action.userId),
        ],
        targetUser: null,
        targetCollections: {
          collections: null,
          countCollections: 0,
        },
      };
    }
    case AdminActionTypes.clearAdminState: {
      return {
        ...state,
        users: null,
        targetUser: null,
        targetCollections: {
          collections: null,
          countCollections: 0,
        },
      };
    }
    default:
      return state;
  }
}

export default adminReducer;
