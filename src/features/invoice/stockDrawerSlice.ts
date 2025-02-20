import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DrawerState {
  stockDrawerOpen: boolean;
  stockDrawerType: string;
}

// Initial state
const initialState: DrawerState = {
  stockDrawerOpen: false,
  stockDrawerType: "",
};

const stockDrawerSlice = createSlice({
  name: "stock_drawer",
  initialState,
  reducers: {
    // Add or update a LenseModel in the store
    openStockDrawer: (state, action: PayloadAction<string>) => {
      const drawerType = action.payload;
      state.stockDrawerOpen = true;
      state.stockDrawerType = drawerType;
    },

    closeStockDrawer: (state) => {
      state.stockDrawerOpen = false;
      state.stockDrawerType = "";
    },
  },
});

// Export actions
export const { openStockDrawer, closeStockDrawer } = stockDrawerSlice.actions;

// Export reducer
export default stockDrawerSlice.reducer;
