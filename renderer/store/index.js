import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
// import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import createWebStorage from "redux-persist/es/storage/createWebStorage";
import productionReducer from "../redux/productionSlice";
import productReducer from "../redux/productSlice";

export function createPersistStore() {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return {
      getItem() {
        return Promise.resolve(null);
      },
      setItem() {
        return Promise.resolve();
      },
      removeItem() {
        return Promise.resolve();
      },
    };
  }
  return createWebStorage("local");
}

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createPersistStore();

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  productionInfo: productionReducer,
  product: productReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"], // Ignore specific persist actions
        ignoredPaths: ["register"], // Ignore problematic paths
      },
    }).concat(logger),
});

export default store;
