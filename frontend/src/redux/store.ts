import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import UserReducer from "redux/slice/UserSlice";
import AuthReducer from "redux/slice/AuthSlice";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import { AuthAPI } from "redux/apiQuery/authAPI";

const rootReducer = combineReducers({
  user: UserReducer,
  auth: AuthReducer,
  [AuthAPI.reducerPath]: AuthAPI.reducer,
});

const configPersist = {
  key: "root",
  storage,
  whitelist: ["user", "auth"],
};

const persistedReducer = persistReducer(configPersist, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, //Required by redux-persist
    }).concat(AuthAPI.middleware),
});

export const persistor = persistStore(store);
export type RootStateType = ReturnType<typeof store.getState>;
export type StoreDispatchType = typeof store.dispatch;

export default store;
