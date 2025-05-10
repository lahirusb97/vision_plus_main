import { useState, useEffect, useCallback, useRef } from "react";
import axiosClient from "../axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import { getUserCurentBranch } from "../utils/authDataConver";
import { FinanceSummary } from "../model/FinanceSummary";
import axios from "axios";
import dayjs from "dayjs";
interface FilterParams {
  date: string | null;
}
const useGetFinanceSummary = () => {
  const [Data, setData] = useState<FinanceSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [params, setParams] = useState<FilterParams>({
    date: dayjs().format("YYYY-MM-DD"),
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
      const response: { data: FinanceSummary } = await axiosClient.get(
        `finance-summary/`,
        {
          params: {
            ...cleanParams,
            branch: getUserCurentBranch()?.id,
          },
          signal: controller.signal,
        }
      );

      setData(response.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      }
      if (!controller.signal.aborted) {
        setData(null);
        extractErrorMessage(error);
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  }, [params.date]);
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
    financeSummary: Data,
    financeSummaryLoading: loading,
    financeSummaryRefres: loadData,
    financeSummaryError: error,
    setFinanceSummaryParams: setParamsData,
  };
};

export default useGetFinanceSummary;
