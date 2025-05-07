import { useState, useRef } from "react";
import axiosClient from "../axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import axios from "axios";
import { getUserCurentBranch } from "../utils/authDataConver";

export interface AppointmentsTimeSlots {
  time: string;
  patient_name: string;
  channel_no: number;
}

export interface AppointmentSlots {
  total_appointments: number;
  doctor_arrival: string | null;
  appointments: AppointmentsTimeSlots[];
}
const useGetAppointmentSlots = () => {
  //use null or [] base on scenario
  const [Data, setData] = useState<AppointmentSlots | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const abortControllerRef = useRef<AbortController | null>(null);
  const getAppointmentSlots = async (date: string, doctor_id: number) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;
    setLoading(true);
    setError(false);
    try {
      const response: { data: AppointmentSlots } = await axiosClient.get(
        `channels/time-slots/`,
        {
          params: { date, doctor_id, branch_id: getUserCurentBranch()?.id },
          signal: controller.signal,
        }
      );
      // Only update state if this request wasn't aborted
      if (!controller.signal.aborted) {
        setData(response.data);
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
  };

  return {
    appointmentSlots: Data,
    appointmentSlotsLoading: loading,
    getAppointmentSlots: getAppointmentSlots,
    appointmentSlotsError: error,
  };
};

export default useGetAppointmentSlots;
