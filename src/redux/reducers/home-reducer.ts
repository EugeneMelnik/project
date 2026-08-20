import { AnyAction } from 'redux';
import { HomePageType } from '../../types';
import { HomeActionTypes } from '../actions/home-action';
import { UserActionTypes } from '../actions/user-action';

const initState: HomePageType = {
  collections: null,
  list: null,
  tags: null,
  isLoading: false,
};

function homeReducer(state = initState, action: AnyAction) {
  switch (action.type) {
    case HomeActionTypes.setBigCollections: {
      return {
        ...state,
        collections: [...action.collections],
      };
    }
    case HomeActionTypes.setIsLoading: {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    case HomeActionTypes.getLastAddItems: {
      return {
        ...state,
        list: [...action.items],
      };
    }
    case HomeActionTypes.setAllTags: {
      return {
        ...state,
        tags: [...action.tags],
      };
    }
    case UserActionTypes.increaseLikes: {
      const newList = state.list?.map((item) => {
        if (item.id === action.itemId) {
          if (!item.likes) item.likes = [];

          item.likes.push({ itemId: action.itemId });
        }

        return item;
      });
      return {
        ...state,
        list: newList || null,
      };
    }
    case UserActionTypes.decreaseLikes: {
      const newList = state.list?.map((item) => {
        if (item.id === action.itemId) {
          if (!item.likes) item.likes = [];

          item.likes.splice(0, 1);
        }

        return item;
      });
      return {
        ...state,
        list: newList || null,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}

export default homeReducer;
