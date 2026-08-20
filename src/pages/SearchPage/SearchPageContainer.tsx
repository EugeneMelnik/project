import React, { FC } from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux';
import { getTargetUserCollectionsThunk } from '../../redux/actions/admin-action';
import { setTargetCollectionAction } from '../../redux/actions/collection-action';
import {
  getIsLoading,
  getSearchListSelector,
} from '../../redux/selectors/search-selector';
import {
  getLikesSelector,
  getUserId,
} from '../../redux/selectors/user-selector';
import Preloader from '../../shared/components/Preloader/Preloader';
import { CollectionType, ItemType } from '../../types';
import SearchPage from './SearchPage';

interface ISearchPageContainer {
  userId: number;
  listSearch:
  | ItemType[]
  | {
    name: string;
    surname: string;
    collections: Array<CollectionType | null>;
  }[]
  | null;
  setTargetCollection: (collection: CollectionType) => void;
  getTargetUserCollections: (id: number, page?: number) => void;
  toogleLike: (userId: number, itemId: number) => void;
  likes: { itemId: number }[] | null;
  isLoading: boolean;
}

const SearchPageContainer: FC<ISearchPageContainer> = (props) => (
  <>
    <Preloader isLoading={props.isLoading} />
    <SearchPage {...props} />
  </>
);

const mapStateToProps = (state: AppStateType) => ({
  listSearch: getSearchListSelector(state),
  userId: getUserId(state),
  likes: getLikesSelector(state),
  isLoading: getIsLoading(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  setTargetCollection: (collection: CollectionType) => {
    dispatch(setTargetCollectionAction(collection));
  },
  getTargetUserCollections: (userId: number, page?: number) => {
    dispatch(getTargetUserCollectionsThunk(userId, page));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchPageContainer);
