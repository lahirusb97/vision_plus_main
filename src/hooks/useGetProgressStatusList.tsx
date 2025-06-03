import { useState, useCallback, useRef } from "react";
import axiosClient from "../axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import axios from "axios";
import { ProgressStatusModel } from "../model/progressStatusModel";

interface UseGetDoctorsReturn {
  progressStatusList: ProgressStatusModel[];
  progressStatusListLoading: boolean;
  progressStatusListError: boolean;
  fetchProgressStatus: (order_id: number) => void;
}

const useGetProgressStatusList = (): UseGetDoctorsReturn => {
  const [data, setData] = useState<ProgressStatusModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchProgressStatus = useCallback(async (order_id: number) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;
    setLoading(true);
    setError(false);

    try {
      const response = await axiosClient.get<ProgressStatusModel[]>(
        "progress-status/list/",
        {
          params: { order_id },
          signal: controller.signal,
        }
      );
      // Only update state if this request wasn't aborted
      if (!controller.signal.aborted) {
        setData(response.data);
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        return;
      }
      if (!controller.signal.aborted) {
        extractErrorMessage(err);
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    progressStatusList: data,
    progressStatusListLoading: loading,
    progressStatusListError: error,
    fetchProgressStatus,
  };
};

export default useGetProgressStatusList;
