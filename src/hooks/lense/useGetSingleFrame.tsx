import { useState, useEffect, useCallback } from "react";
import axiosClient from "../../axiosClient";
import { AxiosError } from "axios";
import { FrameModel } from "../../model/FrameModel";

interface UseGetSingleFrameReturn {
  singleFrame: FrameModel | null;
  singleFrameLoading: boolean;
  singleFrameError: string | null;
  refresh: () => Promise<void>;
}

const useGetSingleFrame = (
  singleFrameId: string | undefined
): UseGetSingleFrameReturn => {
  const [state, setState] = useState<Omit<UseGetSingleFrameReturn, "refresh">>({
    singleFrame: null,
    singleFrameLoading: true,
    singleFrameError: null,
  });

  const fetchSingleFrame = useCallback(async () => {
    if (singleFrameId) {
      try {
        setState({
          singleFrame: null,
          singleFrameLoading: true,
          singleFrameError: null,
        });

        const response = await axiosClient.get<FrameModel>(
          `/frames/${singleFrameId}/`
        );

        setState({
          singleFrame: response.data,
          singleFrameLoading: false,
          singleFrameError: null,
        });
      } catch (err) {
        const error = err as AxiosError;
        const errorMessage =
          error.response?.data?.message || "Failed to fetch the singleFrame.";
        setState({
          singleFrame: null,
          singleFrameLoading: false,
          singleFrameError: errorMessage,
        });
      }
    }
  }, []);

  useEffect(() => {
    fetchSingleFrame();
  }, [fetchSingleFrame]);

  return {
    ...state,
    refresh: () => fetchSingleFrame(),
  };
};

export default useGetSingleFrame;
