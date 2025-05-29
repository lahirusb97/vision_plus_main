import { useState, useEffect, useCallback, useRef } from "react";
import axiosClient from "../../axiosClient";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import toast from "react-hot-toast";

import axios from "axios";
import { getUserCurentBranch } from "../../utils/authDataConver";
import { PaginatedResponse } from "../../model/PaginatedResponse";
import { paramsNullCleaner } from "../../utils/paramsNullCleaner";
import { OrderLiteModel } from "../../model/OrderLiteModel";
export interface GlassSenderReportParams {
  page_size: number;
  page: number;
  user_id: number | null;
  invoice_number: string | null;
  start_date: string | null;
  end_date: string | null;
}
interface UserFilteredPaginatedResponse<T> extends PaginatedResponse<T> {
  total_count?: number;
}

const useGetGlassSenderReport = () => {
  //use null or [] base on scenario
  const [dataList, SetDataList] = useState<OrderLiteModel[] | []>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [params, setParams] = useState<GlassSenderReportParams>({
    page_size: 10,
    page: 1,
    user_id: null,
    invoice_number: null,
    start_date: null,
    end_date: null,
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
      const response: { data: UserFilteredPaginatedResponse<OrderLiteModel> } =
        await axiosClient.get(`/report/glass-sender-report/`, {
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
        console.log(response.data);

        if (response.data?.count > 0) {
          toast.success("Maching Invoice found ");
        } else {
          toast.error("No matching invoice found");
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

  const setParamsData = (newParams: GlassSenderReportParams) => {
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
    glassSenderReportLimit: params.page_size,
    glassSenderReportList: dataList,
    glassSenderReportListLoading: loading,
    glassSenderReportListError: error,
    glassSenderReportListTotalCount: totalCount,
    glassSenderReportListPageNavigation: handlePageNavigation,
    glassSenderReportListSearch: setParamsData,
    glassSenderReportListRefres: loadData,
    glassSenderReportListChangePageSize: changePageSize,
  };
};

export default useGetGlassSenderReport;
