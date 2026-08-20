import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux';
import CollectionsPage from './CollectionsPage';
import { CollectionType } from '../../types';
import { setTargetCollectionAction } from '../../redux/actions/collection-action';
import {
  getAllCollectionsThunk,
  getTargetCollectionsThunk,
  getUserCollectionsThunk,
} from '../../redux/actions/collections-action';
import {
  getMyCollectionsSelector,
  getUserId,
  getUserRole,
} from '../../redux/selectors/user-selector';
import { getMyCollectionsThunk } from '../../redux/actions/user-action';
import {
  getAllCollectionsSelector,
  getIsLoading,
  getTargetCollectionsSelector,
} from '../../redux/selectors/collections-selector';
import Preloader from '../../shared/components/Preloader/Preloader';

interface ICollectionsPageContainer {
  id: number;
  allCollections:
  | {
    id: number;
    name: string;
    surname: string;
    collections: {
      collections: CollectionType[] | null;
      countCollections: number;
    };
  }[]
  | null;
  role: 'Admin' | 'User' | 'Reader';
  myCollections: {
    countCollections: number;
    collections: CollectionType[] | null;
  };
  setCollection: (collectionId: CollectionType) => void;
  getAllCollections: (userId?: number) => void;
  getMyCollections: (userId: number, page?: number) => void;
  getUserCollections: (userId: number, page?: number) => void;
  getTargetCollections: (userId: number | string, page?: number) => void;
  targetCollections: any;
  isLoading: boolean;
}

const CollectionsPageContainer: FC<ICollectionsPageContainer> = (props) => {
  useEffect(() => {
    const {
      getAllCollections, id, allCollections, getMyCollections,
    } = props;

    if (id) {
      getMyCollections(id);
    }
    if (!allCollections) getAllCollections();
  }, [props.id]);

  return (
    <>
      <Preloader isLoading={props.isLoading} />
      <CollectionsPage {...props} />
    </>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  id: getUserId(state),
  allCollections: getAllCollectionsSelector(state),
  myCollections: getMyCollectionsSelector(state),
  targetCollections: getTargetCollectionsSelector(state),
  role: getUserRole(state),
  isLoading: getIsLoading(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  setCollection: (collection: CollectionType) => {
    dispatch(setTargetCollectionAction(collection));
  },
  getAllCollections: (userId?: number) => {
    dispatch(getAllCollectionsThunk(userId));
  },
  getMyCollections: (userId: number, page?: number) => {
    dispatch(getMyCollectionsThunk(userId, page));
  },
  getUserCollections: (userId: number, page?: number) => {
    dispatch(getUserCollectionsThunk(userId, page));
  },
  getTargetCollections: (userId: number | string, page?: number) => {
    dispatch(getTargetCollectionsThunk(userId, page));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CollectionsPageContainer);
