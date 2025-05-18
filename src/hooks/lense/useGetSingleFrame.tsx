import { useState, useEffect, useCallback, useRef } from "react";
import axiosClient from "../../axiosClient";
import { FrameModel } from "../../model/FrameModel";
import { getUserCurentBranch } from "../../utils/authDataConver";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import axios from "axios";

interface UseGetSingleFrameReturn {
  singleFrame: FrameModel | null;
  singleFrameLoading: boolean;
  singleFrameError: boolean;
  refresh: () => Promise<void>;
}

const useGetSingleFrame = (
  singleFrameId: string | undefined
): UseGetSingleFrameReturn => {
  const [state, setState] = useState<Omit<UseGetSingleFrameReturn, "refresh">>({
    singleFrame: null,
    singleFrameLoading: true,
    singleFrameError: false,
  });
  const abortControllerRef = useRef<AbortController | null>(null);
  console.log("singleFrameId", singleFrameId);

  const fetchSingleFrame = useCallback(async () => {
    if (singleFrameId) {
      try {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();
        setState({
          singleFrame: null,
          singleFrameLoading: true,
          singleFrameError: false,
        });

        const response = await axiosClient.get<FrameModel>(
          `/frames/${singleFrameId}/`,
          {
            params: {
              branch_id: getUserCurentBranch()?.id,
            },
            signal: abortControllerRef.current?.signal,
          }
        );
        if (!abortControllerRef.current?.signal.aborted) {
          setState({
            singleFrame: response.data,
            singleFrameLoading: false,
            singleFrameError: false,
          });
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          return;
        }
        if (!abortControllerRef.current?.signal.aborted) {
          extractErrorMessage(err);
          setState((prev) => ({
            ...prev,
            singleFrameLoading: false,
            singleFrameError: true,
          }));
        }
      } finally {
        setState((prev) => ({
          ...prev,
          singleFrameLoading: false,
        }));
      }
    } else {
      setState({
        singleFrame: null,
        singleFrameLoading: false,
        singleFrameError: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchSingleFrame();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchSingleFrame]);

  return {
    ...state,
    refresh: () => fetchSingleFrame(),
  };
};

export default useGetSingleFrame;
