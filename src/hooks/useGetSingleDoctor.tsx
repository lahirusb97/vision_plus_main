import { useCallback, useEffect, useState } from "react";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import axiosClient from "../axiosClient";
import { DoctorModel } from "../model/DoctorModel";

export default function useGetSingleDoctor(id: string | undefined) {
  const [singleDoctor, setSingleDoctor] = useState<DoctorModel | null>(null);
  const [singleDoctorLoading, setSingleDoctorLoading] = useState<boolean>(true);

  const loadData = useCallback(async () => {
    if (id) {
      try {
        const response = await axiosClient.get(`doctors/${id}/`);
        setSingleDoctor(response.data);
      } catch (error) {
        extractErrorMessage(error);
      } finally {
        setSingleDoctorLoading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    const controller = new AbortController();
    loadData();
    return () => controller.abort();
  }, [loadData]);

  return {
    singleDoctor,
    singleDoctorLoading,
    singleUserDataRefresh: loadData,
  };
}
