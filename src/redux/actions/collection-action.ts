import { requestAPI } from '../../api/api';
import { logSuccess } from '../../services/logger';
import {
  CollectionType,
  CommentType,
  ItemInitType,
  ItemType,
  ItemUpdateType,
  MatchTagType,
} from '../../types';
import type { AppDispatchType } from '../index';

const asItems = (response: unknown): ItemType[] =>
  Array.isArray(response) ? (response as ItemType[]) : [];

export enum CollectionActionTypes {
  SetTargetItem = 'SET-TARGET-ITEM',
  DeleteItem = 'DELETE-ITEM',
  SetTargetCollection = 'SET-TARGET-COLLECTION',
  SetTargetCollectionItems = 'SET-TARGET-COLLECTION-ITEMS',
  UpdateEditListItems = 'UPDATE-EDIT-LIST-ITEMS',
  SetEditListItems = 'SET-EDIT-LIST-ITEMS',
  UpdateDeleteListItems = 'UPDATE-DELETE-LIST-ITEMS',
  SetDeleteListItems = 'SET-DELETE-LIST-ITEMS',
  PullOutItem = 'PULL-OUT-ITEM',
  AddNewItem = 'ADD-NEW-ITEM',
  AddMatchTags = 'ADD-MATCH-TAGS',
  UpdateListItems = 'UPDATE-LIST-ITEMS',
  SetAllComments = 'SET-ALL-COMMENTS',
  SetUntouchedComments = 'SET-UNTOUCHED-COMMENTS',
  SetCommentsTouched = 'SET-COMMENTS-TOUCHED',
  UpdateNewItem = 'UPDATE-NEW-ITEM',
  ClearCollectionState = 'CLEAR-COLLECTION-STATE',
  SetIsLoading = 'SET-IS-LOADING-COLLECTION',
}

export const setIsLoadingAction = (isLoading: boolean) => ({
  type: CollectionActionTypes.SetIsLoading,
  isLoading,
});

export const clearCollectionStateAction = () => ({
  type: CollectionActionTypes.ClearCollectionState,
});

export const setTargetItemAction = (item: ItemType) => ({
  type: CollectionActionTypes.SetTargetItem,
  item,
});

export const deleteItemAction = (itemId: number) => ({
  type: CollectionActionTypes.DeleteItem,
  itemId,
});

export const pullOutItemAction = (itemId: number) => ({
  type: CollectionActionTypes.PullOutItem,
  itemId,
});

export const setTargetCollectionAction = (collection: CollectionType) => ({
  type: CollectionActionTypes.SetTargetCollection,
  collection,
});

export const addNewItemAction = (item: ItemType) => ({
  type: CollectionActionTypes.AddNewItem,
  item,
});

export const updateNewItemAction = (item: ItemType) => ({
  type: CollectionActionTypes.UpdateNewItem,
  item,
});

export const addMatchTagsAction = (tags: MatchTagType[]) => ({
  type: CollectionActionTypes.AddMatchTags,
  tags,
});

export const setTargetCollectionItemsAction = (items: ItemType[]) => ({
  type: CollectionActionTypes.SetTargetCollectionItems,
  items,
});

export const updateEditListItemsAction = (itemIds: number[]) => ({
  type: CollectionActionTypes.UpdateEditListItems,
  itemIds,
});

export const setEditListItemsAction = (items: ItemType[]) => ({
  type: CollectionActionTypes.SetEditListItems,
  items,
});

export const updateDeleteListItemsAction = (itemIds: number[]) => ({
  type: CollectionActionTypes.UpdateDeleteListItems,
  itemIds,
});

export const setDeleteListItemsAction = (items: ItemType[]) => ({
  type: CollectionActionTypes.SetDeleteListItems,
  items,
});

export const setAllCommentsAction = (comments: CommentType[]) => ({
  type: CollectionActionTypes.SetAllComments,
  comments,
});

export const setUntouchedCommentsAction = (comments: CommentType[]) => ({
  type: CollectionActionTypes.SetUntouchedComments,
  comments,
});

export const setCommentsTouchedAction = (itemId: number) => ({
  type: CollectionActionTypes.SetCommentsTouched,
  itemId,
});

export const getCollectionItemsThunk =
  (collectionId: number) => (dispatch: AppDispatchType) => {
    dispatch(setIsLoadingAction(true));

    requestAPI
      .getCollectionItems(collectionId)
      .finally(() => dispatch(setIsLoadingAction(false)))
      .then((response) => {
        dispatch(setTargetCollectionItemsAction(asItems(response)));
      });
  };

export const getTargetCollectionThunk =
  (collectionId: number) => (dispatch: AppDispatchType) => {
    requestAPI.getCollection(collectionId).then((response) => {
      dispatch(setTargetCollectionAction(response as CollectionType));
    });
  };

export const getTargetItemThunk =
  (itemId: number, collectionId: number) => (dispatch: AppDispatchType) => {
    requestAPI.getItem(itemId, collectionId).then((response) => {
      dispatch(setTargetItemAction(response as ItemType));
    });
  };

export const createNewItemThunk =
  (itemInfo: ItemInitType) => (dispatch: AppDispatchType) => {
    dispatch(setIsLoadingAction(true));

    requestAPI
      .createItem(itemInfo)
      .finally(() => dispatch(setIsLoadingAction(false)))
      .then((response) => {
        dispatch(addNewItemAction(response));
        logSuccess('The element has been created.');
      });
  };

