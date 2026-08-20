import { AnyAction } from 'redux';
import { SearchPageType } from '../../types';
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
        itemsSearch: [...action.items],
        usersSearch: null,
      };
    }
    case SearchActionTypes.setSearchUsers: {
      return {
        ...state,
        usersSearch: [...action.users],
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
      const searchList = state.usersSearch
        ? state.usersSearch
        : state.itemsSearch;
      return {
        ...state,
        usersSearch: null,
        itemsSearch: null,
        listSearch: searchList ? [...searchList] : null,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}

export default searchReducer;
