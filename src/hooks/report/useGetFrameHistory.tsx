import { useState, useEffect, useCallback, useRef } from "react";
import axiosClient from "../../axiosClient";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import toast from "react-hot-toast";

import axios from "axios";
import { ProgressStatus } from "../../model/StaticTypeModels";
import { getUserCurentBranch } from "../../utils/authDataConver";
import { CheckinInvoiceModel } from "../../model/CheckinInvoiceModel";
import { PaginatedResponse } from "../../model/PaginatedResponse";
import { paramsNullCleaner } from "../../utils/paramsNullCleaner";
import { FrameStockHistorySerializer } from "../../model/Frame";
export interface FrameHistoryParams {
  page_size: number;
  page: number;
  search: string | null;
  frame_id: string;
}
const useGetFrameHistory = (id: string) => {
  //use null or [] base on scenario
  const [dataList, SetDataList] = useState<FrameStockHistorySerializer[] | []>(
    []
  );
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [params, setParams] = useState<FrameHistoryParams>({
    page_size: 10,
    page: 1,
    search: null,
    frame_id: id,
  });
  const abortControllerRef = useRef<AbortController | null>(null);

  const loadData = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;
    setLoading(true);
    try {
      const response: { data: PaginatedResponse<FrameStockHistorySerializer> } =
        await axiosClient.get(`report/frame-history/`, {
          params: {
            ...paramsNullCleaner(params),
            branch_id: getUserCurentBranch()?.id,
          },
          signal: controller.signal,
        });
      // Only update state if this request wasn't aborted
      if (!controller.signal.aborted) {
        SetDataList(response.data?.results);
        setTotalCount(response.data?.count);
        if (response.data?.count > 0) {
          toast.success(" Frame records found ");
        } else {
          toast.error("No frame records found");
        }
      }

      // setTotalCount(response.data.count);
    } catch (err) {
      // Check if the error is a cancellation
      if (axios.isCancel(err)) {
        return;
      }
      // Only update error state if this request wasn't aborted
      if (!controller.signal.aborted) {
        SetDataList([]);
        extractErrorMessage(err);
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  }, [params]);

  const setParamsData = (newParams: FrameHistoryParams) => {
    // use null to remove params
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
  const handlePageNavigation = useCallback((page: number) => {
    setParams((prev) => ({
      ...prev,
      page,
    }));
  }, []);
  const changePageSize = useCallback((pageSize: number) => {
    setParams((prev) => ({
      ...prev,
      page_size: pageSize,
    }));
    ///* if you use functional prev state you do not need to add params to callback depandancy array
  }, []);
  return {
    frameHistoryLimit: params.page_size,
    frameHistoryList: dataList,
    frameHistoryListLoading: loading,
    frameHistoryListError: error,
    frameHistoryListTotalCount: totalCount,
    frameHistoryListPageNavigation: handlePageNavigation,
    frameHistoryListSearch: setParamsData,
    frameHistoryListRefres: loadData,
    frameHistoryListChangePageSize: changePageSize,
  };
};

export default useGetFrameHistory;
