// features/counter/counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ExternalLenseFilterModel {
  external_lens_id: number;
  buyQty: number;
  price_per_unit: number;
  subtotal: number;
  note: string | null;
  external_lens_details: {
    type_name: string;
    coating_name: string;
    brand_name: string;
  };
}
function extractLenseDetail(lense: ExternalLenseFilterModel) {
  return {
    note: lense.note,
    type_name: lense.external_lens_details?.type_name,
    coating_name: lense.external_lens_details?.coating_name,
    brand_name: lense.external_lens_details?.brand_name,
  };
}
interface FrameState {
  externalLenseList: Record<number, ExternalLenseFilterModel>; // Store lenses with quantity by ID
  externalLenseSubTotal: number;
}

const initialState: FrameState = {
  externalLenseList: {},
  externalLenseSubTotal: 0,
};
const externalLenseSlice = createSlice({
  name: "invoice_external_lense",
  initialState,
  reducers: {
    // Reducer to add frame by ID
    setexternalLense: (
      state,
      action: PayloadAction<ExternalLenseFilterModel>
    ) => {
      const externalItem = action.payload;
      if (state.externalLenseList[externalItem.external_lens_id]) {
        // If lens already exists, increase buyQty
        state.externalLenseList[externalItem.external_lens_id].buyQty +=
          externalItem.buyQty;

        state.externalLenseList[externalItem.external_lens_id].price_per_unit =
          externalItem.price_per_unit;
        state.externalLenseSubTotal += externalItem.subtotal; // Update subtotal
        //lense Details
        state.externalLenseList[
          externalItem.external_lens_id
        ].external_lens_details = extractLenseDetail(externalItem);
      } else {
        // If lens is new, set buyQty = 1
        state.externalLenseList[externalItem.external_lens_id] = externalItem;
        state.externalLenseSubTotal += externalItem.subtotal; // Update subtotal
      }
    },
    externalLenseQtyPlus: (state, action: PayloadAction<number>) => {
      //add +1 qty
      const externlLenseId = action.payload;
      const externlLense = state.externalLenseList[externlLenseId];
      if (externlLense) {
        state.externalLenseList[externlLenseId].buyQty += 1;
        state.externalLenseSubTotal += externlLense.price_per_unit; // plus subtotal
        state.externalLenseList[externlLenseId].subtotal +=
          externlLense.price_per_unit;
      }
    },
    externalLenseQtyminus: (state, action: PayloadAction<number>) => {
      //remove -1 qty
      const externlLenseId = action.payload;
      const externlLense = state.externalLenseList[externlLenseId];
      if (externlLense) {
        if (externlLense.buyQty > 1) {
          state.externalLenseList[externlLenseId].buyQty -= 1;
          state.externalLenseSubTotal -= externlLense.price_per_unit; // mius subtotal
          state.externalLenseList[externlLenseId].subtotal -=
            externlLense.price_per_unit;
        }
      }
    },
    removeexternalLense: (state, action: PayloadAction<number>) => {
      const externlLenseId = action.payload;

      const lense = state.externalLenseList[externlLenseId];
      if (lense) {
        state.externalLenseSubTotal -= lense.subtotal;
        delete state.externalLenseList[externlLenseId];
      }
    },

    clearexternalLense: (state) => {
      state.externalLenseList = {};
      state.externalLenseSubTotal = 0; // Reset subtotal
    },
  },
});

// Export actions
export const {
  setexternalLense,
  removeexternalLense,
  clearexternalLense,
  externalLenseQtyPlus,
  externalLenseQtyminus,
} = externalLenseSlice.actions;

// Export reducer
export default externalLenseSlice.reducer;
