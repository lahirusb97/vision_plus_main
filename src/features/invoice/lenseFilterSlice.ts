// features/counter/counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import toast from "react-hot-toast";
import { Power } from "../../model/LenseModel";

export interface LenseFilterModel {
  lense_id: number;
  buyQty: number;
  avilable_qty: number;
  price_per_unit: number;
  subtotal: number;
  lense_detail: {
    type_name: string;
    coating_name: string;
    brand_name: string;
    powers: Power[];
  };
}
interface LenseState {
  selectedLensesList: Record<number, LenseFilterModel>; // Store lenses with quantity by ID
  lenseSubTotal: number;
}

// Initial state
const initialState: LenseState = {
  selectedLensesList: {},
  lenseSubTotal: 0,
};
function extractLenseDetail(lense: LenseFilterModel) {
  return {
    type_name: lense.lense_detail?.type_name,
    coating_name: lense.lense_detail?.coating_name,
    brand_name: lense.lense_detail?.brand_name,
    powers: lense.lense_detail?.powers,
  };
}
const lenseFilterSlice = createSlice({
  name: "invoice_lense_filter",
  initialState,
  reducers: {
    // Add or update a LenseModel in the store
    setLense: (state, action: PayloadAction<LenseFilterModel>) => {
      const lense = action.payload;
      if (state.selectedLensesList[lense.lense_id]) {
        // if (lense.avilable_qty >= lense.buyQty) {
        state.selectedLensesList[lense.lense_id].buyQty += lense.buyQty;
        state.selectedLensesList[lense.lense_id].avilable_qty =
          lense.avilable_qty;
        state.selectedLensesList[lense.lense_id].price_per_unit =
          lense.price_per_unit;
        //handle edge case of total
        state.lenseSubTotal -=
          state.selectedLensesList[lense.lense_id].subtotal;
        state.selectedLensesList[lense.lense_id].subtotal =
          state.selectedLensesList[lense.lense_id].buyQty *
          lense.price_per_unit;
        //set sub total
        state.lenseSubTotal +=
          state.selectedLensesList[lense.lense_id].subtotal;
        //lense Details
        state.selectedLensesList[lense.lense_id].lense_detail =
          extractLenseDetail(lense);
        // } else {
        //   toast.error("Not enough stock available");
        // }
        console.log(state.selectedLensesList);
      } else {
        // if (lense.avilable_qty >= lense.buyQty) {
        state.selectedLensesList[lense.lense_id] = lense;
        state.lenseSubTotal += lense.subtotal; // Update subtotal
        // } else {
        //   toast.error("Not enough stock available");
        // }
      }
    },

    // Remove a LenseModel by ID
    removeLense: (state, action: PayloadAction<number>) => {
      const lenseId = action.payload;

      const lense = state.selectedLensesList[lenseId];
      if (lense) {
        state.lenseSubTotal -= lense.subtotal;
        delete state.selectedLensesList[lenseId];
      }
    },

    updateLenseQty: (
      state,
      action: PayloadAction<{ lense_id: number; buyQty: number }>
    ) => {
      const { lense_id, buyQty } = action.payload;
      const lense = state.selectedLensesList[lense_id];

      if (lense) {
        state.lenseSubTotal -= lense.subtotal; // Reset subtotal
        const subtotalDifference = lense.price_per_unit * buyQty;
        state.selectedLensesList[lense_id].subtotal = subtotalDifference; // Update subtotal
        state.lenseSubTotal += subtotalDifference; // Update total subtotal
      }
    },
    lenseQtyPlus: (state, action: PayloadAction<number>) => {
      const lenseId = action.payload;
      const lense = state.selectedLensesList[lenseId];
      if (lense) {
        // if (lense.avilable_qty >= lense.buyQty) {
        state.selectedLensesList[lenseId].buyQty += 1;
        state.lenseSubTotal += lense.price_per_unit; // plus subtotal
        state.selectedLensesList[lenseId].subtotal += lense.price_per_unit;
        // } else {
        //   toast.error("Not enough stock available");
        // }
      }
    },
    lenseQtyminus: (state, action: PayloadAction<number>) => {
      const lenseId = action.payload;
      const lense = state.selectedLensesList[lenseId];
      if (lense) {
        // if (lense.avilable_qty >= lense.buyQty) {
        if (lense.buyQty > 1) {
          state.selectedLensesList[lenseId].buyQty -= 1;
          state.lenseSubTotal -= lense.price_per_unit; // mius subtotal
          state.selectedLensesList[lenseId].subtotal -= lense.price_per_unit;
        }
        // } else {
        //   toast.error("Not enough stock available");
        // }
      }
    },
    // Clear all selected lenses
    clearLenses: (state) => {
      state.selectedLensesList = {};
      state.lenseSubTotal = 0; // Reset subtotal
    },
  },
});

// Export actions
export const {
  setLense,
  removeLense,
  updateLenseQty,
  lenseQtyPlus,
  lenseQtyminus,
  clearLenses,
} = lenseFilterSlice.actions;

// Export reducer
export default lenseFilterSlice.reducer;
