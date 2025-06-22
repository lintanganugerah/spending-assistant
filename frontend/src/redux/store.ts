import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import UserReducer from "./slice/UserSlice";
import AuthReducer from "./slice/AuthSlice";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";

const rootReducer = combineReducers({
  user: UserReducer,
  auth: AuthReducer,
});

const configPersist = {
  key: "root",
  storage,
  whitelist: ["user", "auth"],
};

const persistedReducer = persistReducer(configPersist, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export type RootType = ReturnType<typeof store.getState>;
export type StoreDispatchType = typeof store.dispatch;

export default store;
