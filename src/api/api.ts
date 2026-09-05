import axios from 'axios';
import {
  CollectionInitType,
  CollectionUpdateType,
  ItemInitType,
  ItemType,
  ItemUpdateType,
} from '../types';
import type { CredentialsType } from '../redux/actions/user-action';
import { logError } from '../services/logger';

const baseURL = process.env.REACT_APP_BASE_URL;

const appendFormDataValue = (
  formData: FormData,
  key: string,
  value: unknown
) => {
  if (value === null || value === undefined || value === '') return;
  if (Array.isArray(value) && value.length === 0) return;

  formData.append(
    key,
    value instanceof File
      ? value
      : key === 'tags'
      ? JSON.stringify(value)
      : String(value)
  );
};

export const API = {
  SignUpUser: '/api/user/signup',
  LoginUser: '/api/user/login',
  LogOutUser: '/api/user/logout',
  GetUserInfo: '/api/getUserInfo',
  CreateCollection: '/api/createCollection',
  GetMyCollections: '/api/getMyCollections',
  GetAllCollections: '/api/getAllCollections',
  GetUserCollections: '/api/getUserCollections',
  CreateItem: '/api/createItem',
  DeleteCollection: '/api/deleteCollection',
  DeleteItem: '/api/deleteItem',
  GetCollection: '/api/getCollection',
  GetItem: '/api/getItem',
  GetCollectionItems: '/api/getCollectionItems',
  GetBigCollections: '/api/getBigCollections',
  GetLastAddItems: '/api/getLastAddItems',
  SetEditCollection: '/api/setEditCollection',
  SetDeleteCollection: '/api/setDeleteCollection',
  GetEditCollections: '/api/getEditCollections',
  GetDeleteCollections: '/api/getDeleteCollections',
  SetEditItems: '/api/setEditItems',
  GetEditItems: '/api/getEditItems',
  SetDeleteItems: '/api/setDeleteItems',
  GetDeleteItems: '/api/getDeleteItems',
  UpdateCollection: '/api/updateCollection',
  UpdateItem: '/api/updateItem',
  GetTargetUser: '/api/getTargetUser',
  GetTargetCollections: '/api/getTargetCollections',
  Search: '/api/search',
  GetThemes: '/api/getThemes',
  ToogleLike: '/api/toogleLike',
  SearchMatchTag: '/api/searchMatchTag',
  GetAllTags: '/api/getAllTags',
  SearchItemsByTag: '/api/searchItemsByTag',
  FilterContains: '/api/filterContains',
  FilterStartsWithThunk: '/api/filterStartsWith',
  FilterEqualsThunk: '/api/filterEqualsThunk',
  FilterExistTag: '/api/filterExistTag',
  FilterIsEmpty: '/api/filterIsEmpty',
  FilterIsNotEmpty: '/api/filterIsNotEmpty',
  FilterMoreThan: '/api/filterMoreThan',
  FilterLessThan: '/api/filterLessThan',
  GetAllUsers: '/api/getAllUsers',
  BlockUser: '/api/blockUser',
  UnblockUser: '/api/unblockUser',
  DeleteUser: '/api/deleteUser',
  SetIsAdmin: '/api/setIsAdmin',
  SetIsNotAdmin: '/api/setIsNotAdmin',
  GetAllComments: '/api/getAllComments',
  addComment: '/api/addComment',
  SetCommentsTouched: '/api/setCommentsTouched',
  GetAllUntouchedComments: '/api/getAllUntouchedComments',
};

