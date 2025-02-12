// features/counter/counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FrameModel } from "../../model/FrameModel";

// Define state interface

interface FrameWithQty extends FrameModel {
  buyQty: number;
}
// Initial state

interface FrameState {
  selectedFrameList: Record<number, FrameWithQty>; // Store lenses with quantity by ID
}

const initialState: FrameState = {
  selectedFrameList: {},
};
const frameFilterSlice = createSlice({
  name: "invoice_frame_filer",
  initialState,
  reducers: {
    // Reducer to add frame by ID
    setFrame: (state, action: PayloadAction<FrameWithQty>) => {
      const frame = action.payload;
      if (state.selectedFrameList[frame.id]) {
        // If lens already exists, increase buyQty
        state.selectedFrameList[frame.id].buyQty += 1;
        state.selectedFrameList[frame.id].price = frame.price;
      } else {
        // If lens is new, set buyQty = 1
        state.selectedFrameList[frame.id] = { ...frame, buyQty: 1 };
      }
    },
    removeFrame: (state, action: PayloadAction<number>) => {
      const frameId = action.payload;
      delete state.selectedFrameList[frameId]; // Remove the lens from the object
    },

    clearFrame: (state) => {
      state.selectedFrameList = {};
    },
  },
});

// Export actions
export const { setFrame, removeFrame, clearFrame } = frameFilterSlice.actions;

// Export reducer
export default frameFilterSlice.reducer;
