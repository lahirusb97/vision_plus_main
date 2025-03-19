import { useEffect, useState, useCallback } from "react";
import axiosClient from "../axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import { BranchModel } from "../model/BranchModel";

export const useGetBranch = () => {
  const [branchloading, setBranchLoading] = useState<boolean>(false);
  const [branchHandlerError, setBranchHandlerError] = useState<boolean>(false);
  const [brancheData, setBranchData] = useState<BranchModel[] | null>(null);

  const loadData = useCallback(async () => {
    setBranchLoading(true);
    setBranchHandlerError(false);

    try {
      const response = await axiosClient.get("branches/");
      setBranchData(response.data);
    } catch (error) {
      setBranchHandlerError(true);
      extractErrorMessage(error);
    } finally {
      setBranchLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]); // ✅ Depend on useCallback function

  return {
    branchloading,
    brancheData,
    branchHandlerError,
    refreshBranchData: loadData, // ✅ Can be used externally to refresh data
  };
};
