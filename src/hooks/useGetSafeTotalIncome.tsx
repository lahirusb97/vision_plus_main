import { useState, useEffect, useCallback, useRef } from "react";
import axiosClient from "../axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import { getUserCurentBranch } from "../utils/authDataConver";
import axios from "axios";
import dayjs from "dayjs";
interface FilterParams {
  from: string | null;
  to: string | null;
}
interface FilterData {
  total_income: number;
}

const useGetSafeTotalIncome = () => {
  const [Data, setData] = useState<FilterData>({
    total_income: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [params, setParams] = useState<FilterParams>({
    from: dayjs().format("YYYY-MM-DD"),
    to: dayjs().format("YYYY-MM-DD"),
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
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([, v]) => v !== undefined && v !== null)
      );
      const response: { data: FilterData } = await axiosClient.get(
        `safe/income-total/`,
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
        setData({
          total_income: 0,
        });
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
    safeTotalIncome: Data?.total_income,
    safeTotalIncomeLoading: loading,
    safeTotalIncomeRefres: loadData,
    safeTotalIncomeError: error,
    setSafeTotalIncomeParams: setParamsData,
  };
};

export default useGetSafeTotalIncome;
