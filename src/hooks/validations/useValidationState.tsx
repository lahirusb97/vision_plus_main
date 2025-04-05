import { useState } from "react";

type ValidationTypes = "update" | "create" | null;

export const useValidationState = () => {
  const [validationState, setValidationState] = useState({
    openValidationDialog: false,
    validationType: null as ValidationTypes,
    apiCallFunction: null as ((verifiedUserId: number) => Promise<void>) | null,
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
    apiCall: (verifiedUserId: number) => Promise<void>
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
