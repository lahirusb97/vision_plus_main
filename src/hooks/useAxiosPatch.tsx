import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";

export const useAxiosPatch = () => {
  const [patchHandlerloading, setpatchHandlerLoading] =
    useState<boolean>(false);
  const [patchHandlerError, setpatchHandlerError] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      // Cleanup function to prevent state updates on unmounted components
      setpatchHandlerLoading(false);
      setpatchHandlerError(false);
    };
  }, []);
  const patchHandler = async (url: string, data: unknown) => {
    setpatchHandlerLoading(true);
    setpatchHandlerError(false);

    try {
      const responce = await axiosClient.patch(url, data);
      return responce;
    } catch (error) {
      setpatchHandlerError(true);

      throw error;
    } finally {
      setpatchHandlerLoading(false);
    }
  };
  return { patchHandlerloading, patchHandlerError, patchHandler };
};
