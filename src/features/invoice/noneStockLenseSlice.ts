// features/counter/counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FrameModel } from "../../model/FrameModel";

// Define state interface

interface OtherItem {
  name: string;
  price: number;
  id: number;
  buyQty: number;
}
// Initial state

interface FrameState {
  selectedOtherItems: Record<number, OtherItem>; // Store lenses with quantity by ID
}

const initialState: FrameState = {
  selectedOtherItems: {},
};
const noneStockLenseSlice = createSlice({
  name: "invoice_other_Item",
  initialState,
  reducers: {
    // Reducer to add frame by ID
    setotherItem: (state, action: PayloadAction<OtherItem>) => {
      const otherItem = action.payload;
      if (state.selectedOtherItems[otherItem.id]) {
        // If lens already exists, increase buyQty
        state.selectedOtherItems[otherItem.id].buyQty += 1;
        state.selectedOtherItems[otherItem.id].price = otherItem.price;
      } else {
        // If lens is new, set buyQty = 1
        state.selectedOtherItems[otherItem.id] = { ...otherItem, buyQty: 1 };
      }
    },
    removeOtherItem: (state, action: PayloadAction<number>) => {
      const otherItemId = action.payload;
      delete state.selectedOtherItems[otherItemId]; // Remove the lens from the object
    },

    clearOtherItem: (state) => {
      state.selectedOtherItems = {};
    },
  },
});

// Export actions
export const { setotherItem, removeOtherItem, clearOtherItem } =
  noneStockLenseSlice.actions;

// Export reducer
export default noneStockLenseSlice.reducer;
