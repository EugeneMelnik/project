import { requestAPI } from '../../api/api';
import { logSuccess } from '../../services/logger';
import {
  CollectionType,
  CommentType,
  ItemInitType,
  ItemType,
} from '../../types';

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

export const addMatchTagsAction = (tags: any) => ({
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

export const getCollectionItemsThunk = (collectionId: number) => (dispatch: any) => {
  dispatch(setIsLoadingAction(true));

  requestAPI
    .getCollectionItems(collectionId)
    .finally(() => dispatch(setIsLoadingAction(false)))
    .then((response) => {
      dispatch(setTargetCollectionItemsAction(response as ItemType[]));
    });
};

export const getTargetCollectionThunk = (collectionId: number) => (dispatch: any) => {
  requestAPI.getCollection(collectionId).then((response) => {
    dispatch(setTargetCollectionAction(response as CollectionType));
  });
};

export const getTargetItemThunk = (itemId: number, collectionId: number) => (dispatch: any) => {
  requestAPI.getItem(itemId, collectionId).then((response) => {
    dispatch(setTargetItemAction(response as ItemType));
  });
};

export const createNewItemThunk = (itemInfo: ItemInitType) => (dispatch: any) => {
  dispatch(setIsLoadingAction(true));

  requestAPI
    .createItem(itemInfo)
    .finally(() => dispatch(setIsLoadingAction(false)))
    .then((response) => {
      dispatch(addNewItemAction(response));
      logSuccess('The element has been created.');
    });
};

export const deleteItemThunk = (itemId: number) => (dispatch: any) => {
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

export const setEditItemsThunk = (itemIds: number[]) => (dispatch: any) => {
  dispatch(setIsLoadingAction(true));

  requestAPI
    .setEditItems(itemIds)
    .finally(() => dispatch(setIsLoadingAction(false)))
    .then(() => {
      dispatch(updateEditListItemsAction(itemIds));
    });
};

export const setDeleteItemsThunk = (itemIds: number[]) => (dispatch: any) => {
  dispatch(setIsLoadingAction(true));

  requestAPI
    .setDeleteItems(itemIds)
    .finally(() => dispatch(setIsLoadingAction(false)))
    .then(() => dispatch(updateDeleteListItemsAction(itemIds)));
};

export const getEditItemsThunk = (collectionId: number) => (dispatch: any) => {
  requestAPI.getEditItems(collectionId).then((response) => {
    dispatch(setEditListItemsAction(response as ItemType[]));
  });
};

export const getDeleteItemsThunk = (collectionId: number) => (dispatch: any) => {
  requestAPI.getDeleteItems(collectionId).then((response) => {
    dispatch(setDeleteListItemsAction(response as ItemType[]));
  });
};

export const pullOutItemThunk = (itemId: number) => (dispatch: any) => {
  requestAPI.pullOutItem(itemId).then((response) => {
    if (response.code === 1) {
      dispatch(pullOutItemAction(itemId));
    }
  });
};

export const updateItemThunk = (item: any) => (dispatch: any) => {
  dispatch(setIsLoadingAction(true));

  requestAPI
    .updateItem(item)
    .finally(() => dispatch(setIsLoadingAction(false)))
    .then((response) => {
      logSuccess('The element collection is updated.');

      dispatch(updateNewItemAction(response));
    });
};

export const searchMatchTagsThunk = (tag: string) => (dispatch: any) => {
  requestAPI
    .searchMatchTag(tag)
    .then((response) => dispatch(addMatchTagsAction(response)));
};

export const getAllCommentsThunk = (itemId: number) => (dispatch: any) => {
  requestAPI.getAllComments(itemId).then((response) => {
    dispatch(setAllCommentsAction(response));
  });
};

export const addCommentThunk = (str: string, id: number, itemId: number) => (dispatch: any) => {
  dispatch(setIsLoadingAction(true));

  requestAPI
    .addComment(str, id, itemId)
    .finally(() => dispatch(setIsLoadingAction(false)))
    .then(() => {
      dispatch(getAllCommentsThunk(itemId));
    });
};

export const getUntouchedCommentsThunk = (userId: number) => (dispatch: any) => {
  requestAPI.getAllUntouchedComments(userId).then((response) => {
    dispatch(setUntouchedCommentsAction(response));
  });
};

export const setCommentsTouchedThunk = (itemId: number) => (dispatch: any) => {
  requestAPI.setCommentsTouched(itemId).then((response) => {
    dispatch(setCommentsTouchedAction(response));
  });
};

// table filters
const updateListItemsAction = (items: ItemType[]) => ({
  type: CollectionActionTypes.UpdateListItems,
  items,
});

export const filterContainsThunk = (id: number, column: string, str: string) => (dispatch: any) => {
  requestAPI.filterContains(id, column, str).then((response) => {
    dispatch(updateListItemsAction(response));
  });
};

export const filterStartsWithThunk = (id: number, col: string, str: string) => (dispatch: any) => {
  requestAPI.filterStartsWithThunk(id, col, str).then((response) => {
    dispatch(updateListItemsAction(response));
  });
};

export const filterEqualsThunk = (id: number, column: string, str: string) => (dispatch: any) => {
  requestAPI.filterEqualsThunk(id, column, str).then((response) => {
    dispatch(updateListItemsAction(response));
  });
};

export const filterIsEmptyThunk = (collectionId: number, column: string) => (dispatch: any) => {
  requestAPI.filterIsEmpty(collectionId, column).then((response) => {
    dispatch(updateListItemsAction(response));
  });
};

export const filterIsNotEmptyThunk = (collectionId: number, column: string) => (dispatch: any) => {
  requestAPI.filterIsNotEmpty(collectionId, column).then((response) => {
    dispatch(updateListItemsAction(response));
  });
};

export const filterExistTagThunk = (collectionId: number, str: string) => (dispatch: any) => {
  requestAPI.filterExistTag(collectionId, str).then((response) => {
    dispatch(updateListItemsAction(response));
  });
};

export const filterMoreThanThunk = (id: number, column: string, str: string) => (dispatch: any) => {
  requestAPI.filterMoreThan(id, column, str).then((response) => {
    dispatch(updateListItemsAction(response));
  });
};

export const filterLessThanThunk = (id: number, column: string, str: string) => (dispatch: any) => {
  requestAPI.filterLessThan(id, column, str).then((response) => {
    dispatch(updateListItemsAction(response));
  });
};
