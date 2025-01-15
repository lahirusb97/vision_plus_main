import { useState, useEffect, useCallback } from "react";
import axiosClient from "../../axiosClient";
import { AxiosError } from "axios";

interface LenseType {
  id: number;
  name: string;
  description: string;
}

interface UseGetLenseTypeReturn {
  lenseTypes: LenseType[];
  lenseTypesLoading: boolean;
  lenseTypesError: string | null;
  refresh: () => void;
}

const useGetLenseTypes = (): UseGetLenseTypeReturn => {
  const [lenseTypes, setLenseTypes] = useState<LenseType[]>([]);
  const [lenseTypesLoading, setLenseTypesLoading] = useState<boolean>(true);
  const [lenseTypesError, setLenseTypesError] = useState<string | null>(null);

  const fetchLenseTypes = useCallback(async () => {
    setLenseTypesLoading(true);
    setLenseTypesError(null);

    try {
      const response = await axiosClient.get<LenseType[]>("/lens-types/");
      setLenseTypes(response.data);
    } catch (err: AxiosError | unknown) {
      setLenseTypesLoading(false);
      if (err instanceof AxiosError) {
        setLenseTypesError(err.response?.data?.message || "An error occurred");
      } else {
        setLenseTypesError("An error occurred");
      }
    } finally {
      setLenseTypesLoading(false);
    }
  }, []);

  // Automatically fetch data on mount
  useEffect(() => {
    fetchLenseTypes();
  }, [fetchLenseTypes]);

  return {
    lenseTypes,
    lenseTypesLoading,
    lenseTypesError,
    refresh: fetchLenseTypes,
  };
};

export default useGetLenseTypes;
