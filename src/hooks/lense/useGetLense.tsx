import { useState, useEffect, useCallback, useRef } from "react";
import axiosClient from "../../axiosClient";
import { LenseModel } from "../../model/LenseModel";
import { getUserCurentBranch } from "../../utils/authDataConver";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
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
  store_id: number | null | undefined;
}

const useGetLenses = ({
  store_id,
}: {
  store_id: number | null | undefined;
}): UseGetLenseReturn => {
  const [lenses, setLenses] = useState<LenseModel[]>([]);
  const [lensesLoading, setLensesLoading] = useState<boolean>(true);
  const [lensesError, setLensesError] = useState<boolean>(false);
  const [params, setParams] = useState<LenseParams>({
    status: "active",
    store_id: store_id ? store_id : null,
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
        signal: controller.signal,
      });

      if (!controller.signal.aborted) {
        setLenses(response.data);
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      }

      if (!controller.signal.aborted) {
        setLensesError(true);
        extractErrorMessage(error);
      }
    } finally {
      if (!controller.signal.aborted) {
        setLensesLoading(false);
      }
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

  useEffect(() => {
    setParams((prev) => ({
      ...prev,
      store_id: store_id ? store_id : null,
    }));
  }, [store_id]);

  const setLenseParamsData = (newParams: Partial<LenseParams>) => {
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
    setLenseParamsData,
  };
};

export default useGetLenses;
