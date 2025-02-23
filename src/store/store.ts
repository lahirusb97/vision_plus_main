import { configureStore } from "@reduxjs/toolkit";
import frameFilterSlice from "../features/invoice/frameFilterSlice";
import lenseFilterSlice from "../features/invoice/lenseFilterSlice";
import stockDrawerSlice from "../features/invoice/stockDrawerSlice";
import otherItemSlice from "../features/invoice/otherItemSlice";

export const store = configureStore({
  reducer: {
    invoice_frame_filer: frameFilterSlice,
    invoice_lense_filer: lenseFilterSlice,
    stock_drawer: stockDrawerSlice,
    invoice_other_Item: otherItemSlice,
  },
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
