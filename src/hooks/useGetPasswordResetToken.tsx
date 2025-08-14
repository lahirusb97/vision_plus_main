import { useState, useEffect, useCallback, useRef } from "react";
import axiosClient from "../axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import toast from "react-hot-toast";

import axios from "axios";
import { getUserCurentBranch } from "../utils/authDataConver";
import { paramsNullCleaner } from "../utils/paramsNullCleaner";
export interface OrderImageListParams {
  token: String | null;
}
interface passwordResetToken {
  valid: boolean;
  user_id: number;
  user_code: string;
  email: string;
  expires_at: string;
}

const useGetPasswordResetToken = ({ token }: OrderImageListParams) => {
  //use null or [] base on scenario
  const [dataList, SetDataList] = useState<passwordResetToken | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [params, setParams] = useState<OrderImageListParams>({
    token: token,
  });
  const abortControllerRef = useRef<AbortController | null>(null);

  const loadData = useCallback(async () => {
    if (params.token) {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;
      setLoading(true);
      try {
        const response: { data: passwordResetToken } = await axiosClient.get(
          `rest-password/`,
          {
            params: {
              ...paramsNullCleaner(params),
            },
            signal: controller.signal,
          }
        );
        // Only update state if this request wasn't aborted
        if (!controller.signal.aborted) {
          SetDataList(response.data);
        }

        // setTotalCount(response.data.count);
      } catch (err) {
        // Check if the error is a cancellation
        if (axios.isCancel(err)) {
          return;
        }
        // Only update error state if this request wasn't aborted
        if (!controller.signal.aborted) {
          SetDataList(null);
          extractErrorMessage(err);
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    }
  }, [params, token]);

  useEffect(() => {
    // Call loadData directly - it will handle its own cleanup
    loadData();
    // Return cleanup function for component unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [loadData]);

  return {
    passwordResetToken: dataList,
    passwordResetTokenLoading: loading,
    passwordResetTokenError: error,
    passwordResetTokenRefresh: loadData,
  };
};

export default useGetPasswordResetToken;
