import { useEffect, useState } from "react";
import { getUserCurentBranch } from "../utils/authDataConver";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import { DoctorSchedule } from "../model/DoctorSchedule";
import axiosClient from "../axiosClient";

interface UseUpcomingSchedulesResult {
  doctorShedule: DoctorSchedule[];
  doctorSheduleLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export default function useUpcomingSchedules(
  doctorId: number
): UseUpcomingSchedulesResult {
  const [highlightedDates, setHighlightedDates] = useState<DoctorSchedule[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const branchId = getUserCurentBranch()?.id;

  const fetchDates = async () => {
    if (!doctorId || !branchId) return;

    setLoading(true);
    setError(null);

    try {
      const res = await axiosClient.get(
        `doctor-schedule/${doctorId}/upcoming/?branch_id=${branchId}`
      );

      // Ensure we always have an array, even if single object is returned
      const dates = Array.isArray(res.data)
        ? res.data
        : [res.data].filter(Boolean);

      setHighlightedDates(dates);
    } catch (err) {
      extractErrorMessage(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDates();
  }, [doctorId, branchId]);

  return {
    doctorShedule: highlightedDates,
    doctorSheduleLoading: loading,
    error,
    refetch: fetchDates,
  };
}
