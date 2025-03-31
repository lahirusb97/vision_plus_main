// features/counter/counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LenseWithQty } from "../../model/LenseModel";

// Extend LenseModel to include buyQty

// Define state interface
interface LenseState {
  selectedLenses: Record<number, LenseWithQty>; // Store lenses with quantity by ID
}

// Initial state
const initialState: LenseState = {
  selectedLenses: {},
};

const lenseFilterSlice = createSlice({
  name: "invoice_lense_filter",
  initialState,
  reducers: {
    // Add or update a LenseModel in the store
    setLense: (state, action: PayloadAction<LenseWithQty>) => {
      const lense = action.payload;
      console.log(lense);

      if (state.selectedLenses[lense.id]) {
        // If lens already exists, increase buyQty
        state.selectedLenses[lense.id].buyQty += 1;
        state.selectedLenses[lense.id].price = lense.price;
      } else {
        // If lens is new, set buyQty = 1
        state.selectedLenses[lense.id] = {
          ...lense,
          buyQty: 1,
          lenseSide: lense.lenseSide,
        };
      }
    },

    // Remove a LenseModel by ID
    removeLense: (state, action: PayloadAction<number>) => {
      const lenseId = action.payload;
      delete state.selectedLenses[lenseId]; // Remove the lens from the object
    },

    // Decrease buyQty or remove if buyQty reaches 1
    decrementLenseQty: (state, action: PayloadAction<number>) => {
      const lenseId = action.payload;
      if (state.selectedLenses[lenseId]) {
        if (state.selectedLenses[lenseId].buyQty > 1) {
          state.selectedLenses[lenseId].buyQty -= 1;
        } else {
          delete state.selectedLenses[lenseId]; // Remove when qty reaches 0
        }
      }
    },

    // Clear all selected lenses
    clearLenses: (state) => {
      state.selectedLenses = {};
    },
  },
});

// Export actions
export const { setLense, removeLense, decrementLenseQty, clearLenses } =
  lenseFilterSlice.actions;

// Export reducer
export default lenseFilterSlice.reducer;
