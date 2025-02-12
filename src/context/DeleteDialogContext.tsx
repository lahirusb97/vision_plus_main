import React, { createContext, useContext, useState } from "react";

interface DeleteDialogState {
  open: boolean;
  path: string;
  itemName?: string;
  refresh?: () => void;
}

interface DeleteDialogContextType {
  state: DeleteDialogState;
  openDialog: (path: string, itemName?: string, refresh?: () => void) => void;
  closeDialog: () => void;
}

const DeleteDialogContext = createContext<DeleteDialogContextType | undefined>(
  undefined
);

export const DeleteDialogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<DeleteDialogState>({
    open: false,
    path: "",
    itemName: undefined,
    refresh: undefined,
  });

  const openDialog = (
    path: string,
    itemName?: string,
    refresh?: () => void
  ) => {
    setState({ open: true, path, itemName, refresh });
  };

  const closeDialog = () => {
    setState({
      open: false,
      path: "",
      itemName: undefined,
      refresh: undefined,
    });
  };

  return (
    <DeleteDialogContext.Provider value={{ state, openDialog, closeDialog }}>
      {children}
    </DeleteDialogContext.Provider>
  );
};

export const useDeleteDialog = () => {
  const context = useContext(DeleteDialogContext);
  if (!context) {
    throw new Error(
      "useDeleteDialog must be used within a DeleteDialogProvider"
    );
  }
  return context;
};
