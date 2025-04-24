// features/counter/counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SizeType, SpeciesType } from "../../model/FrameModel";
import toast from "react-hot-toast";

// Define state interface

export interface FrameFilterModel {
  frame_id: number;
  buyQty: number;
  avilable_qty: number;
  price_per_unit: number;
  subtotal: number;
  frame_detail: {
    brand_name: string;
    code_name: string;
    color_name: string;
    size: SizeType;
    species: SpeciesType;
  };
}
// Initial state
function extractFrameDetail(frame: FrameFilterModel) {
  return {
    brand_name: frame.frame_detail?.brand_name,
    code_name: frame.frame_detail?.code_name,
    color_name: frame.frame_detail?.color_name,
    size: frame.frame_detail?.size,
    species: frame.frame_detail?.species,
  };
}

interface FrameState {
  selectedFrameList: Record<number, FrameFilterModel>; // Store lenses with quantity by ID
  framesubTotal: number;
}

const initialState: FrameState = {
  selectedFrameList: {},
  framesubTotal: 0,
};
const frameFilterSlice = createSlice({
  name: "invoice_frame_filer",
  initialState,
  reducers: {
    // Reducer to add frame by ID
    setFrame: (state, action: PayloadAction<FrameFilterModel>) => {
      const frame = action.payload;
      if (state.selectedFrameList[frame.frame_id]) {
        // if (frame.avilable_qty >= frame.buyQty) {
        // If frame already exists, increase buyQty
        state.selectedFrameList[frame.frame_id].buyQty += frame.buyQty;
        state.selectedFrameList[frame.frame_id].avilable_qty =
          frame.avilable_qty;
        state.selectedFrameList[frame.frame_id].price_per_unit =
          frame.price_per_unit;
        state.framesubTotal += frame.subtotal; // Update subtotal
        //Frame Details
        state.selectedFrameList[frame.frame_id].frame_detail =
          extractFrameDetail(frame);
        // } else {
        //   toast.error("Not enough stock available");
        // }
      } else {
        // If lens is new, set data
        // if (frame.avilable_qty >= frame.buyQty) {
        state.selectedFrameList[frame.frame_id] = frame;
        state.framesubTotal += frame.subtotal; // Update subtotal
        // } else {
        //   toast.error("Not enough stock available");
        // }
      }
    },
    removeFrame: (state, action: PayloadAction<number>) => {
      const frameId = action.payload;
      const frame = state.selectedFrameList[frameId];
      if (frame) {
        state.framesubTotal -= frame.subtotal;
        delete state.selectedFrameList[frameId];
      }
      // Update subtotal
    },
    updateFrameQty: (
      state,
      action: PayloadAction<{ frame_id: number; buyQty: number }>
    ) => {
      const { frame_id, buyQty } = action.payload;
      const frame = state.selectedFrameList[frame_id];

      if (frame) {
        state.framesubTotal -= frame.subtotal; // Reset subtotal
        const subtotalDifference = frame.price_per_unit * buyQty;
        state.selectedFrameList[frame_id].subtotal = subtotalDifference; // Update subtotal
        state.framesubTotal += subtotalDifference; // Update total subtotal
      }
    },
    frameQtyPlus: (state, action: PayloadAction<number>) => {
      const frameId = action.payload;
      const frame = state.selectedFrameList[frameId];
      if (frame) {
        // if (frame.avilable_qty >= frame.buyQty) {
        state.selectedFrameList[frameId].buyQty += 1;
        state.framesubTotal += frame.price_per_unit; // plus subtotal
        state.selectedFrameList[frameId].subtotal += frame.price_per_unit;
        // } else {
        //   toast.error("Not enough stock available");
        // }
      }
    },
    frameQtyminus: (state, action: PayloadAction<number>) => {
      const frameId = action.payload;
      const frame = state.selectedFrameList[frameId];
      if (frame) {
        // if (frame.avilable_qty >= frame.buyQty) {
        if (frame.buyQty > 1) {
          state.selectedFrameList[frameId].buyQty -= 1;
          state.framesubTotal -= frame.price_per_unit; // mius subtotal
          state.selectedFrameList[frameId].subtotal -= frame.price_per_unit;
        }
        // } else {
        //   toast.error("Not enough stock available");
        // }
      }
    },
    clearFrame: (state) => {
      state.selectedFrameList = {};
      state.framesubTotal = 0; // Reset subtotal
    },
  },
});

// Export actions
export const {
  setFrame,
  removeFrame,
  clearFrame,
  updateFrameQty,
  frameQtyPlus,
  frameQtyminus,
} = frameFilterSlice.actions;

// Export reducer
export default frameFilterSlice.reducer;
