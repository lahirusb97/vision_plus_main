import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RefractionDetailModel } from "../../model/RefractionDetailModel";

type DrawerType =
  | "frame"
  | "lense"
  | "none_stock_lense"
  | "doctor_claim"
  | null;

interface BaseStockDrawerPayload {
  stockDrawerType: DrawerType;
}

interface FrameStockDrawerPayload extends BaseStockDrawerPayload {
  stockDrawerType: "frame";
  refractionDetail: null;
}

interface LenseStockDrawerPayload extends BaseStockDrawerPayload {
  stockDrawerType: "lense";
  refractionDetail: RefractionDetailModel;
}

interface NoneStockLensePayload extends BaseStockDrawerPayload {
  stockDrawerType: "none_stock_lense";
  refractionDetail: null;
}

interface DoctorClaimPayload extends BaseStockDrawerPayload {
  stockDrawerType: "doctor_claim";
  refractionDetail: null;
}

// Union type that combines all possible payloads
type StockDrawerPayload =
  | FrameStockDrawerPayload
  | LenseStockDrawerPayload
  | NoneStockLensePayload
  | DoctorClaimPayload;

interface StockDrawerStateInit {
  stockDrawerOpen: boolean;
  stockDrawerType: DrawerType;
  refractionDetail: null | RefractionDetailModel;
}
// Initial state
const initialState: StockDrawerStateInit = {
  stockDrawerOpen: false,
  stockDrawerType: null,
  refractionDetail: null,
};

const stockDrawerSlice = createSlice({
  name: "stock_drawer",
  initialState,
  reducers: {
    // Add or update a LenseModel in the store
    openStockDrawer: (state, action: PayloadAction<StockDrawerPayload>) => {
      const { stockDrawerType, refractionDetail } = action.payload;
      state.stockDrawerOpen = true;
      state.stockDrawerType = stockDrawerType;
      if (stockDrawerType === "lense") {
        if (refractionDetail) {
          state.refractionDetail = refractionDetail;
        } else {
          state.refractionDetail = null;
        }
      } else {
        state.refractionDetail = null;
      }
    },
    openManualLense: (state) => {
      state.stockDrawerOpen = true;
      state.stockDrawerType = "lense";
      state.refractionDetail = null;
    },
    closeStockDrawer: (state) => {
      state.stockDrawerOpen = false;
      state.stockDrawerType = null;
      state.refractionDetail = null;
    },
  },
});

// Export actions
export const { openStockDrawer, closeStockDrawer, openManualLense } =
  stockDrawerSlice.actions;

// Export reducer
export default stockDrawerSlice.reducer;
