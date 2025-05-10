import { useCallback, useEffect, useRef, useState } from "react";

import { extractErrorMessage } from "../utils/extractErrorMessage";
import axiosClient from "../axiosClient";

import { getUserCurentBranch } from "../utils/authDataConver";
import axios from "axios";

interface SingleExpence {
  id: number;
  branch: number;
  main_category_name: string;
  sub_category_name: string;
  main_category: number;
  sub_category: number;
  amount: string;
  note: string;
  paid_source: string;
  paid_from_safe: boolean;
  created_at: string;
}

export default function useGetSingleExpence(id: string | undefined) {
  const [singleExpence, setSingleExpence] = useState<SingleExpence | null>(
    null
  );
  const [singleExpenceLoading, setSingleExpenceLoading] =
    useState<boolean>(true);
  const [singleExpenceError, setSingleExpenceError] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const loadData = useCallback(async () => {
    if (id) {
      setSingleExpenceError(false);
      setSingleExpenceLoading(true);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;
      try {
        const response = await axiosClient.get(`expenses/${id}/`, {
          params: {
            branch_id: getUserCurentBranch()?.id,
          },
          signal: controller.signal,
        });
        if (!controller.signal.aborted) {
          setSingleExpence(response.data);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }
        if (!controller.signal.aborted) {
          extractErrorMessage(error);
          setSingleExpenceError(true);
        }
      } finally {
        setSingleExpenceLoading(false);
      }
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
    singleExpence,
    singleExpenceLoading,
    singleExpenceError,
    singleExpenceDataRefresh: loadData,
  };
}
