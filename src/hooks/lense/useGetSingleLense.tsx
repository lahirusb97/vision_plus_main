import { useState, useEffect, useCallback } from "react";
import axiosClient from "../../axiosClient";
import { AxiosError } from "axios";
import { LenseModel } from "../../model/LenseModel";

interface UseGetSingleLenseReturn {
  singleLense: LenseModel | null;
  singleLenseLoading: boolean;
  singleLenseError: string | null;
  refresh: () => Promise<void>;
}

const useGetSingleLense = (
  singleLenseId: string | undefined
): UseGetSingleLenseReturn => {
  const [state, setState] = useState<Omit<UseGetSingleLenseReturn, "refresh">>({
    singleLense: null,
    singleLenseLoading: true,
    singleLenseError: null,
  });

  const fetchSingleLense = useCallback(async () => {
    if (singleLenseId) {
      try {
        setState((prev) => ({
          ...prev,
          singleLenseLoading: true,
          singleLenseError: null,
        }));

        const response = await axiosClient.get<LenseModel>(
          `/lenses/${singleLenseId}/`
        );

        setState({
          singleLense: response.data,
          singleLenseLoading: false,
          singleLenseError: null,
        });
      } catch (err) {
        const error = err as AxiosError;
        const errorMessage =
          error.response?.data?.message || "Failed to fetch the singleLense.";

        setState((prev) => ({
          ...prev,
          singleLenseLoading: false,
          singleLenseError: errorMessage,
        }));
      }
    }
  }, []);

  useEffect(() => {
    fetchSingleLense();
  }, [fetchSingleLense]);

  return {
    ...state,
    refresh: () => fetchSingleLense(),
  };
};

export default useGetSingleLense;
