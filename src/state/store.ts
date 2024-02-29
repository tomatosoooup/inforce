import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./productsSlice";
import commentsSlice from "./commentsSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice,
    comments: commentsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
