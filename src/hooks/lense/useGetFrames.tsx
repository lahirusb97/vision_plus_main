import { useState, useEffect, useCallback, useRef } from "react";
import axiosClient from "../../axiosClient";
import { FrameModel } from "../../model/FrameModel";
import { getUserCurentBranch } from "../../utils/authDataConver";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import { paramsNullCleaner } from "../../utils/paramsNullCleaner";
import axios from "axios";

interface UseGetFrameReturn {
  frames: FrameModel[];
  framesLoading: boolean;
  framesError: boolean;
  refresh: () => void;
  setFrameParamsData: (newParams: FrameParams) => void;
}
interface FrameParams {
  status: "inactive" | "active" | "all" | null;
}
const useGetFrames = (): UseGetFrameReturn => {
  const [frames, setFrames] = useState<FrameModel[]>([]);
  const [framesLoading, setFramesLoading] = useState<boolean>(true);
  const [framesError, setFramesError] = useState<boolean>(false);
  const [params, setParams] = useState<FrameParams>({
    status: "active",
  });

  const abortControllerRef = useRef<AbortController | null>(null);
  console.log(frames);
  const fetchFrames = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;
    setFramesLoading(true);
    setFramesError(false);

    try {
      const response = await axiosClient.get<FrameModel[]>("/frames/", {
        params: {
          branch_id: getUserCurentBranch()?.id,
          ...paramsNullCleaner(params),
        },
        signal: controller.signal,
      });
      if (!controller.signal.aborted) {
        setFrames(response.data);
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        return;
      }
      if (!controller.signal.aborted) {
        extractErrorMessage(err);
        setFramesError(true);
      }
    } finally {
      setFramesLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchFrames();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchFrames]);
  const setParamsData = (newParams: FrameParams) => {
    // use null to remove params
    setParams((prev) => ({
      ...prev,
      ...newParams,
    }));
  };
  return {
    frames,
    framesLoading,
    framesError,
    refresh: fetchFrames,
    setFrameParamsData: setParamsData,
  };
};

export default useGetFrames;
