import React, { createContext, useContext, useState } from "react";

type deleteType = "Permanantly Delete" | "Deactivate";
interface DeleteDialogState {
  open: boolean;
  path: string;
  itemName: string;
  deleteType: deleteType;
  refresh: () => void | Promise<void>;
}

interface DeleteDialogContextType {
  state: DeleteDialogState;
  openDialog: (
    path: string,
    itemName: string,
    deleteType: deleteType,
    refresh: () => void | Promise<void>
  ) => void;
  closeDialog: () => void;
}

const DeleteDialogContext = createContext<DeleteDialogContextType>({
  state: {
    open: false,
    path: "",
    itemName: "",
    deleteType: "Permanantly Delete",
    refresh: () => {},
  },
  openDialog: () => {},
  closeDialog: () => {},
});

export const DeleteDialogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<DeleteDialogState>({
    open: false,
    path: "",
    itemName: "",
    deleteType: "Permanantly Delete",
    refresh: () => {},
  });

  const openDialog = (
    path: string,
    itemName: string,
    deleteType: deleteType,
    refresh: () => void
  ) => {
    setState({ open: true, path, itemName, deleteType, refresh });
  };

  const closeDialog = () => {
    setState({
      open: false,
      path: "",
      itemName: "",
      deleteType: "Permanantly Delete",
      refresh: () => {},
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
