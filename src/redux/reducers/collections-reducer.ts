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
      const allCollections = (Array.isArray(action.users) ? action.users : [])
        .filter((user: any) => user && (user.data || user.id))
        .reduce((users: any[], collection: any) => {
          const data = collection.data || collection;
          const owner = data.user || {};
          const id =
            data.id && data.collections ? data.id : data.userId || owner.id;
          if (!id) return users;

          const existingUser = users.find((user) => user.id === id);
          if (existingUser) {
            existingUser.collections.collections.push(data);
            existingUser.collections.countCollections += 1;
            return users;
          }

          users.push({
            id,
            name: data.name || owner.name || '',
            surname: data.surname || owner.surname || '',
            collections: data.collections || {
              collections: [data],
              countCollections: 1,
            },
          });
          return users;
        }, []);

      return { ...state, allCollections };
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