export const deleteItemThunk =
  (itemId: number) => (dispatch: AppDispatchType) => {
    dispatch(setIsLoadingAction(true));

    requestAPI
      .deleteItem(itemId)
      .finally(() => dispatch(setIsLoadingAction(false)))
      .then((response) => {
        if (response.code === 1) {
          logSuccess('The element collection is deleted.');

          dispatch(deleteItemAction(itemId));
          dispatch(pullOutItemAction(itemId));
        }
      });
  };

export const setEditItemsThunk =
  (itemIds: number[]) => (dispatch: AppDispatchType) => {
    dispatch(setIsLoadingAction(true));

    requestAPI
      .setEditItems(itemIds)
      .finally(() => dispatch(setIsLoadingAction(false)))
      .then(() => {
        dispatch(updateEditListItemsAction(itemIds));
      });
  };

export const setDeleteItemsThunk =
  (itemIds: number[]) => (dispatch: AppDispatchType) => {
    dispatch(setIsLoadingAction(true));

    requestAPI
      .setDeleteItems(itemIds)
      .finally(() => dispatch(setIsLoadingAction(false)))
      .then(() => dispatch(updateDeleteListItemsAction(itemIds)));
  };

export const getEditItemsThunk =
  (collectionId: number) => (dispatch: AppDispatchType) => {
    requestAPI.getEditItems(collectionId).then((response) => {
      dispatch(setEditListItemsAction(asItems(response)));
    });
  };

export const getDeleteItemsThunk =
  (collectionId: number) => (dispatch: AppDispatchType) => {
    requestAPI.getDeleteItems(collectionId).then((response) => {
      dispatch(setDeleteListItemsAction(asItems(response)));
    });
  };

export const pullOutItemThunk =
  (itemId: number) => (dispatch: AppDispatchType) => {
    requestAPI.pullOutItem(itemId).then((response) => {
      if (response?.code === 1) {
        dispatch(pullOutItemAction(itemId));
      }
    });
  };

export const updateItemThunk =
  (item: ItemUpdateType) => (dispatch: AppDispatchType) => {
    dispatch(setIsLoadingAction(true));

    requestAPI
      .updateItem(item)
      .finally(() => dispatch(setIsLoadingAction(false)))
      .then((response) => {
        logSuccess('The element collection is updated.');

        dispatch(updateNewItemAction(response));
      });
  };

export const searchMatchTagsThunk =
  (tag: string) => (dispatch: AppDispatchType) => {
    requestAPI
      .searchMatchTag(tag)
      .then((response) => dispatch(addMatchTagsAction(response)));
  };

export const getAllCommentsThunk =
  (itemId: number) => (dispatch: AppDispatchType) => {
    requestAPI.getAllComments(itemId).then((response) => {
      dispatch(setAllCommentsAction(response));
    });
  };

export const addCommentThunk =
  (str: string, id: number, itemId: number) => (dispatch: AppDispatchType) => {
    dispatch(setIsLoadingAction(true));

    requestAPI
      .addComment(str, id, itemId)
      .finally(() => dispatch(setIsLoadingAction(false)))
      .then(() => {
        dispatch(getAllCommentsThunk(itemId));
      });
  };

export const getUntouchedCommentsThunk =
  (userId: number) => (dispatch: AppDispatchType) => {
    requestAPI.getAllUntouchedComments(userId).then((response) => {
      dispatch(setUntouchedCommentsAction(response));
    });
  };

export const setCommentsTouchedThunk =
  (itemId: number) => (dispatch: AppDispatchType) => {
    requestAPI.setCommentsTouched(itemId).then((response) => {
      dispatch(setCommentsTouchedAction(response));
    });
  };

// table filters
const updateListItemsAction = (items: ItemType[]) => ({
  type: CollectionActionTypes.UpdateListItems,
  items,
});

export const filterContainsThunk =
  (id: number, column: string, str: string) => (dispatch: AppDispatchType) => {
    requestAPI.filterContains(id, column, str).then((response) => {
      dispatch(updateListItemsAction(asItems(response)));
    });
  };

export const filterStartsWithThunk =
  (id: number, col: string, str: string) => (dispatch: AppDispatchType) => {
    requestAPI.filterStartsWithThunk(id, col, str).then((response) => {
      dispatch(updateListItemsAction(asItems(response)));
    });
  };

export const filterEqualsThunk =
  (id: number, column: string, str: string) => (dispatch: AppDispatchType) => {
    requestAPI.filterEqualsThunk(id, column, str).then((response) => {
      dispatch(updateListItemsAction(asItems(response)));
    });
  };

export const filterIsEmptyThunk =
  (collectionId: number, column: string) => (dispatch: AppDispatchType) => {
    requestAPI.filterIsEmpty(collectionId, column).then((response) => {
      dispatch(updateListItemsAction(asItems(response)));
    });
  };

export const filterIsNotEmptyThunk =
  (collectionId: number, column: string) => (dispatch: AppDispatchType) => {
    requestAPI.filterIsNotEmpty(collectionId, column).then((response) => {
      dispatch(updateListItemsAction(asItems(response)));
    });
  };

export const filterExistTagThunk =
  (collectionId: number, str: string) => (dispatch: AppDispatchType) => {
    requestAPI.filterExistTag(collectionId, str).then((response) => {
      dispatch(updateListItemsAction(asItems(response)));
    });
  };

export const filterMoreThanThunk =
  (id: number, column: string, str: string) => (dispatch: AppDispatchType) => {
    requestAPI.filterMoreThan(id, column, str).then((response) => {
      dispatch(updateListItemsAction(asItems(response)));
    });
  };

export const filterLessThanThunk =
  (id: number, column: string, str: string) => (dispatch: AppDispatchType) => {
    requestAPI.filterLessThan(id, column, str).then((response) => {
      dispatch(updateListItemsAction(asItems(response)));
    });
  };
