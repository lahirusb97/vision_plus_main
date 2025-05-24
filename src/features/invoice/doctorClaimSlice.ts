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
  invoice_date: string;
  sales_staff: number;
  invoiceItems: DoctorClaimItem[];
  order_payments: number;
}

interface doctorClaimState {
  doctorClaimPayload: DoctorClaimPayload; // Store lenses with quantity by ID
}

const initialState: doctorClaimState = {
  doctorClaimPayload: {
    invoice_number: "",
    date: "",
    name: "",
    phone_number: "",
    address: "",
    discount: 0,
    sub_total: 0,
    total_price: 0,
    invoice_date: "",
    balance: 0,
    sales_staff: 0,
    invoiceItems: [],
    order_payments: 0,
  },
};
console.log(initialState);
const doctorClaimSlice = createSlice({
  name: "doctor_claim_invoice",
  initialState,
  reducers: {
    // Reducer to add frame by ID
    setDoctorClaim: (state, action: PayloadAction<DoctorClaimPayload>) => {
      state.doctorClaimPayload = action.payload;
    },
    clearDoctorClaim: (state) => {
      state.doctorClaimPayload = {
        invoice_number: "",
        date: "",
        name: "",
        phone_number: "",
        address: "",
        discount: 0,
        sub_total: 0,
        total_price: 0,
        invoice_date: "",
        balance: 0,
        sales_staff: 0,
        invoiceItems: [],
        order_payments: 0,
      };
    },
    setdoctorClaimItem: (state, action: PayloadAction<DoctorClaimItem>) => {
      state.doctorClaimPayload.invoiceItems.push(action.payload);
    },
    removeDoctorClaimItem: (state, action: PayloadAction<number>) => {
      state.doctorClaimPayload.invoiceItems =
        state.doctorClaimPayload.invoiceItems.filter(
          (item) => item.id !== action.payload
        );
    },
  },
});

// Export actions
export const {
  setDoctorClaim,
  clearDoctorClaim,
  setdoctorClaimItem,
  removeDoctorClaimItem,
} = doctorClaimSlice.actions;

// Export reducer
export default doctorClaimSlice.reducer;
