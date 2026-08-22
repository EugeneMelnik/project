import { AnyAction } from 'redux';
import { ItemType, SearchPageType, SearchUserType } from '../../types';
import { SearchActionTypes } from '../actions/search-action';

const initState: SearchPageType = {
  itemsSearch: null,
  usersSearch: null,
  listSearch: null,
  isLoading: false,
};

function searchReducer(state = initState, action: AnyAction) {
  switch (action.type) {
    case SearchActionTypes.setSearchItems: {
      return {
        ...state,
        itemsSearch: Array.isArray(action.items) ? [...action.items] : [],
        usersSearch: null,
      };
    }
    case SearchActionTypes.setSearchUsers: {
      return {
        ...state,
        usersSearch: Array.isArray(action.users) ? [...action.users] : [],
        itemsSearch: null,
      };
    }
    case SearchActionTypes.clearSearchData: {
      return {
        ...state,
        usersSearch: null,
        itemsSearch: null,
      };
    }
    case SearchActionTypes.setSearchList: {
      const searchList: ItemType[] | SearchUserType[] | null = state.usersSearch
        ? [...state.usersSearch]
        : state.itemsSearch
        ? [...state.itemsSearch]
        : null;
      return {
        ...state,
        usersSearch: null,
        itemsSearch: null,
        listSearch: searchList,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}

export default searchReducer;
