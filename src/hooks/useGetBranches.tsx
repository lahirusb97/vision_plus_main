import { useCallback, useEffect, useState } from "react";
import { BranchModel } from "../model/BranchModel";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import axiosClient from "../axiosClient";

export default function useGetBranches() {
  const [branches, setBranches] = useState<BranchModel[] | null>(null);
  const [branchesLoading, setBranchesLoading] = useState<boolean>(false);
  const [paramList, setParamList] = useState<object>({});

  const loadData = useCallback(async () => {
    setBranchesLoading(true);

    try {
      const response = await axiosClient.get("branches/", {
        params: {
          page_size: 10,
          ...paramList,
        },
      });
      setBranches(response.data);
    } catch (error) {
      extractErrorMessage(error);
    } finally {
      setBranchesLoading(false);
    }
  }, [paramList]);

  //SEARCH HANDLE
  const searchBranches = (searchKeyWord: string) => {
    setParamList({
      search: searchKeyWord,
    });
  };

  //PAGE NAVIGATION HANDLE
  const pageNavigationByNumber = (pageNumber: number) => {
    setParamList({
      page: pageNumber,
    });
  };
  useEffect(() => {
    const controller = new AbortController(); // ✅ Create an abort controller

    loadData();
    return () => controller.abort();
  }, [loadData]);

  return {
    branches,
    branchesLoading,
    searchBranches,
    pageNavigationByNumber,
    UsersDataRefresh: loadData,
  };
}
