import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Routes, useParams } from 'react-router-dom';
import RoutesApp from '../../constants/routes';
import { AppStateType } from '../../redux';
import {
  createNewItemThunk,
  deleteItemThunk,
  getAllCommentsThunk,
  getCollectionItemsThunk,
  getDeleteItemsThunk,
  getEditItemsThunk,
  getTargetCollectionThunk,
  getTargetItemThunk,
  addCommentThunk,
  pullOutItemThunk,
  searchMatchTagsThunk,
  setCommentsTouchedThunk,
  setDeleteItemsThunk,
  setEditItemsThunk,
  setTargetItemAction,
  updateItemThunk,
} from '../../redux/actions/collection-action';
import {
  getAuthorIdSelector,
  getCollectionCreatedAtSelector,
  getCollectionCustomFieldsSelector,
  getCollectionDescriptionSelector,
  getCollectionIconSelector,
  getCollectionIdSelector,
  getCollectionListSelector,
  getCollectionTargetItemSelector,
  getCollectionThemeSelector,
  getDeleteItemList,
  getEditItemList,
  getIsLoading,
  getMatchTagsSelector,
} from '../../redux/selectors/collection-selector';
import {
  getLikesSelector,
  getUserId,
  getUserRole,
} from '../../redux/selectors/user-selector';
import Preloader from '../../shared/components/Preloader/Preloader';
import { ItemInitType, ItemType } from '../../types';
import ItemPage from '../ItemPage/ItemPage';
import CollectionPage from './CollectionPage';

interface ICollectionPageContainer {
  userId: number;
  authorId: number;
  id: number;
  icon: any;
  description: string;
  theme: string;
  customFields: string[];
  createdAt: string;
  targetItem: ItemType | null;
  list: ItemType[] | null;
  isLoading: boolean;
  createNewItem: (itemInfo: ItemInitType) => void;
  deleteItem: (itemId: number) => void;
  getCollectionItems: (collectionId: number) => void;
  setTargetItem: (item: ItemType) => void;
  getTargetCollection: (collectionId: number) => void;
  getTargetItem: (itemId: number, collectionId: number) => void;
  role: 'Admin' | 'User' | 'Reader' | null;
  listEditItems: Array<ItemType | null>;
  listDeleteItems: Array<ItemType | null>;
  setEditItems: (itemIds: number[]) => void;
  setDeleteItems: (itemIds: number[]) => void;
  getEditItems: (collectionId: number) => void;
  getDeleteItems: (collectionId: number) => void;
  pullOutItem: (itemId: number) => void;
  updateItem: (item: any) => void;
  toogleLike: (userId: number, itemId: number) => void;
  likes: { itemId: number }[] | null;
  searchMatchTags: (tag: string) => void;
  matchTags: any;
  getAllComments: (itemId: number) => void;
  addComment: (content: string, userId: number, itemId: number) => void;
  setCommentsTouched: (itemId: number) => void;
}

const CollectionPageContainer: FC<ICollectionPageContainer> = (props) => {
  const { collectionId } = useParams();

  useEffect(() => {
    const {
      id,
      getCollectionItems,
      getTargetCollection,
      getEditItems,
      getDeleteItems,
    } = props;

    if (collectionId) {
      if (!id) {
        getTargetCollection(+collectionId);
        getEditItems(+collectionId);
        getDeleteItems(+collectionId);
      }

      getCollectionItems(+collectionId);
    }
  }, []);

  return (
    <>
      <Preloader isLoading={props.isLoading} />
      <Routes>
        <Route path="/" element={<CollectionPage {...props} />} />
        <Route
          path={RoutesApp.Item}
          element={(
            <ItemPage
              getTargetItem={props.getTargetItem}
              targetItem={props.targetItem as ItemType}
              toggleLike={props.toogleLike}
              userId={props.userId}
              likes={props.likes}
              getAllComments={props.getAllComments}
              addComment={props.addComment}
              customFields={props.customFields}
              setCommentsTouched={props.setCommentsTouched}
            />
          )}
        />
      </Routes>
    </>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  userId: getUserId(state),
  id: getCollectionIdSelector(state),
  icon: getCollectionIconSelector(state),
  description: getCollectionDescriptionSelector(state),
  theme: getCollectionThemeSelector(state),
  customFields: getCollectionCustomFieldsSelector(state),
  createdAt: getCollectionCreatedAtSelector(state),
  list: getCollectionListSelector(state),
  targetItem: getCollectionTargetItemSelector(state),
  listEditItems: getEditItemList(state),
  listDeleteItems: getDeleteItemList(state),
  likes: getLikesSelector(state),
  matchTags: getMatchTagsSelector(state),
  authorId: getAuthorIdSelector(state),
  role: getUserRole(state),
  isLoading: getIsLoading(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  createNewItem: (itemInfo: ItemInitType) => dispatch(createNewItemThunk(itemInfo)),
  getTargetCollection: (collectionId: number) => dispatch(getTargetCollectionThunk(collectionId)),
  getTargetItem: (itemId: number, collectionId: number) => {
    dispatch(getTargetItemThunk(itemId, collectionId));
  },
  getCollectionItems: (collectionId: number) => {
    dispatch(getCollectionItemsThunk(collectionId));
  },
  deleteItem: (itemId: number) => {
    dispatch(deleteItemThunk(itemId));
  },
  setTargetItem: (item: ItemType) => {
    dispatch(setTargetItemAction(item));
  },
  setEditItems: (itemIds: number[]) => {
    dispatch(setEditItemsThunk(itemIds));
  },
  setDeleteItems: (itemIds: number[]) => {
    dispatch(setDeleteItemsThunk(itemIds));
  },
  getEditItems: (collectionId: number) => {
    dispatch(getEditItemsThunk(collectionId));
  },
  getDeleteItems: (collectionId: number) => {
    dispatch(getDeleteItemsThunk(collectionId));
  },
  pullOutItem: (itemId: number) => {
    dispatch(pullOutItemThunk(itemId));
  },
  updateItem: (item: any) => {
    dispatch(updateItemThunk(item));
  },
  searchMatchTags: (tag: string) => {
    dispatch(searchMatchTagsThunk(tag));
  },
  getAllComments: (itemId: number) => {
    dispatch(getAllCommentsThunk(itemId));
  },
  addComment: (content: string, userId: number, itemId: number) => {
    dispatch(addCommentThunk(content, userId, itemId));
  },
  setCommentsTouched: (itemId: number) => {
    dispatch(setCommentsTouchedThunk(itemId));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CollectionPageContainer);
