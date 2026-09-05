import { configureStore } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { ThunkDispatch } from 'redux-thunk';
import adminReducer from './reducers/admin-reducer';
import authReducer from './reducers/auth-reducer';
import collectionReducer from './reducers/collection-reducer';
import collectionsReducer from './reducers/collections-reducer';
import homeReducer from './reducers/home-reducer';
import searchReducer from './reducers/search-reducer';
import userReducer from './reducers/user-reducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    home: homeReducer,
    collection: collectionReducer,
    collections: collectionsReducer,
    admin: adminReducer,
    search: searchReducer,
  },
  middleware: [thunkMiddleware],
});

export type AppStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = ThunkDispatch<AppStateType, unknown, AnyAction>;

declare global {
  interface Window {
    store: typeof store;
  }
}
window.store = store;

export default store;
