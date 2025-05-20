import React, { createContext, useContext, useState, ReactNode } from "react";

interface ReminderDialogContextType {
  showReminder: () => void;
  closeReminder: () => void;
  closeReminderAndGoBack: () => void;
  isOpen: boolean;
}

const ReminderDialogContext = createContext<
  ReminderDialogContextType | undefined
>(undefined);

export const useReminderDialog = () => {
  const ctx = useContext(ReminderDialogContext);
  if (!ctx)
    throw new Error(
      "useReminderDialog must be used within ReminderDialogProvider"
    );
  return ctx;
};

export const ReminderDialogProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [dialogState, setDialogState] = useState({
    open: false,
  });

  const showReminder = () => {
    console.log("showReminder CALLED!");
    setDialogState({ open: true });
  };

  const closeReminder = () => {
    setDialogState({
      open: false,
    });
  };

  const closeReminderAndGoBack = () => {
    setDialogState({
      open: false,
    });
    window.location.href = "/";
  };

  return (
    <ReminderDialogContext.Provider
      value={{
        showReminder,
        closeReminder,
        closeReminderAndGoBack,
        isOpen: dialogState.open,
      }}
    >
      {children}
    </ReminderDialogContext.Provider>
  );
};
