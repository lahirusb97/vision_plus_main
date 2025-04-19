import { useCallback, useEffect, useState } from "react";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import axiosClient from "../axiosClient";
import { ChannelFullDetailModel } from "../model/ChannelModel";

export default function useGetSingleAppointment(id: string | undefined) {
  const [singleAppointment, setSingleAppointment] =
    useState<ChannelFullDetailModel | null>(null);
  const [singleAppointmentLoading, setSingleappointmentLoading] =
    useState<boolean>(true);

  const loadData = useCallback(async () => {
    if (id) {
      try {
        const response = await axiosClient.get(`channels/${id}/`);
        setSingleAppointment(response.data);
      } catch (error) {
        extractErrorMessage(error);
      } finally {
        setSingleappointmentLoading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    const controller = new AbortController();
    loadData();
    return () => controller.abort();
  }, [loadData]);

  return {
    singleAppointment,
    singleAppointmentLoading,
    singleAppointmentDataRefresh: loadData,
  };
}
