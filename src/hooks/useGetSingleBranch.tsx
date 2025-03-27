import { useCallback, useEffect, useState } from "react";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import axiosClient from "../axiosClient";
import { BranchModel } from "../model/BranchModel";

//!BACKEND NOT READY
export default function useGetSingleBranch(id: string | undefined) {
  const [singleBranch, setSingleBranch] = useState<BranchModel | null>(null);
  const [singleBranchLoading, setSingleBranchLoading] = useState<boolean>(true);

  const loadData = useCallback(async () => {
    if (id) {
      try {
        const response = await axiosClient.get(`branches/${id}/`);
        setSingleBranch(response.data);
      } catch (error) {
        extractErrorMessage(error);
      } finally {
        setSingleBranchLoading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    const controller = new AbortController();
    loadData();
    return () => controller.abort();
  }, [loadData]);

  return {
    singleBranch,
    singleBranchLoading,
    singleUserDataRefresh: loadData,
  };
}
