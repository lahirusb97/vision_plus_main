import { useState, useEffect, useCallback, useRef } from "react";
import axiosClient from "../../axiosClient";
import { LenseModel } from "../../model/LenseModel";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import { getUserCurentBranch } from "../../utils/authDataConver";
import axios from "axios";

interface UseGetSingleLenseReturn {
  singleLense: LenseModel | null;
  singleLenseLoading: boolean;
  singleLenseError: boolean;
  refresh: () => Promise<void>;
}

const useGetSingleLense = (singleLenseId: string | undefined) => {
  const [state, setState] = useState<Omit<UseGetSingleLenseReturn, "refresh">>({
    singleLense: null,
    singleLenseLoading: true,
    singleLenseError: false,
  });
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchSingleLense = useCallback(async () => {
    const controller = new AbortController();

    if (singleLenseId) {
      try {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
        abortControllerRef.current = controller;
        setState({
          singleLense: null,
          singleLenseLoading: true,
          singleLenseError: false,
        });

        const response = await axiosClient.get<LenseModel>(
          `/lenses/${singleLenseId}/`,
          {
            params: {
              branch_id: getUserCurentBranch()?.id,
            },
            signal: controller.signal,
          }
        );
        if (!controller.signal.aborted) {
          setState({
            singleLense: response.data,
            singleLenseLoading: false,
            singleLenseError: false,
          });
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          return;
        }
        if (!controller.signal.aborted) {
          extractErrorMessage(err);
          setState({
            singleLense: null,
            singleLenseLoading: false,
            singleLenseError: true,
          });
        }
      }
    }
  }, [singleLenseId]);

  useEffect(() => {
    fetchSingleLense();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchSingleLense]);

  return {
    ...state,
    refresh: () => fetchSingleLense(),
  };
};

export default useGetSingleLense;
