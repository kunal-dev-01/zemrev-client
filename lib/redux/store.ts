// src/lib/redux/store.ts

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { baseApi } from '@/lib/baseApi/base.api';
import authReducer from '@/services/authService/auth.slice';
import userReducer from '@/services/userService/user.slice';
import paymentReducer from '@/services/paymentService/payment.slice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth'], // Only persist auth state
  blacklist: ['api', 'payment', 'user', 'credit'],
};

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
  user: userReducer,
  payment: paymentReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;