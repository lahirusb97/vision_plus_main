import { useState, useEffect, useCallback } from "react";
import axiosClient from "../../axiosClient";

interface Frame {
  brand: number;
  id: number;
  name: string;
  description: string;
}

interface UseGetFrameReturn {
  frames: Frame[];
  framesLoading: boolean;
  framesError: string | null;
  refresh: () => void;
}

const useGetFrames = (): UseGetFrameReturn => {
  const [frames, setFrames] = useState<Frame[]>([]);
  const [framesLoading, setFramesLoading] = useState<boolean>(true);
  const [framesError, setFramesError] = useState<string | null>(null);

  const fetchFrames = useCallback(async () => {
    setFramesLoading(true);
    setFramesError(null);

    try {
      const response = await axiosClient.get<Frame[]>("/frames/");
      setFrames(response.data);
    } catch (err: any) {
      setFramesLoading(
        err?.response?.data?.message || "Failed to fetch doctors."
      );
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
