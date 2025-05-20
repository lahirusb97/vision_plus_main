import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";

export const useAxiosDelete = () => {
  const [deleteHandlerloading, setdeleteHandlerLoading] =
    useState<boolean>(false);
  const [deleteHandlerError, setdeleteHandlerError] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      // Cleanup function to prevent state updates on unmounted components
      setdeleteHandlerLoading(false);
      setdeleteHandlerError(false);
    };
  }, []);
  const deleteHandler = async (url: string) => {
    setdeleteHandlerLoading(true);
    setdeleteHandlerError(false);

    try {
      const responce = await axiosClient.delete(url);
      return responce;
    } catch (error) {
      setdeleteHandlerError(true);

      throw error;
    } finally {
      setdeleteHandlerLoading(false);
    }
  };
  return { deleteHandlerloading, deleteHandlerError, deleteHandler };
};
