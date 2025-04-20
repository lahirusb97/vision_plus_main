import { useState, useEffect, useCallback } from "react";
import axiosClient from "../axiosClient";

interface Colors {
  id: number;
  name: string;
}

interface UseGetCoatingReturn {
  exCategory: Colors[];
  exCategoryLoading: boolean;
  exCategoryError: string | null;
  exCategoryRefresh: () => void;
}

const useGetExCategory = (): UseGetCoatingReturn => {
  const [colors, setColors] = useState<Colors[]>([]);
  const [colorsLoading, setColorsLoading] = useState<boolean>(true);
  const [colorsError, setColorsError] = useState<string | null>(null);

  const fetchColors = useCallback(async () => {
    setColorsLoading(true);
    setColorsError(null);

    try {
      const response = await axiosClient.get<Colors[]>("expense-categories/");
      setColors(response.data);
    } catch (err: any) {
      setColorsLoading(
        err?.response?.data?.message || "Failed to fetch doctors."
      );
    } finally {
      setColorsLoading(false);
    }
  }, []);

  // Automatically fetch data on mount
  useEffect(() => {
    fetchColors();
  }, [fetchColors]);

  return {
    exCategory: colors,
    exCategoryLoading: colorsLoading,
    exCategoryError: colorsError,
    exCategoryRefresh: fetchColors,
  };
};

export default useGetExCategory;
