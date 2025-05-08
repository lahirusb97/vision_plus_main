// utils/toast.ts
import { toast } from "react-hot-toast";

const success = (message: string) => toast.success(message);
const error = (message: string) => toast.error(message);
const loading = (message: string) => toast.loading(message);

// Custom warning toast
const warning = (message: string) =>
  toast(message, {
    icon: "⚠️",
    style: {
      background: "#fef3c7",
      color: "#92400e",
    },
  });

// Optional: dismiss toast by ID
const dismiss = (toastId?: string) => toast.dismiss(toastId);

export const CustomToast = {
  success,
  error,
  warning,
  loading,
  dismiss,
};
