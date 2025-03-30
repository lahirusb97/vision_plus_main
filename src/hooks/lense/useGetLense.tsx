import { useState, useEffect, useCallback } from "react";
import axiosClient from "../../axiosClient";
import { LenseModel } from "../../model/LenseModel";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import { getUserCurentBranch } from "../../utils/authDataConver";

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
      const response = await axiosClient.get<LenseModel[]>("/lenses/", {
        params: {
          branch_id: getUserCurentBranch()?.id,
        },
      });
      console.log(response.data);
      setLenses(response.data);
    } catch (err) {
      extractErrorMessage(err);
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
