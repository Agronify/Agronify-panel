import { configureStore } from "@reduxjs/toolkit";
import { api } from "./service/api";
import { rtkQueryErrorLogger } from "./service/error-middleware";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer, persistStore } from "redux-persist";
import { authSlice } from "./slices/auth";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist/es/constants";
import { globalSlice } from "./slices/global";

const persistConfig = {
  key: "root",
  storage,
};

const authPersist = persistReducer(persistConfig, authSlice.reducer);
const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authPersist,
    global: globalSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(api.middleware)
      .concat(rtkQueryErrorLogger),
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
export const persistor = persistStore(store);
