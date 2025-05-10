import { configureStore } from "@reduxjs/toolkit";
import frameFilterSlice from "../features/invoice/frameFilterSlice";
import lenseFilterSlice from "../features/invoice/lenseFilterSlice";
import stockDrawerSlice from "../features/invoice/stockDrawerSlice";
import otherItemSlice from "../features/invoice/otherItemSlice";
import externalLenseSlice from "../features/invoice/externalLenseSlice";
import doctorClaimSlice from "../features/invoice/doctorClaimSlice";
import doctorClaimChannelSlice from "../features/invoice/doctorClaimChannelSlice";
export const store = configureStore({
  reducer: {
    invoice_frame_filer: frameFilterSlice,
    invoice_lense_filer: lenseFilterSlice,
    stock_drawer: stockDrawerSlice,
    invoice_other_Item: otherItemSlice,
    invoice_external_lense: externalLenseSlice,
    doctor_claim_invoice: doctorClaimSlice,
    doctor_claim_channel: doctorClaimChannelSlice,
  },
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
