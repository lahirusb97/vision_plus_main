import { useState, useEffect, useCallback, useRef } from "react";
import axiosClient from "../axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import { getUserCurentBranch } from "../utils/authDataConver";
import axios from "axios";

interface FilterParams {
  branch: number | null;
}
interface FilterData {
  total_balance: number;
}

const useGetSafeBalance = () => {
  const [Data, setData] = useState<FilterData>({
    total_balance: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [params, setParams] = useState<FilterParams>({
    branch: getUserCurentBranch()?.id || null,
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
        `safe/balance/`,
        {
          params: {
            ...cleanParams,
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
          total_balance: 0,
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
    safeTotalBalance: Data?.total_balance,
    safeTotalBalanceLoading: loading,
    safeTotalBalanceRefres: loadData,
    safeTotalBalanceError: error,
    setSafeTotalBalanceParams: setParamsData,
  };
};

export default useGetSafeBalance;
