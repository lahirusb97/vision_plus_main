import { useState, useEffect, useCallback } from "react";
import axiosClient from "../../axiosClient";
import { LenseModel } from "../../model/LenseModel";
import { extractErrorMessage } from "../../utils/extractErrorMessage";

interface UseGetSingleLenseReturn {
  singleLense: LenseModel | null;
  singleLenseLoading: boolean;
  singleLenseError: boolean;
  refresh: () => Promise<void>;
}

const useGetSingleLense = (
  singleLenseId: string | undefined
): UseGetSingleLenseReturn => {
  const [state, setState] = useState<Omit<UseGetSingleLenseReturn, "refresh">>({
    singleLense: null,
    singleLenseLoading: true,
    singleLenseError: false,
  });

  const fetchSingleLense = useCallback(async () => {
    if (singleLenseId) {
      try {
        setState((prev) => ({
          ...prev,
          singleLenseLoading: true,
          singleLenseError: false,
        }));

        const response = await axiosClient.get<LenseModel>(
          `/lenses/${singleLenseId}/`
        );

        setState({
          singleLense: response.data,
          singleLenseLoading: false,
          singleLenseError: false,
        });
      } catch (err) {
        extractErrorMessage(err);
        setState({
          singleLense: null,
          singleLenseLoading: false,
          singleLenseError: true,
        });
      }
    }
  }, [singleLenseId]);

  useEffect(() => {
    fetchSingleLense();
  }, [fetchSingleLense]);

  return {
    ...state,
    refresh: () => fetchSingleLense(),
  };
};

export default useGetSingleLense;
