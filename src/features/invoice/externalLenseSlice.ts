// features/counter/counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExternalLenseModel } from "../../model/ExternalLenseModel";

// Define state interface

// Initial state

interface FrameState {
  externalLense: Record<number, ExternalLenseModel>; // Store lenses with quantity by ID
}

const initialState: FrameState = {
  externalLense: {},
};
const externalLenseSlice = createSlice({
  name: "invoice_external_lense",
  initialState,
  reducers: {
    // Reducer to add frame by ID
    setexternalLense: (state, action: PayloadAction<ExternalLenseModel>) => {
      const externalItem = action.payload;
      if (state.externalLense[externalItem.id]) {
        // If lens already exists, increase buyQty
        state.externalLense[externalItem.id].quantity += 1;
        state.externalLense[externalItem.id].subtotal +=
          externalItem.price_per_unit;
      } else {
        // If lens is new, set buyQty = 1
        state.externalLense[externalItem.id] = externalItem;
      }
    },
    removeexternalLense: (state, action: PayloadAction<number>) => {
      const otherItemId = action.payload;
      delete state.externalLense[otherItemId]; // Remove the lens from the object
    },

    clearexternalLense: (state) => {
      state.externalLense = {};
    },
  },
});

// Export actions
export const { setexternalLense, removeexternalLense, clearexternalLense } =
  externalLenseSlice.actions;

// Export reducer
export default externalLenseSlice.reducer;
