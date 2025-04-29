import { useState, useEffect, useCallback, useRef } from "react";

import axiosClient from "../axiosClient";
import axios from "axios";
import { RefractionDetailModel } from "../model/RefractionDetailModel";
import { extractErrorMessage } from "../utils/extractErrorMessage";
interface UseGetRefractionDetailReturn {
  refractionDetail: RefractionDetailModel | null;
  refractionDetailLoading: boolean;
  refractionDetailExist: boolean;
  refractionDetailError: boolean;
  refresh: () => void;
}

const useGetRefractionDetails = (
  refraction_id: string | undefined
): UseGetRefractionDetailReturn => {
  const [refractionDetail, setrefractionDetail] =
    useState<RefractionDetailModel | null>(null);
  const [refractionDetailLoading, setrefractionDetailLoading] =
    useState<boolean>(true);

  const [refractionDetailExist, setrefractionDetailExist] =
    useState<boolean>(false);
  const [refractionDetailError, setRefractionDetailError] =
    useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchrefractionDetail = useCallback(async () => {
    // First, cancel any existing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    // Create a new controller for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    setrefractionDetailLoading(true);

    try {
      const response = await axiosClient.get<RefractionDetailModel>(
        `/refraction-details/${refraction_id}/`,
        {
          signal: abortController.signal,
        }
      );
      if (!abortController.signal.aborted) {
        setrefractionDetail(response.data);
        setrefractionDetailExist(true);

        setRefractionDetailError(false);
      }
    } catch (error) {
      // Check if the error is a cancellation
      if (axios.isCancel(error)) {
        return;
      }
      if (!abortController.signal.aborted) {
        extractErrorMessage(error);
        setrefractionDetailExist(false);

        setRefractionDetailError(true);
      }
    } finally {
      setrefractionDetailLoading(false);
    }
  }, [refraction_id]);

  // Automatically fetch data on mount
  useEffect(() => {
    // Call loadData directly - it will handle its own cleanup
    fetchrefractionDetail();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchrefractionDetail]);

  return {
    refractionDetail,
    refractionDetailLoading,
    refractionDetailExist,
    refractionDetailError,
    refresh: fetchrefractionDetail,
  };
};

export default useGetRefractionDetails;
