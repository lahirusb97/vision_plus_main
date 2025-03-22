// features/counter/counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type validationTypes = "admin" | "user" | null;

interface ValidationState {
  validationType: validationTypes;
  openDialog: boolean;
  userName: string | null;
  adminName: string | null;
  userId: number | null;
  adminId: number | null;
  Validationconfirmed: boolean;
}
type OpenValidationPayload = Pick<ValidationState, "validationType"> & {
  onValidationSuccess?: () => void;
};
type AdminConfirmPayload = Pick<ValidationState, "adminId" | "adminName">;
type UserConfirmPayload = Pick<ValidationState, "userId" | "userName">;

const initialState: ValidationState = {
  validationType: "admin",
  openDialog: false,
  userName: null,
  adminName: null,
  userId: null,
  adminId: null,
  Validationconfirmed: false,
};
const validationDialogSlice = createSlice({
  name: "validation_dialog",
  initialState,
  reducers: {
    // OpenValidation Dialog
    openValidationDialog: (
      state,
      action: PayloadAction<OpenValidationPayload>
    ) => {
      state.validationType = action.payload.validationType;
      state.openDialog = true;
      state.userName = null;
      state.adminName = null;
      state.userId = null;
      state.adminId = null;
      state.Validationconfirmed = false;
    },

    userConfirmed: (state, action: PayloadAction<UserConfirmPayload>) => {
      state.userName = action.payload.userName;
      state.userId = action.payload.userId;
      if (state.validationType === "user") {
        state.Validationconfirmed = true;
      }
    },
    adminConfirmed: (state, action: PayloadAction<AdminConfirmPayload>) => {
      state.adminName = action.payload.adminName;
      state.adminId = action.payload.adminId;
      if (state.validationType === "admin" && state.userId) {
        state.Validationconfirmed = true;
      }
    },
    colseValidationDialog: (state) => {
      state.openDialog = false;
    },
    clearValidationData: (state) => {
      state.validationType = null;
      state.openDialog = false;
      state.userName = null;
      state.adminName = null;
      state.userId = null;
      state.adminId = null;
      state.Validationconfirmed = false;
    },
  },
});

// Export actions
export const {
  openValidationDialog,
  userConfirmed,
  adminConfirmed,
  colseValidationDialog,
  clearValidationData,
} = validationDialogSlice.actions;

// Export reducer
export default validationDialogSlice.reducer;
