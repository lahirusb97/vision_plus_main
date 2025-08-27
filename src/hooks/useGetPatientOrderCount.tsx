import { useState, useEffect, useCallback, useRef } from "react";
import axiosClient from "../axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";

interface PatientOrderCount {
  count: number;
}

const useGetPatientOrderCount = (patientId: number | null) => {
  const [orderCount, setOrderCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const loadData = useCallback(async () => {
    if (!patientId) {
      setOrderCount(0);
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;
    setLoading(true);

    try {
      const response: { data: PatientOrderCount } = await axiosClient.get(
        `/refraction/orders/count/?patient_id=${patientId}`,
        {
          signal: controller.signal,
        }
      );
      setOrderCount(response.data.count);
      setError(false);
    } catch (error) {
      if (!controller.signal.aborted) {
        extractErrorMessage(error);
        setError(true);
        setOrderCount(0);
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }, [patientId]);

  useEffect(() => {
    loadData();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [loadData]);

  return {
    orderCount,
    orderCountLoading: loading,
    orderCountError: error,
    refreshOrderCount: loadData,
  };
};

export default useGetPatientOrderCount;
