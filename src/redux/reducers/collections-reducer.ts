import { AnyAction } from 'redux';
import { CollectionsPageType } from '../../types';
import { CollectionsActionTypes } from '../actions/collections-action';

const initState: CollectionsPageType = {
  allCollections: null,
  targetCollections: null,
  isLoading: false,
};

function collectionsReducer(state = initState, action: AnyAction) {
  switch (action.type) {
    case CollectionsActionTypes.setAllCollections: {
      const allCollections = action.users.map((user: any) => ({
        id: user.data.id,
        name: user.data.name,
        surname: user.data.surname,
        collections: user.data.collections,
      }));

      return {
        ...state,
        allCollections: allCollections ? [...allCollections] : null,
      };
    }
    case CollectionsActionTypes.setIsLoading: {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    case CollectionsActionTypes.setTargetCollections: {
      const data = action.user;
      return {
        ...state,
        targetCollections: data ? { ...data } : null,
      };
    }
    case CollectionsActionTypes.setAllUserCollections: {
      const allCollections = state.allCollections?.map((user) => {
        if (user && user.id === action.user.id) {
          user.collections.collections = [...action.user.collections];

          return user;
        }

        return user;
      });
      return {
        ...state,
        allCollections: allCollections ? [...allCollections] : null,
      };
    }
    case CollectionsActionTypes.clearCollectionsState: {
      return {
        ...state,
        allCollections: null,
        targetCollections: null,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}

export default collectionsReducer;
