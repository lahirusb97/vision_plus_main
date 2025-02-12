import { toast } from "react-hot-toast";

export function handleError(
  error: unknown,
  defaultMessage: string = "Something went wrong"
) {
  if (error instanceof Error) {
    toast.error(`${defaultMessage}: ${error.message}`);
  } else if (
    typeof error === "object" &&
    error !== null &&
    "response" in error
  ) {
    // Handle Axios errors or similar structured errors
    const axiosError = error as { response: { data: { message: string } } };
    toast.error(`${defaultMessage}: ${axiosError.response.data.message}`);
  } else {
    // Fallback for unknown error types
    toast.error(defaultMessage);
  }
}
