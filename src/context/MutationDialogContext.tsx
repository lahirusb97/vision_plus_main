// components/context/MutationDialogContext.tsx
import React, { createContext, useContext, useState } from "react";

type OperationType = "delete" | "put" | "patch";

interface MutationDialogState {
  open: boolean;
  itemName: string;
  operation: OperationType;
  onConfirm: () => void | Promise<void>;
}

interface MutationDialogContextType {
  state: MutationDialogState;
  openMutationDialog: (
    itemName: string,
    operation: OperationType,
    onConfirm: () => void | Promise<void>
  ) => void;
  closeMutationDialog: () => void;
}

const MutationDialogContext = createContext<MutationDialogContextType>({
  state: {
    open: false,
    itemName: "",
    operation: "delete",
    onConfirm: () => {},
  },
  openMutationDialog: () => {},
  closeMutationDialog: () => {},
});

export const MutationDialogProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [state, setState] = useState<MutationDialogState>({
    open: false,
    itemName: "",
    operation: "delete",
    onConfirm: () => {},
  });

  const openMutationDialog = (
    itemName: string,
    operation: OperationType,
    onConfirm: () => void | Promise<void>
  ) => {
    setState({ open: true, itemName, operation, onConfirm });
  };
  const closeMutationDialog = () => {
    setState({
      open: false,
      itemName: "",
      operation: "delete",
      onConfirm: () => {},
    });
  };

  return (
    <MutationDialogContext.Provider
      value={{ state, openMutationDialog, closeMutationDialog }}
    >
      {children}
    </MutationDialogContext.Provider>
  );
};

export const useMutationDialog = () => {
  const context = useContext(MutationDialogContext);
  if (!context) {
    throw new Error(
      "useMutationDialog must be used within a MutationDialogProvider"
    );
  }
  return context;
};
