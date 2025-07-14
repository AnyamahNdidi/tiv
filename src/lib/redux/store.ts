"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import authReducer from "./slices/authSlices";
import { financeApi } from "../redux/api/financeApi";
import { verificationApi } from "../redux/api/verificationApi";
import { inspectionApi } from "../redux/api/inspectionApi";
import { overviewApi } from "../redux/api/overviewApi";
import { adminUserApi } from "../redux/api/adminUserApi";
import { fi } from "zod/v4/locales";

const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem() {
    return Promise.resolve();
  },
  removeItem() {
    return Promise.resolve();
  },
});

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  [financeApi.reducerPath]: financeApi.reducer,
  [verificationApi.reducerPath]: verificationApi.reducer,
  [inspectionApi.reducerPath]: inspectionApi.reducer,
  [overviewApi.reducerPath]: overviewApi.reducer,
  [adminUserApi.reducerPath]: adminUserApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(
        financeApi.middleware,
        verificationApi.middleware,
        inspectionApi.middleware,
        overviewApi.middleware,
        adminUserApi.middleware
      ),
  });

  setupListeners(store.dispatch);

  return store;
};

export const store = makeStore();
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
