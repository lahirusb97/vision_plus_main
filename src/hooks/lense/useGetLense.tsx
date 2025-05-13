import { useState, useEffect, useCallback, useRef } from "react";
import axiosClient from "../../axiosClient";
import { LenseModel } from "../../model/LenseModel";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import { getUserCurentBranch } from "../../utils/authDataConver";
import { paramsNullCleaner } from "../../utils/paramsNullCleaner";
import axios from "axios";
interface UseGetLenseReturn {
  lenses: LenseModel[];
  lensesLoading: boolean;
  lensesError: boolean;
  refresh: () => void;
  setLenseParamsData: (newParams: LenseParams) => void;
}
interface LenseParams {
  status: "inactive" | "active" | "all" | null;
}
const useGetLenses = (): UseGetLenseReturn => {
  const [lenses, setLenses] = useState<LenseModel[]>([]);
  const [lensesLoading, setLensesLoading] = useState<boolean>(true);
  const [lensesError, setLensesError] = useState<boolean>(false);
  const [params, setParams] = useState<LenseParams>({
    status: "active",
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchLenses = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;
    setLensesLoading(true);
    setLensesError(false);
    try {
      const response = await axiosClient.get<LenseModel[]>("/lenses/", {
        params: {
          branch_id: getUserCurentBranch()?.id,
          ...paramsNullCleaner(params),
        },
      });

      setLenses(response.data);
    } catch (err) {
      if (axios.isCancel(err)) {
        return;
      }
      if (!controller.signal.aborted) {
        extractErrorMessage(err);
        setLensesError(true);
      }
    } finally {
      setLensesLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchLenses();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchLenses]);

  const setParamsData = (newParams: LenseParams) => {
    // use null to remove params
    setParams((prev) => ({
      ...prev,
      ...newParams,
    }));
  };

  return {
    lenses,
    lensesLoading,
    lensesError,
    refresh: fetchLenses,
    setLenseParamsData: setParamsData,
  };
};

export default useGetLenses;
