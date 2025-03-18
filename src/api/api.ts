import { AxiosResponse } from 'axios';
import { logError } from '../services/logger';
import { CreateUserDto, ICredentials, IUser } from '../types';
import { axiosInstance } from '../axios';

export interface CollectionInput {
  title: string;
  description: string;
  subject: string;
  userId: string;
}

export interface ItemInput {
  title: string;
  collectionId: number;
}

export const API = {
  SignUpUser: '/api/user/signup',
  LoginUser: '/api/user/login',
  LoginGoogleUser: '/api/user/login/google',
  LogOutUser: '/api/user/logout',
  GetAllUsers: '/api/getAllUsers',
  GetTargetUser: '/api/getTargetUser',
  BlockUser: '/api/blockUser',
  UnblockUser: '/api/unblockUser',
  DeleteUser: '/api/deleteUser',
  SetIsAdmin: '/api/setIsAdmin',
  SetIsNotAdmin: '/api/setIsNotAdmin',
  CreateCollection: '/api/createCollection',
  GetAllCollections: '/api/getAllCollections',
  GetCollection: '/api/getCollection',
  CreateItem: '/api/createItem',
  GetItem: '/api/getItem',
  GetCollectionItems: '/api/getCollectionItems',
  DeleteCollection: '/api/deleteCollection',
  DeleteItem: '/api/deleteItem',
  UpdateCollection: '/api/updateCollection',
  UpdateItem: '/api/updateItem',
  Search: '/api/search',
  ToogleLike: '/api/toogleLike',
  GetAllComments: '/api/getAllComments',
  AddComment: '/api/addComment',
  // SetEditCollection: '/api/setEditCollection',
  // SetDeleteCollection: '/api/setDeleteCollection',
  // GetEditCollections: '/api/getEditCollections',
  // GetDeleteCollections: '/api/getDeleteCollections',
  // SetEditItems: '/api/setEditItems',
  // GetEditItems: '/api/getEditItems',
  // SetDeleteItems: '/api/setDeleteItems',
  // GetDeleteItems: '/api/getDeleteItems',
  // UpdateCollection: '/api/updateCollection',
  // UpdateItem: '/api/updateItem',
  // PullOutCollection: '/api/pullOutCollection',
  // PullOutItem: '/api/pullOutItem',
  // GetTargetUser: '/api/getTargetUser',
  // GetTargetCollections: '/api/getTargetCollections',
  // Search: '/api/search',
  // GetSubjects: '/api/getSubjects',
  // ToogleLike: '/api/toogleLike',
  // SearchMatchTag: '/api/searchMatchTag',
  // GetAllTags: '/api/getAllTags',
  // SearchItemsByTag: '/api/searchItemsByTag',
  // FilterContains: '/api/filterContains',
  // FilterStartsWithThunk: '/api/filterStartsWith',
  // FilterEqualsThunk: '/api/filterEqualsThunk',
  // FilterExistTag: '/api/filterExistTag',
  // FilterIsEmpty: '/api/filterIsEmpty',
  // FilterIsNotEmpty: '/api/filterIsNotEmpty',
  // FilterMoreThan: '/api/filterMoreThan',
  // FilterLessThan: '/api/filterLessThan',
  // GetAllUsers: '/api/getAllUsers',
  // BlockUser: '/api/blockUser',
  // UnblockUser: '/api/unblockUser',
  // DeleteUser: '/api/deleteUser',
  // SetIsAdmin: '/api/setIsAdmin',
  // SetIsNotAdmin: '/api/setIsNotAdmin',
  // GetAllComments: '/api/getAllComments',
  // addComment: '/api/addComment',
  // SetCommentsTouched: '/api/setCommentsTouched',
  // GetAllUntouchedComments: '/api/getAllUntouchedComments',
};

