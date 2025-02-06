import { useState, useEffect, useCallback } from "react";
import axiosClient from "../../axiosClient";
import { AxiosError } from "axios";

interface stock {
    id: number;
    frame: number;
    initial_count: number;
    limit: string;
    qty: string | null; // Side can be "left", "right", or null
  }
  
  interface SingleFrame {
    brand: number;
    code: number; // This seems to be a reference to a parent frame ID
    color: number; // e.g., "Single Vision", "Progressive", "Bisocal"
    id: number; // e.g., "coating 1"
    image: null; // Initial quantity of the frame
    qty: number; // Current quantity of the frame
    price: number; // Limit for the frame
    size: string; // Array of power values
    species: string; // ISO 8601 date string
    stock: stock; // ISO 8601 date string
  }
interface UseGetSingleFrameReturn {
  singleFrame: SingleFrame | null;
  singleFrameLoading: boolean;
  singleFrameError: string | null;
  refresh: () => Promise<void>;
}

const useGetFrameHistory = (singleFrameId: string): UseGetSingleFrameReturn => {
  const [state, setState] = useState<Omit<UseGetSingleFrameReturn, 'refresh'>>({
    singleFrame: null,
    singleFrameLoading: true,
    singleFrameError: null,
  });

  const fetchSingleFrame = useCallback(async () => {
    try {
      setState({ singleFrame: null, singleFrameLoading: true, singleFrameError: null });

      const response = await axiosClient.get<SingleFrame>(`/frames/${singleFrameId}/`);

      setState({
        singleFrame: response.data,
        singleFrameLoading: false,
        singleFrameError: null,
      });
    } catch (err) {
      const error = err as AxiosError;
      const errorMessage = error.response?.data?.message || "Failed to fetch the singleFrame.";
      setState({
        singleFrame: null,
        singleFrameLoading: false,
        singleFrameError: errorMessage,
      });
    }
  },[] );

  useEffect(() => {
    fetchSingleFrame()
  }, [fetchSingleFrame]);

  return {
    ...state,
    refresh: () => fetchSingleFrame(),
  };
};

export default useGetFrameHistory;