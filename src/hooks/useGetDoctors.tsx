import { useState, useEffect, useCallback, useRef } from "react";
import axiosClient from "../axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import { DoctorModel } from "../model/DoctorModel";
import axios from "axios";

interface UseGetDoctorsReturn {
  data: DoctorModel[];
  loading: boolean;
  error: boolean;
  refresh: () => void;
}

const useGetDoctors = (): UseGetDoctorsReturn => {
  const [data, setData] = useState<DoctorModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchDoctors = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;
    setLoading(true);
    setError(false);

    try {
      const response = await axiosClient.get<DoctorModel[]>("/doctors/", {
        signal: controller.signal,
      });
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

  // Automatically fetch data on mount
  useEffect(() => {
    fetchDoctors();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchDoctors]);

  return {
    data,
    loading,
    error,
    refresh: fetchDoctors,
  };
};

export default useGetDoctors;
