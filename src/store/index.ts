import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice from "./slices/authSlice";
import uiSlice from "./slices/uiSlice";
import companyProfileSlice from "./slices/companyProfileSlice";
import { serviceMiddlewares, serviceReducers } from "../services";

const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    companyProfile: companyProfileSlice,
    ...serviceReducers,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(serviceMiddlewares),
});

setupListeners(store.dispatch);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
