import { useEffect, useRef, useState } from "react";
import { getUserCurentBranch } from "../utils/authDataConver";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import { DoctorSchedule } from "../model/DoctorSchedule";
import axiosClient from "../axiosClient";
import axios from "axios";

interface UseUpcomingSchedulesResult {
  doctorShedule: DoctorSchedule[];
  doctorSheduleLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export default function useUpcomingSchedules(
  doctorId: number | undefined
): UseUpcomingSchedulesResult {
  const [highlightedDates, setHighlightedDates] = useState<DoctorSchedule[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const branchId = getUserCurentBranch()?.id;
  const abortControllerRef = useRef<AbortController | null>(null);
  const fetchDates = async () => {
    if (!doctorId || !branchId) return;
    // First, cancel any existing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    // Create a new controller for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    setLoading(true);
    setError(null);

    try {
      const res = await axiosClient.get(
        `doctor-schedule/${doctorId}/upcoming/?branch_id=${branchId}`,
        {
          signal: abortController.signal,
        }
      );

      // Ensure we always have an array, even if single object is returned
      const dates = Array.isArray(res.data)
        ? res.data
        : [res.data].filter(Boolean);

      setHighlightedDates(dates);
    } catch (err) {
      // Check if the error is a cancellation
      if (axios.isCancel(err)) {
        return;
      }
      if (!abortController.signal.aborted) {
        extractErrorMessage(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDates();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [doctorId, branchId]);

  return {
    doctorShedule: highlightedDates,
    doctorSheduleLoading: loading,
    error,
    refetch: fetchDates,
  };
}
