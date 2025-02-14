import { useState, useEffect, useCallback } from "react";

import { RefractionDetailModel } from "../model/RefractionDetailModel";
import axiosClient from "../axiosClient";
import { handleError } from "../utils/handleError";
import { AxiosError } from "axios";

interface UseGetRefractionDetailReturn {
  refractionDetail: RefractionDetailModel;
  refractionDetailLoading: boolean;
  refractionDetailError: string | null;
  refresh: () => void;
}

const useGetRefractionDetails = (
  refractionNumber: string
): UseGetRefractionDetailReturn => {
  const [refractionDetail, setrefractionDetail] =
    useState<RefractionDetailModel>({});
  const [refractionDetailLoading, setrefractionDetailLoading] =
    useState<boolean>(true);
  const [refractionDetailError, setrefractionDetailError] =
    useState<boolean>(false);

  const fetchrefractionDetail = useCallback(async () => {
    setrefractionDetailLoading(true);
    setrefractionDetailError(null);

    try {
      const response = await axiosClient.get<RefractionDetailModel[]>(
        `/refractions/${refractionNumber}/`
      );
      setrefractionDetail(response.data);
    } catch (err: AxiosError) {
      handleError(err, "Failed to Recive refractionDetail.");
      if (err.status === 404) {
        setrefractionDetailError(true);
      }
      setrefractionDetailError(err);
    } finally {
      setrefractionDetailLoading(false);
    }
  }, []);

  // Automatically fetch data on mount
  useEffect(() => {
    fetchrefractionDetail();
  }, [fetchrefractionDetail]);

  return {
    refractionDetail,
    refractionDetailLoading,
    refractionDetailError,
    refresh: fetchrefractionDetail,
  };
};

export default useGetRefractionDetails;
