import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import axiosClient from "../axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import { REFUND_MAIN_CAT_ID } from "../data/staticVariables";

interface ExpenceCategory {
  id: number;
  name: string;
}

interface UseGetExCategoryReturn {
  exCategory: ExpenceCategory[];
  exCategoryLoading: boolean;
  exCategoryError: boolean;
  exCategoryRefresh: (signal?: AbortSignal) => void;
}

export function useGetExCategory(): UseGetExCategoryReturn {
  const [exCategory, setExCategory] = useState<ExpenceCategory[]>([]);
  const [exCategoryLoading, setExCategoryLoading] = useState(true);
  const [exCategoryError, setExCategoryError] = useState(false);

  const fetchExCategory = useCallback(async (signal?: AbortSignal) => {
    setExCategoryLoading(true);
    setExCategoryError(false);

    try {
      const response = await axiosClient.get<ExpenceCategory[]>(
        "expense-categories/",
        { signal }
      );
      const filteredData = response.data.filter(
        (category: { id: number }) => category.id !== REFUND_MAIN_CAT_ID
      );
      setExCategory(filteredData);
    } catch (error) {
      if (axios.isCancel(error)) {
        // Request cancelled
        return;
      }
      setExCategoryError(true);
      extractErrorMessage(error);
      setExCategory([]);
    } finally {
      setExCategoryLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchExCategory(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchExCategory]);

  return {
    exCategory,
    exCategoryLoading,
    exCategoryError,
    exCategoryRefresh: fetchExCategory,
  };
}
