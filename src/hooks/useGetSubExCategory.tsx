import { useState, useEffect, useCallback } from "react";
import axiosClient from "../axiosClient";

interface Colors {
  id: number;
  name: string;
}

interface UseGetCoatingReturn {
  subExCategory: Colors[];
  subExCategoryLoading: boolean;
  subExCategoryError: string | null;
  subExCategoryRefresh: () => void;
}

const useGetSubExCategory = (): UseGetCoatingReturn => {
  const [colors, setColors] = useState<Colors[]>([]);
  const [colorsLoading, setColorsLoading] = useState<boolean>(true);
  const [colorsError, setColorsError] = useState<string | null>(null);

  const fetchColors = useCallback(async () => {
    setColorsLoading(true);
    setColorsError(null);

    try {
      const response = await axiosClient.get<Colors[]>(
        "expense-subcategories/"
      );
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
    subExCategory: colors,
    subExCategoryLoading: colorsLoading,
    subExCategoryError: colorsError,
    subExCategoryRefresh: fetchColors,
  };
};

export default useGetSubExCategory;
