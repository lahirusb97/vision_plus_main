import { useState, useEffect, useCallback, useRef } from "react";
import axiosClient from "../axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import toast from "react-hot-toast";
import axios from "axios";
import { getUserCurentBranch } from "../utils/authDataConver";
interface FilterParams {
  doctor_id: number | null;
  date: string | null;
}
interface Appointments {
  time: string;
  patient_name: string;
  channel_no: number;
}

interface AppointmentSlots {
  total_appointments: number;
  appointments: Appointments[];
}
const useGetAppointmentSlots = () => {
  //use null or [] base on scenario
  const [Data, setData] = useState<AppointmentSlots | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [params, setParams] = useState<FilterParams>({
    doctor_id: null,
    date: null,
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
      const response: { data: AppointmentSlots } = await axiosClient.get(
        `channels/time-slots/`,
        {
          params: { ...params, branch_id: getUserCurentBranch()?.id },
          signal: controller.signal,
        }
      );
      // Only update state if this request wasn't aborted
      if (!controller.signal.aborted) {
        setData(response.data);
        toast.success("Maching Invoice found ");
      }

      // setTotalCount(response.data.count);
    } catch (err) {
      // Check if the error is a cancellation
      if (axios.isCancel(err)) {
        return;
      }
      // Only update error state if this request wasn't aborted
      if (!controller.signal.aborted) {
        setData(null);
        extractErrorMessage(err);
        setError(true);
      }
    } finally {
      setLoading(false);
    }
    // return () => {
    //   abortController.abort();
    // };//! only need when useEffect des not use
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.doctor_id, params.date]);
  const setParamsData = (newParams: FilterParams) => {
    // use null to remove params
    setParams((prev) => ({
      ...prev,
      ...newParams,
    }));
    loadData();
  };
  useEffect(() => {
    // Call loadData directly - it will handle its own cleanup
    // loadData();
    // Return cleanup function for component unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [loadData]);

  return {
    appointmentSlots: Data,
    appointmentSlotsLoading: loading,
    appointmentSlotsListRefres: loadData,
    appointmentSlotsError: error,
    setappointmentSlotsParams: setParamsData,
  };
};

export default useGetAppointmentSlots;
