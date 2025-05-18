import { useCallback, useEffect, useRef, useState } from "react";

import { extractErrorMessage } from "../utils/extractErrorMessage";
import axiosClient from "../axiosClient";
import { RefractionNumberModel } from "../model/RefractionModel";
import { getUserCurentBranch } from "../utils/authDataConver";
import axios from "axios";
import toast from "react-hot-toast";

export default function useGetSingleRefractionNumber(id: string | undefined) {
  const [singlerefractionNumber, setSingleRefractionNumber] =
    useState<RefractionNumberModel | null>(null);
  const [singlerefractionNumberLoading, setSingleRefractionNumberLoading] =
    useState<boolean>(true);
  const [singleRefractionNumberError, setSingleRefractionNumberError] =
    useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const loadData = useCallback(async () => {
    if (id) {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      setSingleRefractionNumberError(false);
      setSingleRefractionNumberLoading(true);
      const controller = new AbortController();
      abortControllerRef.current = controller;
      try {
        const response = await axiosClient.get(`refractions/${id}/update/`, {
          params: {
            branch_id: getUserCurentBranch()?.id,
          },
          signal: controller.signal,
        });
        if (!controller.signal.aborted) {
          setSingleRefractionNumber(response.data);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }
        if (!controller.signal.aborted) {
          extractErrorMessage(error);
          setSingleRefractionNumberError(true);
        }
      } finally {
        setSingleRefractionNumberLoading(false);
      }
    } else {
      setSingleRefractionNumberError(true);
      setSingleRefractionNumberLoading(false);
      toast.error("Invalid ID");
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
    singlerefractionNumber,
    singlerefractionNumberLoading,
    singleRefractionNumberDataRefresh: loadData,
    singleRefractionNumberError,
  };
}
