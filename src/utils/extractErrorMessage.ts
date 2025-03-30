import { AxiosError, isAxiosError } from "axios";
import toast from "react-hot-toast";
export const extractErrorMessage = (error: unknown) => {
  if (isAxiosError(error)) {
    console.log("Raw Error:", error); // Debugging

    let errorMessage = "Request Failed"; // Default message

    if (error.response) {
      if (error.response.data && typeof error.response.data === "object") {
        const data = error.response.data as { [key: string]: AxiosError };
        const firstKey = Object.keys(error.response.data)[0]; // Get the first key dynamically
        if (firstKey) {
          const value = data[firstKey];

          if (Array.isArray(value)) {
            // ✅ If it's an array, join all messages into one string
            errorMessage = value.join(", ");
          } else if (typeof value === "string") {
            // ✅ If it's a string, use it directly
            errorMessage = value;
          }
        }
      }
    }
    toast.error(errorMessage);
  }
};
