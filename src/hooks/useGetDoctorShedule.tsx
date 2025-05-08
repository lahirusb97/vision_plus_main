import { useRef, useState } from "react";
import { getUserCurentBranch } from "../utils/authDataConver";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import { DoctorSchedule, DoctorScheduleStatus } from "../model/DoctorSchedule";
import axiosClient from "../axiosClient";
import axios from "axios";
import { paramsNullCleaner } from "../utils/paramsNullCleaner";

interface UseUpcomingSchedulesResult {
  doctorSheduleList: DoctorSchedule[];
  doctorSheduleListLoading: boolean;
  doctorSheduleListError: boolean;
  getDoctorShedule: (
    doctor: number,
    status: DoctorScheduleStatus | null
  ) => Promise<void>;
}

export default function useUpcomingSchedules(): UseUpcomingSchedulesResult {
  const [highlightedDates, setHighlightedDates] = useState<DoctorSchedule[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);

  const abortControllerRef = useRef<AbortController | null>(null);
  const fetchDates = async (
    doctor: number,
    status: DoctorScheduleStatus | null
  ) => {
    // First, cancel any existing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    // Create a new controller for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    setLoading(true);
    setError(false);

    try {
      const res = await axiosClient.get(`doctor-schedule/${doctor}/upcoming/`, {
        params: {
          ...paramsNullCleaner({ status: status }),
          branch_id: getUserCurentBranch()?.id,
        },
        signal: abortController.signal,
      });
      if (!abortController.signal.aborted) {
        setHighlightedDates(res.data);
      }
    } catch (err) {
      // Check if the error is a cancellation
      if (axios.isCancel(err)) {
        return;
      }
      if (!abortController.signal.aborted) {
        extractErrorMessage(err);
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    doctorSheduleList: highlightedDates,
    doctorSheduleListLoading: loading,
    doctorSheduleListError: error,
    getDoctorShedule: fetchDates,
  };
}