export const requestAPI = {
  signUpUser(userInfo: CreateUserDto) {
    return axiosInstance
      .post(API.SignUpUser, userInfo)
      .then(
        (response: AxiosResponse<{ user: IUser; accessToken: string }>) =>
          response.data
      )
      .catch((error) => logError(error.message));
  },
  loginUser(credentials: ICredentials) {
    return axiosInstance
      .post(API.LoginUser, credentials)
      .then(
        (response: AxiosResponse<{ user: IUser; accessToken: string }>) =>
          response.data
      )
      .catch((error) => {
        console.log(error);
        logError(error.message);
      });
  },
  loginGoogleUser() {
    return axiosInstance
      .post(API.LoginGoogleUser)
      .then(
        (response: AxiosResponse<{ user: IUser; accessToken: string }>) =>
          response.data
      )
      .catch((error) => {
        console.log(error);
        logError(error.message);
      });
  },
  logOutUser(userId: string) {
    return axiosInstance
      .post(API.LogOutUser, {
        id: userId,
      })
      .then((response: AxiosResponse<string>) => response.data)
      .catch((error) => logError(error.message));
  },
  getAllUsers() {
    return axiosInstance.get(API.GetAllUsers).then((response) => response.data);
  },
  getTargetUser(id: string) {
    return axiosInstance
      .get(API.GetTargetUser, { params: { userId: id } })
      .then((response) => response.data);
  },
  updateUser(id: string, action: 'block' | 'unblock' | 'admin' | 'user') {
    const endpoints = {
      block: API.BlockUser,
      unblock: API.UnblockUser,
      admin: API.SetIsAdmin,
      user: API.SetIsNotAdmin,
    };
    return axiosInstance
      .post(endpoints[action], { id })
      .then((response) => response.data);
  },
  deleteUser(id: string) {
    return axiosInstance
      .post(API.DeleteUser, { id })
      .then((response) => response.data);
  },
  getAllCollections(userId?: string) {
    return axiosInstance
      .get(API.GetAllCollections, { params: { userId } })
      .then((response) => response.data);
  },
  getCollection(collectionId: number) {
    return axiosInstance
      .get(API.GetCollection, { params: { collectionId } })
      .then((response) => response.data);
  },
  createCollection(collection: CollectionInput) {
    return axiosInstance
      .post(API.CreateCollection, collection)
      .then((response) => response.data);
  },
  createItem(item: ItemInput) {
    return axiosInstance
      .post(API.CreateItem, item)
      .then((response) => response.data);
  },
  getItem(itemId: number) {
    return axiosInstance
      .get(API.GetItem, { params: { itemId } })
      .then((response) => response.data);
  },
  getCollectionItems(collectionId: number) {
    return axiosInstance
      .get(API.GetCollectionItems, { params: { collectionId } })
      .then((response) => response.data);
  },
  deleteCollection(id: number) {
    return axiosInstance
      .delete(API.DeleteCollection, { params: { id } })
      .then((response) => response.data);
  },
  deleteItem(itemId: number) {
    return axiosInstance
      .delete(API.DeleteItem, { params: { itemId } })
      .then((response) => response.data);
  },
  searchItems(substr: string) {
    return axiosInstance
      .get(API.Search, { params: { substr } })
      .then((response) => response.data);
  },
  toggleLike(userId: string, itemId: number) {
    return axiosInstance
      .post(API.ToogleLike, { userId, itemId })
      .then((response) => response.data);
  },
  getComments(itemId: number) {
    return axiosInstance
      .get(API.GetAllComments, { params: { itemId } })
      .then((response) => response.data);
  },
  addComment(content: string, userId: string, itemId: number) {
    return axiosInstance
      .post(API.AddComment, { content, userId, itemId })
      .then((response) => response.data);
  },
  // getSubjects() {
  //   return axios
  //     .get(baseURL + API.GetSubjects)
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // getAllUntouchedComments(userId: number) {
  //   return axios
  //     .get(baseURL + API.GetAllUntouchedComments, { params: { userId } })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // setCommentsTouched(itemId: number) {
  //   return axios
  //     .put(baseURL + API.SetCommentsTouched, { itemId })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // addComment(content: string, userId: number, itemId: number) {
  //   return axios
  //     .post(baseURL + API.addComment, { content, userId, itemId })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // getAllComments(itemId: number) {
  //   return axios
  //     .get(baseURL + API.GetAllComments, {
  //       params: {
  //         itemId,
  //       },
  //     })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // filterContains(collectionId: number, column: string, str: string) {
  //   return axios
  //     .get(baseURL + API.FilterContains, {
  //       params: {
  //         column,
  //         str,
  //         collectionId,
  //       },
  //     })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // filterMoreThan(collectionId: number, column: string, num: string) {
  //   return axios
  //     .get(baseURL + API.FilterMoreThan, {
  //       params: {
  //         column,
  //         num,
  //         collectionId,
  //       },
  //     })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // filterLessThan(collectionId: number, column: string, num: string) {
  //   return axios
  //     .get(baseURL + API.FilterLessThan, {
  //       params: {
  //         column,
  //         num,
  //         collectionId,
  //       },
  //     })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // filterExistTag(collectionId: number, str: string) {
  //   return axios
  //     .get(baseURL + API.FilterExistTag, {
  //       params: {
  //         str,
  //         collectionId,
  //       },
  //     })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // filterIsEmpty(collectionId: number, column: string) {
  //   return axios
  //     .get(baseURL + API.FilterIsEmpty, {
  //       params: {
  //         collectionId,
  //         column,
  //       },
  //     })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // filterIsNotEmpty(collectionId: number, column: string) {
  //   return axios
  //     .get(baseURL + API.FilterIsNotEmpty, {
  //       params: {
  //         collectionId,
  //         column,
  //       },
  //     })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // filterStartsWithThunk(collectionId: number, column: string, str: string) {
  //   return axios
  //     .get(baseURL + API.FilterStartsWithThunk, {
  //       params: {
  //         column,
  //         str,
  //         collectionId,
  //       },
  //     })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // filterEqualsThunk(collectionId: number, column: string, str: string) {
  //   return axios
  //     .get(baseURL + API.FilterEqualsThunk, {
  //       params: {
  //         column,
  //         str,
  //         collectionId,
  //       },
  //     })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // deleteUser(userId: number) {
  //   return axios
  //     .post(baseURL + API.DeleteUser, {
  //       id: userId,
  //     })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // blockUser(userId: number) {
  //   return axios
  //     .post(baseURL + API.BlockUser, {
  //       id: userId,
  //     })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // setIsAdmin(userId: number) {
  //   return axios
  //     .post(baseURL + API.SetIsAdmin, {
  //       id: userId,
  //     })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // setIsNotAdmin(userId: number) {
  //   return axios
  //     .post(baseURL + API.SetIsNotAdmin, {
  //       id: userId,
  //     })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // unblockUser(userId: number) {
  //   return axios
  //     .post(baseURL + API.UnblockUser, {
  //       id: userId,
  //     })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // toogleLike(userId: number, itemId: number) {
  //   return axios
  //     .post(baseURL + API.ToogleLike, {
  //       userId,
  //       itemId,
  //     })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // searchMatchTag(tag: string) {
  //   return axios
  //     .get(baseURL + API.SearchMatchTag, {
  //       params: { tag },
  //     })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // getAllTags() {
  //   return axios
  //     .get(baseURL + API.GetAllTags)
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // getAllUsers() {
  //   return axios
  //     .get(baseURL + API.GetAllUsers)
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // getUserInfo(payload: ICredentials) {
  //   return axios
  //     .get(baseURL + API.GetUserInfo, {
  //       params: payload,
  //     })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // search(substr: string) {
  //   return axios
  //     .get(baseURL + API.Search, {
  //       params: { substr },
  //     })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // getMyCollections(userId: number, page: number) {
  //   return axios
  //     .get(baseURL + API.GetMyCollections, {
  //       params: { userId, page },
  //     })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // getUserCollections(userId: number, page: number) {
  //   return axios
  //     .get(baseURL + API.GetUserCollections, {
  //       params: { userId, page },
  //     })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // getTargetCollections(userId: number | string, page: number) {
  //   return axios
  //     .get(baseURL + API.GetTargetCollections, {
  //       params: { userId, page },
  //     })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // getBigCollections() {
  //   return axios
  //     .get(baseURL + API.GetBigCollections)
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // searchItemsByTag(tag: string) {
  //   return axios
  //     .get(baseURL + API.SearchItemsByTag, {
  //       params: { tag },
  //     })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // getLastAddItems() {
  //   return axios
  //     .get(baseURL + API.GetLastAddItems)
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // getAllCollections(userId?: number) {
  //   return axios
  //     .get(baseURL + API.GetAllCollections, {
  //       params: { userId },
  //     })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // getCollectionItems(collectionId: number) {
  //   return axios
  //     .get(baseURL + API.GetCollectionItems, {
  //       params: { collectionId },
  //     })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // getCollection(collectionId: number) {
  //   return axios
  //     .get(baseURL + API.GetCollection, {
  //       params: { collectionId },
  //     })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // getItem(itemId: number, collectionId: number) {
  //   return axios
  //     .get(baseURL + API.GetItem, {
  //       params: { itemId, collectionId },
  //     })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // createCollection(collectionInfo: ICollection) {
  //   const formData = new FormData();
  //
  //   // need to find another way
  //   Object.keys(collectionInfo).forEach((key: string) => {
  //     if (key === 'checkboxKeys') {
  //       formData.append(key, JSON.stringify(collectionInfo[key]));
  //       return;
  //     }
  //     formData.append(key, collectionInfo[key]);
  //   });
  //   return axios
  //     .post(baseURL + API.CreateCollection, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // createItem(itemInfo: IItem) {
  //   const formData = new FormData();
  //
  //   // need to find another way
  //   Object.keys(itemInfo).forEach((key: string) =>
  //     formData.append(key, itemInfo[key])
  //   );
  //
  //   return axios
  //     .post(baseURL + API.CreateItem, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // deleteCollection(collectionId: number) {
  //   return axios
  //     .delete(baseURL + API.DeleteCollection, {
  //       params: {
  //         id: collectionId,
  //       },
  //     })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // deleteItem(itemId: number) {
  //   return axios
  //     .delete(baseURL + API.DeleteItem, {
  //       params: {
  //         itemId,
  //       },
  //     })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // setEditCollection(collectionId: number) {
  //   return axios
  //     .put(baseURL + API.SetEditCollection, { collectionId })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // setEditItems(itemIds: number[]) {
  //   return axios
  //     .put(baseURL + API.SetEditItems, itemIds)
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // getEditItems(collectionId: number) {
  //   return axios
  //     .get(baseURL + API.GetEditItems, {
  //       params: { collectionId },
  //     })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // getTargetUser(userId: number) {
  //   return axios
  //     .get(baseURL + API.GetTargetUser, {
  //       params: { userId },
  //     })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // getEditCollections(userId: string) {
  //   return axios
  //     .get(baseURL + API.GetEditCollections, {
  //       params: { userId },
  //     })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // setDeleteCollection(collectionId: number) {
  //   return axios
  //     .put(baseURL + API.SetDeleteCollection, { collectionId })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // setDeleteItems(itemIds: number[]) {
  //   return axios
  //     .put(baseURL + API.SetDeleteItems, itemIds)
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // getDeleteItems(collectionId: number) {
  //   return axios
  //     .get(baseURL + API.GetDeleteItems, {
  //       params: { collectionId },
  //     })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // getDeleteCollections(userId: string) {
  //   return axios
  //     .get(baseURL + API.GetDeleteCollections, {
  //       params: { userId },
  //     })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // pullOutItem(itemId: number) {
  //   return axios
  //     .put(baseURL + API.PullOutItem, { itemId })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // pullOutCollection(collectionId: number) {
  //   return axios
  //     .put(baseURL + API.PullOutCollection, { collectionId })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // updateCollection(collectionInfo: ICollection) {
  //   const formData = new FormData();
  //
  //   // need to find another way
  //   Object.keys(collectionInfo).forEach((key: string) =>
  //     formData.append(key, collectionInfo[key])
  //   );
  //
  //   return axios
  //     .put(baseURL + API.UpdateCollection, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
  // updateItem(itemInfo: IItem) {
  //   const formData = new FormData();
  //
  //   // need to find another way
  //   Object.keys(itemInfo).forEach((key: string) =>
  //     formData.append(key, itemInfo[key])
  //   );
  //
  //   return axios
  //     .put(baseURL + API.UpdateItem, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     })
  //     .then((response) => response.data)
  //     .catch((error) => logError(error.message));
  // },
};
