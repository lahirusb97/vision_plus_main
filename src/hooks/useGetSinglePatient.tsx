import { useCallback, useEffect, useState } from "react";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import axiosClient from "../axiosClient";
import { PatientModel } from "../model/Patient";

//!BACKEND NOT READY
export default function useGetSinglePatient(id: string | undefined) {
  const [singlePatient, setSinglePatient] = useState<PatientModel | null>(null);
  const [singlePatientLoading, setSinglePatientLoading] =
    useState<boolean>(true);

  const loadData = useCallback(async () => {
    if (id) {
      try {
        const response = await axiosClient.get(`patients/${id}/`);
        setSinglePatient(response.data);
      } catch (error) {
        extractErrorMessage(error);
      } finally {
        setSinglePatientLoading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    const controller = new AbortController();
    loadData();
    return () => controller.abort();
  }, [loadData]);

  return {
    singlePatient,
    singlePatientLoading,
    singlePatientDataRefresh: loadData,
  };
}
