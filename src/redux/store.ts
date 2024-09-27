import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/ProductSlice/productSlice";
import { baseApi } from "./api/baseApi";
export const store = configureStore({
  reducer: {
    productSlice: productSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
