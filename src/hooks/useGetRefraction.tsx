import { useState, useEffect, useCallback, useRef } from "react";
import axiosClient from "../axiosClient";
import { PaginatedResponse } from "../model/PaginatedResponse";
import { RefractionNumberModel } from "../model/RefractionModel";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import { getUserCurentBranch } from "../utils/authDataConver";
import axios from "axios";

const useGetRefraction = () => {
  const limit = 10;
  const [navigatePage, setNavigatePage] = useState<number>(1);
  const [searchQuary, setSearchQuary] = useState<string>("");
  const [DataList, setDataList] = useState<RefractionNumberModel[]>([]);
  const [totalCount, setTotalCount] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  // Use a ref to store the current controller so we can access it for cancellation
  const abortControllerRef = useRef<AbortController | null>(null);

  const loadData = useCallback(async () => {
    // First, cancel any existing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    // Create a new controller for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    setLoading(true);

    try {
      setError(false);

      const response: { data: PaginatedResponse<RefractionNumberModel> } =
        await axiosClient.get(`refractions/`, {
          signal: abortController.signal,
          params: {
            page: navigatePage,
            limit,
            ...(searchQuary ? { search: searchQuary } : {}),
            branch_id: getUserCurentBranch()?.id,
          },
        });
      // Only update state if this request wasn't aborted
      if (!abortController.signal.aborted) {
        setDataList(response.data.results);
        setTotalCount(response.data.count);
      }
    } catch (err) {
      // Check if the error is a cancellation
      if (axios.isCancel(err)) {
        return;
      }
      // Only update error state if this request wasn't aborted
      if (!abortController.signal.aborted) {
        setDataList([]);
        extractErrorMessage(err);
        setError(true);
      }
    } finally {
      setLoading(false);
    }

    // return () => {
    //   abortController.abort();
    // };//! only need when useEffect des not use
  }, [navigatePage, searchQuary]);

  const handleSearch = (searchKeyWord: string) => {
    setNavigatePage(1);
    setSearchQuary(searchKeyWord);
  };
  const handlePageNavigation = (pageNumber: number) => {
    setNavigatePage(pageNumber);
  };

  useEffect(() => {
    // Call loadData directly - it will handle its own cleanup
    loadData();

    // Return cleanup function for component unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [loadData]);

  return {
    refractionLimit: limit,
    refractionsList: DataList,
    refractionLoading: loading,
    totalRefractionCount: totalCount,
    refractionPageNavigation: handlePageNavigation,
    handleRefractionSearch: handleSearch,
    refreshRefractionList: loadData,
    refractionsListerror: error,
  };
};

export default useGetRefraction;
