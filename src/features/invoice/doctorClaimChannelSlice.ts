// features/counter/counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DoctorClaimChannelPayload {
  invoice_number: string;
  date: string;
  name: string;
  phone_number: string;
  address: string;
  channel_date: string;
  channel_time: string;
  channeling_fee: number;
  online_transfer: number;
  credit_card: number;
  cash: number;
}

interface doctorClaimState {
  doctorClaimChannelPayload: DoctorClaimChannelPayload | null; // Store lenses with quantity by ID
}

const initialState: doctorClaimState = {
  doctorClaimChannelPayload: null,
};
const doctorClaimChannelSlice = createSlice({
  name: "doctor_claim_channel",
  initialState,
  reducers: {
    // Reducer to add frame by ID
    setDoctorClaimChannel: (
      state,
      action: PayloadAction<DoctorClaimChannelPayload>
    ) => {
      state.doctorClaimChannelPayload = action.payload;
    },
    clearDoctorClaimChannel: (state) => {
      state.doctorClaimChannelPayload = null;
    },
  },
});

// Export actions
export const { setDoctorClaimChannel, clearDoctorClaimChannel } =
  doctorClaimChannelSlice.actions;

// Export reducer
export default doctorClaimChannelSlice.reducer;
