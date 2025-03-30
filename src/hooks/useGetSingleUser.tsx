import { useCallback, useEffect, useState } from "react";
import { UserModel } from "../model/UserModel";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import axiosClient from "../axiosClient";

//!BACKEND NOT READY
export default function useGetSingleUser(id: string | undefined) {
  const [singleuser, setSingleUser] = useState<UserModel | null>(null);
  const [singleuserLoading, setSingleUserLoading] = useState<boolean>(true);

  const loadData = useCallback(async () => {
    if (id) {
      try {
        const response = await axiosClient.get(`users/get/${id}/`);
        setSingleUser(response.data);
      } catch (error) {
        extractErrorMessage(error);
      } finally {
        setSingleUserLoading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    const controller = new AbortController();
    loadData();
    return () => controller.abort();
  }, [loadData]);

  return {
    singleuser,
    singleuserLoading,
    singleUserDataRefresh: loadData,
  };
}
