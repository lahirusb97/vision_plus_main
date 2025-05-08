import { useCallback, useEffect, useRef, useState } from "react";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import axiosClient from "../axiosClient";
import { ChannelFullDetailModel } from "../model/ChannelModel";
import axios from "axios";

export default function useGetSingleAppointment(id: string | undefined) {
  const [singleAppointment, setSingleAppointment] =
    useState<ChannelFullDetailModel | null>(null);
  const [singleAppointmentLoading, setSingleappointmentLoading] =
    useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const loadData = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setError(false);
    setSingleappointmentLoading(true);
    const controller = new AbortController();
    abortControllerRef.current = controller;
    try {
      const response = await axiosClient.get(`channels/${id}/`, {
        signal: controller.signal,
      });
      setSingleAppointment(response.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      }
      if (!controller.signal.aborted) {
        setError(true);
        extractErrorMessage(error);
        setSingleAppointment(null);
      }
    } finally {
      setSingleappointmentLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadData();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [loadData]);

  return {
    singleAppointment,
    singleAppointmentLoading,
    singleAppointmentDataRefresh: loadData,
    singleAppointmentError: error,
  };
}
