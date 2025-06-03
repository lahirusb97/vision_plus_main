import { useState } from "react";

type ValidationTypes = "update" | "create" | null;

type UpdateParams = { userId: number; adminId: number };
type CreateParams = { userId: number };

type ApiCallFunction =
  | ((params: UpdateParams) => Promise<void>)
  | ((params: CreateParams) => Promise<void>);

export const useValidationState = () => {
  const [validationState, setValidationState] = useState({
    openValidationDialog: false,
    validationType: null as ValidationTypes,
    apiCallFunction: null as ApiCallFunction | null,
  });

  const resetValidation = () => {
    setValidationState({
      openValidationDialog: false,
      validationType: null,
      apiCallFunction: null,
    });
  };

  const prepareValidation = (
    type: ValidationTypes,
    apiCall: ApiCallFunction
  ) => {
    setValidationState({
      validationType: type,
      openValidationDialog: true,
      apiCallFunction: apiCall,
    });
  };

  return {
    validationState,
    prepareValidation,
    resetValidation,
  };
};
