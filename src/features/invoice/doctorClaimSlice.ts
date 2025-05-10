// features/counter/counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DoctorClaimItem {
  id: number;
  quantity: number;
  price_per_unit: number;
  subtotal: number;
  details: string;
}
export interface DoctorClaimPayload {
  invoice_number: string;
  date: string;
  name: string;
  phone_number: string;
  address: string;
  discount: number;
  sub_total: number;
  total_price: number;
  balance: number;
  sales_staff: number;
  invoiceItems: DoctorClaimItem[];
  order_payments: number;
}

interface doctorClaimState {
  doctorClaimPayload: DoctorClaimPayload | null; // Store lenses with quantity by ID
}

const initialState: doctorClaimState = {
  doctorClaimPayload: null,
};
const doctorClaimSlice = createSlice({
  name: "doctor_claim_invoice",
  initialState,
  reducers: {
    // Reducer to add frame by ID
    setDoctorClaim: (state, action: PayloadAction<DoctorClaimPayload>) => {
      state.doctorClaimPayload = action.payload;
    },
    clearDoctorClaim: (state) => {
      state.doctorClaimPayload = null;
    },
  },
});

// Export actions
export const { setDoctorClaim, clearDoctorClaim } = doctorClaimSlice.actions;

// Export reducer
export default doctorClaimSlice.reducer;
