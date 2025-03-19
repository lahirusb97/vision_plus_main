import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";

export const useAxiosPost = () => {
  const [postHandlerloading, setPostHandlerLoading] = useState<boolean>(false);
  const [postHandlerError, setpostHandlerError] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      // Cleanup function to prevent state updates on unmounted components
      setPostHandlerLoading(false);
      setpostHandlerError(false);
    };
  }, []);
  const postHandler = async (url: string, data: unknown) => {
    setPostHandlerLoading(true);
    setpostHandlerError(false);

    try {
      await axiosClient.post(url, data);
    } catch (error) {
      setpostHandlerError(true);

      throw error;
    } finally {
      setPostHandlerLoading(false);
    }
  };
  return { postHandlerloading, postHandlerError, postHandler };
};
