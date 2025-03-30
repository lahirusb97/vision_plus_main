import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";

export const useAxiosPut = () => {
  const [putHandlerloading, setputHandlerLoading] = useState<boolean>(false);
  const [putHandlerError, setputHandlerError] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      // Cleanup function to prevent state updates on unmounted components
      setputHandlerLoading(false);
      setputHandlerError(false);
    };
  }, []);
  const putHandler = async (url: string, data: unknown) => {
    setputHandlerLoading(true);
    setputHandlerError(false);

    try {
      await axiosClient.put(url, data);
    } catch (error) {
      setputHandlerError(true);

      throw error;
    } finally {
      setputHandlerLoading(false);
    }
  };
  return { putHandlerloading, putHandlerError, putHandler };
};
