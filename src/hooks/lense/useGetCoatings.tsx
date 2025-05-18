import { useState, useEffect, useCallback, useRef } from "react";
import axiosClient from "../../axiosClient";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import axios from "axios";

interface Coating {
  id: number;
  name: string;
  description: string;
}

interface UseGetCoatingReturn {
  coatings: Coating[];
  coatingsLoading: boolean;
  coatingsError: boolean;
  refresh: () => void;
}

const useGetCoatings = (): UseGetCoatingReturn => {
  const [coatings, setCoatings] = useState<Coating[]>([]);
  const [coatingsLoading, setCoatingsLoading] = useState<boolean>(true);
  const [coatingsError, setCoatingsError] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchCoatings = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    setCoatingsLoading(true);
    setCoatingsError(false);

    try {
      const response = await axiosClient.get<Coating[]>("/lens-coatings/");
      setCoatings(response.data);
    } catch (err) {
      if (axios.isCancel(err)) {
        return;
      }
      if (!abortController.signal.aborted) {
        extractErrorMessage(err);
        setCoatingsError(true);
      }
    } finally {
      setCoatingsLoading(false);
    }
  }, []);

  // Automatically fetch data on mount
  useEffect(() => {
    fetchCoatings();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchCoatings]);

  return {
    coatings,
    coatingsLoading,
    coatingsError,
    refresh: fetchCoatings,
  };
};

export default useGetCoatings;
