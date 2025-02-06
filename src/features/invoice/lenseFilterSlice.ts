// features/counter/counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LenseModel } from "../../model/LenseModel";

// Define state interface
interface LenseList {
  selectedLenseList: LenseModel[];
}

// Initial state
const initialState: LenseList = {
  selectedLenseList: [],
};

const lenseFilterSlice = createSlice({
  name: "invoice_lense_filer",
  initialState,
  reducers: {
    // Reducer to add lense by ID
    addLense: (state, action: PayloadAction<LenseModel>) => {
      const lense = action.payload;
      state.selectedLenseList.push(lense);
    },

    // Reducer to remove lense by ID
    removeLense: (state, action: PayloadAction<number>) => {
      const lenseId = action.payload;
      const index = state.selectedLenseList.findIndex(
        (lense) => lense.id === lenseId
      );
      if (index !== -1) {
        state.selectedLenseList.splice(index, 1);
      }
    },
  },
});

// Export actions
export const { addLense, removeLense } = lenseFilterSlice.actions;

// Export reducer
export default lenseFilterSlice.reducer;
