// features/counter/counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FrameModel } from "../../model/FrameModel";
import { RootState } from "../../store/store";

// Define state interface
interface FrameList {
  selectedFrameList: FrameModel[];
}

// Initial state
const initialState: FrameList = {
  selectedFrameList: [],
};

const frameFilterSlice = createSlice({
  name: "invoice_frame_filer",
  initialState,
  reducers: {
    // Reducer to add frame by ID
    addFrame: (state, action: PayloadAction<FrameModel>) => {
      const frame = action.payload;
      state.selectedFrameList.push(frame);
    },

    // Reducer to remove frame by ID
    removeFrame: (state, action: PayloadAction<number>) => {
      const frameId = action.payload;
      const index = state.selectedFrameList.findIndex(
        (frame) => frame.id === frameId
      );
      if (index !== -1) {
        state.selectedFrameList.splice(index, 1);
      }
    },
  },
});

// Export actions
export const { addFrame, removeFrame } = frameFilterSlice.actions;

// Export reducer
export default frameFilterSlice.reducer;
