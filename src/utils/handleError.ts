import { toast } from "react-hot-toast";
import { AxiosError } from "axios";

export function handleError(
  error: AxiosError,
  defaultMessage: string = "Something went wrong"
) {
  if (error.response?.data) {
    toast.error(
      (error.response?.data as { error: string })?.error || defaultMessage
    );
  } else {
    toast.error(defaultMessage);
  }
}
