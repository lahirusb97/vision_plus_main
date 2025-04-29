import { useState, useEffect, useCallback } from "react";
import axiosClient from "../../axiosClient";
import { FrameModel } from "../../model/FrameModel";
import { getUserCurentBranch } from "../../utils/authDataConver";
import { extractErrorMessage } from "../../utils/extractErrorMessage";

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

  const fetchSingleFrame = useCallback(async () => {
    if (singleFrameId) {
      try {
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
          }
        );

        setState({
          singleFrame: response.data,
          singleFrameLoading: false,
          singleFrameError: false,
        });
      } catch (err) {
        extractErrorMessage(err);
        setState({
          singleFrame: null,
          singleFrameLoading: false,
          singleFrameError: true,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
