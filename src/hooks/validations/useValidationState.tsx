import { useState } from "react";
type validationTypes = "admin" | "user" | "both" | null;

export interface ValidationStateModel {
  validationType: validationTypes;
  openValidationDialog: boolean;
  apiCallFunction: (() => Promise<void>) | null;
}

export const useValidationState = () => {
  const [validationState, setValidationState] = useState<ValidationStateModel>({
    openValidationDialog: false,
    validationType: null,
    apiCallFunction: null,
  });

  const resetValidation = () => {
    setValidationState({
      openValidationDialog: false,
      validationType: null,
      apiCallFunction: null,
    });
  };

  return { validationState, setValidationState, resetValidation };
};
