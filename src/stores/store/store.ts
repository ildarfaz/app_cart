import { configureStore } from "@reduxjs/toolkit";
import { shoppingCartApi } from "../api/shoppingCartApi";

export const store = configureStore({
  reducer: {
    [shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shoppingCartApi.middleware),
});
