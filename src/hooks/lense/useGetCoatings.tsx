import { useState, useEffect, useCallback } from "react";
import axiosClient from "../../axiosClient";

interface Coating {
  id: number;
  name: string;
  description: string;
}

interface UseGetCoatingReturn {
  coatings: Coating[];
  coatingsLoading: boolean;
  coatingsError: string | null;
  refresh: () => void;
}

const useGetCoatings = (): UseGetCoatingReturn => {
  const [coatings, setCoatings] = useState<Coating[]>([]);
  const [coatingsLoading, setCoatingsLoading] = useState<boolean>(true);
  const [coatingsError, setCoatingsError] = useState<string | null>(null);

  const fetchCoatings = useCallback(async () => {
    setCoatingsLoading(true);
    setCoatingsError(null);

    try {
      const response = await axiosClient.get<Coating[]>("/lens-coatings/");
      setCoatings(response.data);
    } catch (err: any) {
      setCoatingsLoading(
        err?.response?.data?.message || "Failed to fetch doctors."
      );
    } finally {
      setCoatingsLoading(false);
    }
  }, []);

  // Automatically fetch data on mount
  useEffect(() => {
    fetchCoatings();
  }, [fetchCoatings]);

  return {
    coatings,
    coatingsLoading,
    coatingsError,
    refresh: fetchCoatings,
  };
};

export default useGetCoatings;
