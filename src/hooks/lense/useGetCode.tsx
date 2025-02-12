import { useState, useEffect, useCallback } from "react";
import axiosClient from "../../axiosClient";
import { CodeModel } from "../../model/CodeModel";
import { handleError } from "../../utils/handleError";

interface UseGetCoatingReturn {
  codes: CodeModel[];
  codesLoading: boolean;
  codesError: string | null;
  refresh: () => void;
}

const useGetCodes = (): UseGetCoatingReturn => {
  const [codes, setCodes] = useState<CodeModel[]>([]);
  const [codesLoading, setCodesLoading] = useState<boolean>(true);
  const [codesError, setCodesError] = useState<string | null>(null);

  const fetchCodes = useCallback(async () => {
    setCodesLoading(true);
    setCodesError(null);

    try {
      const response = await axiosClient.get<CodeModel[]>("/codes/");
      setCodes(response.data);
    } catch (err) {
      handleError(err, "Failed to fetch codes.");
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
