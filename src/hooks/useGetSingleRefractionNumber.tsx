import { useCallback, useEffect, useState } from "react";

import { extractErrorMessage } from "../utils/extractErrorMessage";
import axiosClient from "../axiosClient";
import { RefractionNumberModel } from "../model/RefractionModel";

export default function useGetSingleRefractionNumber(id: string | undefined) {
  const [singlerefractionNumber, setSingleRefractionNumber] =
    useState<RefractionNumberModel | null>(null);
  const [singlerefractionNumberLoading, setSingleRefractionNumberLoading] =
    useState<boolean>(true);

  const loadData = useCallback(async () => {
    if (id) {
      try {
        const response = await axiosClient.get(`refractions/${id}/update/`);
        setSingleRefractionNumber(response.data);
      } catch (error) {
        extractErrorMessage(error);
      } finally {
        setSingleRefractionNumberLoading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    const controller = new AbortController();
    loadData();
    return () => controller.abort();
  }, [loadData]);

  return {
    singlerefractionNumber,
    singlerefractionNumberLoading,
    singleRefractionNumberDataRefresh: loadData,
  };
}
