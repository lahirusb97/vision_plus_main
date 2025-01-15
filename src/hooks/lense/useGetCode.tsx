import { useState, useEffect, useCallback } from "react";
import axiosClient from "../../axiosClient";

interface Codes {
  id: number;
  name: string;
  brand: number;
}

interface UseGetCoatingReturn {
  codes: Codes[];
  codesLoading: boolean;
  codesError: string | null;
  refresh: () => void;
}

const useGetCodes = (): UseGetCoatingReturn => {
  const [codes, setCodes] = useState<Codes[]>([]);
  const [codesLoading, setCodesLoading] = useState<boolean>(true);
  const [codesError, setCodesError] = useState<string | null>(null);

  const fetchCodes = useCallback(async () => {
    setCodesLoading(true);
    setCodesError(null);

    try {
      const response = await axiosClient.get<Codes[]>("/codes/");
      setCodes(response.data);
    } catch (err: any) {
      setCodesLoading(
        err?.response?.data?.message || "Failed to fetch doctors."
      );
    } finally {
      setCodesLoading(false);
    }
  }, []);

  // Automatically fetch data on mount
  useEffect(() => {
    fetchCodes();
  }, [fetchCodes]);

  return {
    codes,
    codesLoading,
    codesError,
    refresh: fetchCodes,
  };
};

export default useGetCodes;
