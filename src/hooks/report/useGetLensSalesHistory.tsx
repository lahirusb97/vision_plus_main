import { useState, useEffect, useCallback, useRef } from "react";
import axiosClient from "../../axiosClient";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import axios from "axios";
import { paramsNullCleaner } from "../../utils/paramsNullCleaner";
import { LENS_AND_FRAME_STORE_ID } from "../../data/staticVariables";
import dayjs from "dayjs";
import { Power } from "../../model/LenseModel";
export interface LensHistoryParams {
  branch_id: string | null;
  store_branch_id: string;
  date_start: string | null;
  date_end: string | null;
}
interface StockBranchData {
  branch_id: number;
  branch_name: string;
  stock_count: number;
  stock_received: number;
  stock_removed: number;
  sold_qty: number;
}
interface LensSalesHistory {
  lens_id: number;
  lens_type: string;
  coating: string;
  brand: string;
  species: string;
  other_branches_qty: number;
  sold_count: number;
  total_available: number;
  as_of_date: string;
  powers: Power[];
  branches: StockBranchData[];
}
const useGetLensSalesHistory = () => {
  //use null or [] base on scenario
  const [dataList, SetDataList] = useState<LensSalesHistory[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [params, setParams] = useState<LensHistoryParams>({
    date_start: "2024-01-01",
    date_end: dayjs().format("YYYY-MM-DD"),
    branch_id: null,
    store_branch_id: LENS_AND_FRAME_STORE_ID,
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
      const queryParams = {
        ...paramsNullCleaner(params),
        store_id: LENS_AND_FRAME_STORE_ID, // Ensure store_branch_id is always included
      };

      const response: { data: LensSalesHistory[] } = await axiosClient.get(
        `report/lens-sale/`,
        {
          params: queryParams,
          paramsSerializer: (params) => {
            return Object.entries(params)
              .filter(([_, value]) => value != null && value !== "")
              .map(
                ([key, value]) => `${key}=${encodeURIComponent(String(value))}`
              )
              .join("&");
          },
          signal: controller.signal,
        }
      );
      // Only update state if this request wasn't aborted
      if (!controller.signal.aborted) {
        SetDataList(response.data);
        console.log(response.data);
      }
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

  const setParamsData = (newParams: LensHistoryParams) => {
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

  return {
    lensSalesHistoryList: dataList,
    lensSalesHistoryListLoading: loading,
    lensSalesHistoryListError: error,
    lensSalesHistoryListSearch: setParamsData,
    lensSalesHistoryListRefres: loadData,
  };
};

export default useGetLensSalesHistory;
