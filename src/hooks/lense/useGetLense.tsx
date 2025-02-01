import { useState, useEffect, useCallback } from "react";
import axiosClient from "../../axiosClient";

interface LensPower {
  id: number;
  lens: number;
  power: number;
  value: string;
  side: string;
}

interface LensStock {
  id: number;
  lens: number;
  lens_type: string;
  coating: string;
  initial_count: number;
  qty: number;
  limit: number;
  powers: LensPower[];
  created_at: string;
  updated_at: string;
}

interface Lens {
  id: number;
  type: number;
  coating: number;
  price: string;
  stock: LensStock;
  powers: LensPower[];
}

interface UseGetLenseReturn {
  lenses: Lens[];
  lensesLoading: boolean;
  lensesError: string | null;
  refresh: () => void;
}

const useGetLenses = (): UseGetLenseReturn => {
  const [lenses, setLenses] = useState<Lens[]>([]);
  const [lensesLoading, setLensesLoading] = useState<boolean>(true);
  const [lensesError, setLensesError] = useState<string | null>(null);

  const fetchLenses = useCallback(async () => {
    setLensesLoading(true);
    setLensesError(null);

    try {
      const response = await axiosClient.get<Lens[]>("/lenses/");
      setLenses(response.data);
    } catch (err: any) {
      setLensesError(
        err?.response?.data?.message || "Failed to fetch lenses."
      );
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