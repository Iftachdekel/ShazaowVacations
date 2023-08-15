import {configureStore,ThunkAction,Action,combineReducers,} from "@reduxjs/toolkit";
  import userSlice from "../features/userSlice";
  import storage from "redux-persist/lib/storage";
  import { persistReducer, persistStore } from "redux-persist";
  
  const rootPersistConfig = {
    key: "root",
    storage,
  };
  
  const rootReducer = combineReducers({
    user: userSlice,
  });
  
  const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
  
  export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
  
  export const persistor = persistStore(store);
  export type AppDispatch = typeof store.dispatch;
  export type RootState = ReturnType<typeof store.getState>;
  export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
  >;
  