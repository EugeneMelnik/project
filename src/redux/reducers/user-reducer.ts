import { AnyAction } from 'redux';
import { UserPageType } from '../../types';
import { UserActionTypes } from '../actions/user-action';

const initState: UserPageType = {
  id: null,
  userId: null,
  role: null,
  name: null,
  email: null,
  surname: null,
  status: 'active',
  theme: 'light',
  createdAt: null,
  updatedAt: null,
  listEditCollections: [],
  listDeleteCollections: [],
  myCollections: {
    countCollections: 0,
    collections: null,
  },
  likes: null,
  themes: null,
  isLoading: false,
};

function userReducer(state = initState, action: AnyAction) {
  switch (action.type) {
    case UserActionTypes.setIsLoading: {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    case UserActionTypes.setUserId: {
      return {
        ...state,
        id: action.userId,
      };
    }
    case UserActionTypes.setUserPersonalInfo: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case UserActionTypes.logoutUser: {
      return {
        id: null,
        userId: null,
        role: 'Reader',
        name: null,
        surname: null,
        status: 'active',
        theme: 'light',
        createdAt: null,
        updatedAt: null,
        myCollections: {
          countCollections: 0,
          collections: null,
        },
        listEditCollections: [],
        listDeleteCollections: [],
        likes: null,
        themes: null,
      };
    }
    case UserActionTypes.getThemes: {
      return {
        ...state,
        themes: [...action.themes],
      };
    }
    case UserActionTypes.setMyCollections: {
      return {
        ...state,
        myCollections: {
          countCollections: action.collections.countCollections,
          collections: [...action.collections.collections],
        },
      };
    }
    case UserActionTypes.setMeIsNotAdmin: {
      return {
        ...state,
        role: state.id === action.userId ? 'User' : 'Admin',
      };
    }
    case UserActionTypes.setEditCollections: {
      return {
        ...state,
        listEditCollections: [...action.collections],
      };
    }
    case UserActionTypes.deleteCollection: {
      return {
        ...state,
        myCollections: {
          ...state.myCollections,
          collections: [
            ...state.myCollections.collections!.filter(
              (collection) => collection.id !== action.collectionId,
            ),
          ],
        },
        listDeleteCollections: [
          ...state.listDeleteCollections.filter(
            (collection) => collection!.id !== action.collectionId,
          ),
        ],
      };
    }
    case UserActionTypes.updateCollection: {
      return {
        ...state,
        myCollections: {
          ...state.myCollections,
          collections: [
            action.collection,
            ...state.myCollections.collections!.filter(
              (collection) => collection.id !== action.collection.id,
            ),
          ],
        },
      };
    }
    case UserActionTypes.setDeleteCollections: {
      return {
        ...state,
        listDeleteCollections: [...action.collections],
      };
    }
    case UserActionTypes.setLike: {
      return {
        ...state,
        likes: state.likes
          ? [...state.likes, { itemId: action.itemId }]
          : [{ itemId: action.itemId }],
      };
    }
    case UserActionTypes.setDislike: {
      return {
        ...state,
        likes: state.likes
          ? state.likes.filter((like) => like.itemId !== action.itemId)
          : null,
      };
    }
    case UserActionTypes.addNewCollection: {
      return {
        ...state,
        myCollections: {
          ...state.myCollections,
          collections: state.myCollections.collections
            ? [action.data.collection, ...state.myCollections.collections]
            : [action.data.collection],
          countCollections: action.data.countCollections,
        },
      };
    }
    case UserActionTypes.updateEditCollections: {
      const [collection] = state.myCollections.collections!.filter(
        (collection) => collection.id === action.collectionId,
      );

      const [isExistCollection] = state.listEditCollections.filter(
        (collection) => collection?.id === action.collectionId,
      );
      return {
        ...state,
        listEditCollections: !isExistCollection
          ? [...state.listEditCollections, collection]
          : state.listEditCollections,
        listDeleteCollections: state.listDeleteCollections.filter(
          (delCollection) => delCollection?.id !== collection.id,
        ),
      };
    }
    case UserActionTypes.pullOutCollectionAction: {
      return {
        ...state,
        listEditCollections: state.listEditCollections.filter(
          (collection) => collection?.id !== action.collectionId,
        ),
        listDeleteCollections: state.listDeleteCollections.filter(
          (collection) => collection?.id !== action.collectionId,
        ),
      };
    }
    case UserActionTypes.updateDeleteCollections: {
      const [collection] = state.myCollections.collections!.filter(
        (collection) => collection.id === action.collectionId,
      );

      const [isExistCollection] = state.listDeleteCollections.filter(
        (collection) => collection?.id === action.collectionId,
      );

      return {
        ...state,
        listDeleteCollections: !isExistCollection
          ? [...state.listDeleteCollections, collection]
          : state.listDeleteCollections,
        listEditCollections: state.listEditCollections.filter(
          (editCollection) => editCollection?.id !== collection.id,
        ),
      };
    }
    default:
      return state;
  }
}

export default userReducer;
