import { useState, useEffect, useCallback, useRef } from "react";
import axiosClient from "../axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import toast from "react-hot-toast";
import { getUserCurentBranch } from "../utils/authDataConver";
import axios from "axios";
import { OtherIncomeReport } from "../model/OtherIncomeReport";
import dayjs from "dayjs";
interface FilterParams {
  start_date: string | null;
  // end_date: string | null;
}
const useGetReportOtherIncome = () => {
  const [Data, setData] = useState<OtherIncomeReport[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [params, setParams] = useState<FilterParams>({
    start_date: dayjs().format("YYYY-MM-DD"),
    // end_date: dayjs().format("YYYY-MM-DD"),
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
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([, v]) => v !== undefined && v !== null)
      );
      const response: { data: OtherIncomeReport[] } = await axiosClient.get(
        `other-incomes/`,
        {
          params: {
            ...cleanParams,
            branch: getUserCurentBranch()?.id,
          },
          signal: controller.signal,
        }
      );

      if (!controller.signal.aborted) {
        setData(response.data);
        toast.success("Maching Invoice found ");
      }

      // setTotalCount(response.data.count);
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      }
      if (!controller.signal.aborted) {
        setData([]);
        extractErrorMessage(error);
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  }, [params]);
  const setParamsData = (newParams: FilterParams) => {
    setParams((prev) => ({
      ...prev,
      ...newParams,
    }));
  };
  useEffect(() => {
    loadData();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [loadData]);

  return {
    otherIncomeReport: Data,
    otherIncomeReportLoading: loading,
    otherIncomeReportRefresh: loadData,
    otherIncomeReportError: error,
    setOtherIncomeReportParamsData: setParamsData,
  };
};

export default useGetReportOtherIncome;
