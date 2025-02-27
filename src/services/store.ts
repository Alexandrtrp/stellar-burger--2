import { configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { burgerReducer } from './burgerSlice';
import { authReducer } from './authSlice';

// const rootReducer = () => {
//   burgerReducer;
// }; // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: {
    burgers: burgerReducer,
    auth: authReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
