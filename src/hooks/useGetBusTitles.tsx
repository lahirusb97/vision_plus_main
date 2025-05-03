import { useState, useEffect, useCallback, useRef } from "react";
import axiosClient from "../axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import axios from "axios";
import { BusTitleModel } from "../model/BusTitleModel";
import { PaginatedResponse } from "../model/PaginatedResponse";
import { paramsNullCleaner } from "../utils/paramsNullCleaner";
interface FilterParams {
  is_active: boolean | null;
  search: string | null;
}
interface PaginationParams {
  page_size: number;
  page: number;
}
const useGetBusTitles = ({ is_active }: { is_active: boolean | null }) => {
  //use null or [] base on scenario
  const [Data, setData] = useState<BusTitleModel[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [params, setParams] = useState<FilterParams>({
    is_active: is_active,
    search: null,
  });
  const [paginationParams, setPaginationParams] = useState<PaginationParams>({
    page_size: 10,
    page: 1,
  });
  const abortControllerRef = useRef<AbortController | null>(null);

  const loadData = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;
    setLoading(true);
    setError(false);
    try {
      const response: { data: PaginatedResponse<BusTitleModel> } =
        await axiosClient.get(`bus/title/`, {
          params: { ...paramsNullCleaner(params), ...paginationParams },
          signal: controller.signal,
        });
      // Only update state if this request wasn't aborted
      if (!controller.signal.aborted) {
        setData(response.data.results);
        setTotalCount(response.data.count);
      }

      // setTotalCount(response.data.count);
    } catch (err) {
      // Check if the error is a cancellation
      if (axios.isCancel(err)) {
        return;
      }
      // Only update error state if this request wasn't aborted
      if (!controller.signal.aborted) {
        setData([]);
        setTotalCount(0);
        extractErrorMessage(err);
        setError(true);
      }
    } finally {
      setLoading(false);
    }
    // return () => {
    //   abortController.abort();
    // };//! only need when useEffect des not use
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    params.is_active,
    params.search,
    paginationParams.page,
    paginationParams.page_size,
  ]);

  //Page Navigation
  const handlePageNavigation = (pageNumber: number) => {
    setPaginationParams((prev) => ({
      ...prev,
      page: pageNumber,
    }));
  };
  const changePageSize = (pageNumber: number) => {
    setPaginationParams((prev) => ({
      ...prev,
      page_size: pageNumber,
    }));
  };
  const handleFilterParams = (newParams: FilterParams) => {
    setParams((prev) => ({
      ...prev,
      ...newParams,
    }));
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
    busTitlesList: Data,
    busTitlesTotalCount: totalCount,
    pageSize: paginationParams.page_size,
    busTitlesLoading: loading,
    busTitlesListRefresh: loadData,
    busTitlesError: error,
    handleBusTitleFilterParams: handleFilterParams,
    busTitlePageNavigation: handlePageNavigation,
    busTitlePageSize: changePageSize,
  };
};

export default useGetBusTitles;