export const requestAPI = {
  getThemes() {
    return axios
      .get(baseURL + API.GetThemes)
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  getAllUntouchedComments(userId: number) {
    return axios
      .get(baseURL + API.GetAllUntouchedComments, { params: { userId } })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  setCommentsTouched(itemId: number) {
    return axios
      .put(baseURL + API.SetCommentsTouched, { itemId })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  addComment(content: string, userId: number, itemId: number) {
    return axios
      .post(baseURL + API.addComment, { content, userId, itemId })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  getAllComments(itemId: number) {
    return axios
      .get(baseURL + API.GetAllComments, {
        params: {
          itemId,
        },
      })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  filterContains(collectionId: number, column: string, str: string) {
    return axios
      .get(baseURL + API.FilterContains, {
        params: {
          column,
          str,
          collectionId,
        },
      })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  filterMoreThan(collectionId: number, column: string, num: string) {
    return axios
      .get(baseURL + API.FilterMoreThan, {
        params: {
          column,
          num,
          collectionId,
        },
      })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  filterLessThan(collectionId: number, column: string, num: string) {
    return axios
      .get(baseURL + API.FilterLessThan, {
        params: {
          column,
          num,
          collectionId,
        },
      })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  filterExistTag(collectionId: number, str: string) {
    return axios
      .get(baseURL + API.FilterExistTag, {
        params: {
          str,
          collectionId,
        },
      })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  filterIsEmpty(collectionId: number, column: string) {
    return axios
      .get(baseURL + API.FilterIsEmpty, {
        params: {
          collectionId,
          column,
        },
      })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  filterIsNotEmpty(collectionId: number, column: string) {
    return axios
      .get(baseURL + API.FilterIsNotEmpty, {
        params: {
          collectionId,
          column,
        },
      })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  filterStartsWithThunk(collectionId: number, column: string, str: string) {
    return axios
      .get(baseURL + API.FilterStartsWithThunk, {
        params: {
          column,
          str,
          collectionId,
        },
      })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  filterEqualsThunk(collectionId: number, column: string, str: string) {
    return axios
      .get(baseURL + API.FilterEqualsThunk, {
        params: {
          column,
          str,
          collectionId,
        },
      })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  signUpUser(credentials: CredentialsType) {
    return axios
      .post(baseURL + API.SignUpUser, credentials)
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  loginUser(userId: string) {
    return axios
      .post(baseURL + API.LoginUser, {
        id: userId,
      })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  deleteUser(userId: number) {
    return axios
      .post(baseURL + API.DeleteUser, {
        id: userId,
      })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  blockUser(userId: number) {
    return axios
      .post(baseURL + API.BlockUser, {
        id: userId,
      })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  setIsAdmin(userId: number) {
    return axios
      .post(baseURL + API.SetIsAdmin, {
        id: userId,
      })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  setIsNotAdmin(userId: number) {
    return axios
      .post(baseURL + API.SetIsNotAdmin, {
        id: userId,
      })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  unblockUser(userId: number) {
    return axios
      .post(baseURL + API.UnblockUser, {
        id: userId,
      })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  logOutUser(userId: string) {
    return axios
      .post(baseURL + API.LogOutUser, {
        id: userId,
      })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  toogleLike(userId: number, itemId: number) {
    return axios
      .post(baseURL + API.ToogleLike, {
        userId,
        itemId,
      })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  searchMatchTag(tag: string) {
    return axios
      .get(baseURL + API.SearchMatchTag, {
        params: { tag },
      })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  getAllTags() {
    return axios
      .get(baseURL + API.GetAllTags)
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  getAllUsers() {
    return axios
      .get(baseURL + API.GetAllUsers)
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  getUserInfo(payload: CredentialsType) {
    return axios
      .get(baseURL + API.GetUserInfo, {
        params: payload,
      })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  search(substr: string) {
    return axios
      .get(baseURL + API.Search, {
        params: { substr },
      })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  getMyCollections(userId: number, page: number) {
    return axios
      .get(baseURL + API.GetMyCollections, {
        params: { userId, page },
      })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  getUserCollections(userId: number, page: number) {
    return axios
      .get(baseURL + API.GetUserCollections, {
        params: { userId, page },
      })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  getTargetCollections(userId: number | string, page: number) {
    return axios
      .get(baseURL + API.GetTargetCollections, {
        params: { userId, page },
      })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  getBigCollections() {
    return axios
      .get(baseURL + API.GetBigCollections)
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  searchItemsByTag(tag: string) {
    return axios
      .get(baseURL + API.SearchItemsByTag, {
        params: { tag },
      })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  getLastAddItems() {
    return axios
      .get(baseURL + API.GetLastAddItems)
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  getAllCollections(userId?: number) {
    return axios
      .get(baseURL + API.GetAllCollections, {
        params: { userId },
      })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  getCollectionItems(collectionId: number) {
    return axios
      .get(baseURL + API.GetCollectionItems, {
        params: { collectionId },
      })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  getCollection(collectionId: number) {
    return axios
      .get(baseURL + API.GetCollection, {
        params: { collectionId },
      })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  getItem(itemId: number, collectionId: number) {
    return axios
      .get(baseURL + API.GetItem, {
        params: { itemId, collectionId },
      })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  createCollection(collectionInfo: CollectionInitType) {
    const formData = new FormData();

    // need to find another way
    Object.keys(collectionInfo).forEach((key: string) => {
      if (key === 'checkboxKeys') {
        formData.append(key, JSON.stringify(collectionInfo[key]));
        return;
      }
      const value = collectionInfo[key as keyof CollectionInitType];
      formData.append(key, value instanceof File ? value : String(value));
    });
    return axios
      .post(baseURL + API.CreateCollection, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  createItem(itemInfo: ItemInitType) {
    const formData = new FormData();

    Object.keys(itemInfo).forEach((key: string) => {
      formData.append(
        key,
        key === 'tags'
          ? JSON.stringify(itemInfo[key as keyof ItemInitType])
          : itemInfo[key as keyof ItemInitType] instanceof File
          ? (itemInfo[key as keyof ItemInitType] as File)
          : String(itemInfo[key as keyof ItemInitType])
      );
    });

    return axios
      .post(baseURL + API.CreateItem, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  deleteCollection(collectionId: number) {
    return axios
      .delete(baseURL + API.DeleteCollection, {
        params: {
          id: collectionId,
        },
      })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  deleteItem(itemId: number) {
    return axios
      .delete(baseURL + API.DeleteItem, {
        params: {
          itemId,
        },
      })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  setEditCollection(collectionId: number) {
    return axios
      .put(baseURL + API.SetEditCollection, { collectionId })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  setEditItems(itemIds: number[]) {
    return axios
      .put(baseURL + API.SetEditItems, itemIds)
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  getEditItems(collectionId: number) {
    return axios
      .get(baseURL + API.GetEditItems, {
        params: { collectionId },
      })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  getTargetUser(userId: number) {
    return axios
      .get(baseURL + API.GetTargetUser, {
        params: { userId },
      })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  getEditCollections(userId: string) {
    return axios
      .get(baseURL + API.GetEditCollections, {
        params: { userId },
      })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  setDeleteCollection(collectionId: number) {
    return axios
      .put(baseURL + API.SetDeleteCollection, { collectionId })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  setDeleteItems(itemIds: number[]) {
    return axios
      .put(baseURL + API.SetDeleteItems, itemIds)
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  getDeleteItems(collectionId: number) {
    return axios
      .get(baseURL + API.GetDeleteItems, {
        params: { collectionId },
      })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  getDeleteCollections(userId: string) {
    return axios
      .get(baseURL + API.GetDeleteCollections, {
        params: { userId },
      })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  updateCollection(collectionInfo: CollectionUpdateType) {
    const formData = new FormData();

    Object.keys(collectionInfo).forEach((key: string) => {
      appendFormDataValue(
        formData,
        key,
        collectionInfo[key as keyof CollectionUpdateType]
      );
    });

    return axios
      .put(baseURL + API.UpdateCollection, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
  updateItem(itemInfo: ItemUpdateType) {
    const formData = new FormData();

    Object.keys(itemInfo).forEach((key: string) => {
      appendFormDataValue(formData, key, itemInfo[key as keyof ItemType]);
    });

    return axios
      .put(baseURL + API.UpdateItem, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => response.data)
      .catch((error) => logError(error.message));
  },
};
