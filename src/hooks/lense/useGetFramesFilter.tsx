import { useState, useEffect, useCallback, useRef } from "react";
import axiosClient from "../../axiosClient";
import { FrameModel, SizeType, SpeciesType } from "../../model/FrameModel";
import { getUserCurentBranch } from "../../utils/authDataConver";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import { paramsNullCleaner } from "../../utils/paramsNullCleaner";
import axios from "axios";

export interface FilteredFrameGroup {
  brand: string;
  brand_id: number;
  code: string;
  code_id: number;
  color_name: string;
  image_url: string;
  size: SizeType;
  species: SpeciesType;
  price: number;
  total_qty: number;
  frames: FrameModel[];
}
interface UseGetFrameReturn {
  frames: FilteredFrameGroup[];
  framesLoading: boolean;
  framesError: boolean;
  refresh: () => void;
  setFrameParamsData: (newParams: FrameParams) => void;
}
interface FrameParams {
  status: "inactive" | "active" | "all" | null;
}

const useGetFramesFilter = (): UseGetFrameReturn => {
  const [frames, setFrames] = useState<FilteredFrameGroup[]>([]);
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
      const response = await axiosClient.get<FilteredFrameGroup[]>(
        "/frames/filter",
        {
          params: {
            branch_id: getUserCurentBranch()?.id,
            ...paramsNullCleaner(params),
          },
          signal: controller.signal,
        }
      );
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

export default useGetFramesFilter;
