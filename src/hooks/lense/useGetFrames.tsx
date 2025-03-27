import { useState, useEffect, useCallback } from "react";
import axiosClient from "../../axiosClient";
import { FrameModel } from "../../model/FrameModel";
import { handleError } from "../../utils/handleError";
import { getUserCurentBranch } from "../../utils/authDataConver";
import { extractErrorMessage } from "../../utils/extractErrorMessage";

interface UseGetFrameReturn {
  frames: FrameModel[];
  framesLoading: boolean;
  framesError: string | null;
  refresh: () => void;
}

const useGetFrames = (): UseGetFrameReturn => {
  const [frames, setFrames] = useState<FrameModel[]>([]);
  const [framesLoading, setFramesLoading] = useState<boolean>(true);
  const [framesError, setFramesError] = useState<string | null>(null);

  const fetchFrames = useCallback(async () => {
    setFramesLoading(true);
    setFramesError(null);

    try {
      const response = await axiosClient.get<FrameModel[]>("/frames/", {
        params: {
          branch_id: getUserCurentBranch()?.id,
        },
      });
      setFrames(response.data);
    } catch (err) {
      extractErrorMessage(err);
    } finally {
      setFramesLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFrames();
  }, [fetchFrames]);

  return {
    frames,
    framesLoading,
    framesError,
    refresh: fetchFrames,
  };
};

export default useGetFrames;
