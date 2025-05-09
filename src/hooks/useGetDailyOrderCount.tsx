import { useState, useEffect, useCallback, useRef } from "react";
import axiosClient from "../axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import toast from "react-hot-toast";

import { getUserCurentBranch } from "../utils/authDataConver";
import { DailyOrderCount } from "../model/dailyOrderCount";
import { paramsNullCleaner } from "../utils/paramsNullCleaner";
import dayjs from "dayjs";
interface FilterParams {
  date: string | null;
}
const useGetDailyOrderCount = () => {
  const [Data, setData] = useState<DailyOrderCount | null>(null);
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
    console.log(params);
    try {
      const response: { data: DailyOrderCount } = await axiosClient.post(
        `summary/daily/`,
        {
          ...paramsNullCleaner(params),
          branch_id: getUserCurentBranch()?.id,
        },
        {
          signal: controller.signal,
        }
      );

      setData(response.data);
      toast.success("Maching Invoice found ");

      // setTotalCount(response.data.count);
    } catch (error) {
      setData(null);
      extractErrorMessage(error);
      setError(true);
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
    dailyOrderCount: Data,
    dailyOrderCountLoading: loading,
    dailyOrderCountRefres: loadData,
    dailyOrderCountError: error,
    setdailyOrderCountParams: setParamsData,
  };
};

export default useGetDailyOrderCount;
