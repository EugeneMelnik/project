import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { rootReducer } from './reducers/root-reducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware],
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;

export type AppDispatch = typeof store.dispatch;

export type TypedDispatch = ThunkDispatch<RootState, never, AnyAction>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
