import { useState, useEffect, useCallback } from "react";
import axiosClient from "../../axiosClient";
import { LenseModel } from "../../model/LenseModel";

interface UseGetLenseReturn {
  lenses: LenseModel[];
  lensesLoading: boolean;
  lensesError: string | null;
  refresh: () => void;
}

const useGetLenses = (): UseGetLenseReturn => {
  const [lenses, setLenses] = useState<LenseModel[]>([]);
  const [lensesLoading, setLensesLoading] = useState<boolean>(true);
  const [lensesError, setLensesError] = useState<string | null>(null);

  const fetchLenses = useCallback(async () => {
    setLensesLoading(true);
    setLensesError(null);

    try {
      const response = await axiosClient.get<LenseModel[]>("/lenses/");
      setLenses(response.data);
    } catch (err: any) {
      setLensesError(err?.response?.data?.message || "Failed to fetch lenses.");
    } finally {
      setLensesLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLenses();
  }, [fetchLenses]);

  return {
    lenses,
    lensesLoading,
    lensesError,
    refresh: fetchLenses,
  };
};

export default useGetLenses;
