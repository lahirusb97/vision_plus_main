import { useState } from "react";
import axiosClient from "../axiosClient";

interface ApiResponse<T> {
  data?: T;
  error?: string;
  loading: boolean;
}

export const usePostApiCall = <T>() => {
  const [response, setResponse] = useState<ApiResponse<T>>({
    data: undefined,
    error: undefined,
    loading: false,
  });

  const postApi = async (path: string, payload: unknown) => {
    setResponse({ data: undefined, error: undefined, loading: true });
    try {
      const res = await axiosClient.post<T>(path, payload);
      setResponse({ data: res.data, error: undefined, loading: false });
      return res.data; // Return data for additional use
    } catch (err: any) {
      setResponse({
        data: undefined,
        error: err.response?.data?.message || "Something went wrong",
        loading: false,
      });
      throw err; // Throw error to be handled by caller
    }
  };

  return { ...response, postApi };
};
