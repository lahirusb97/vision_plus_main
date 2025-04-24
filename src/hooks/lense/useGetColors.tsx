import { useState, useEffect, useCallback } from "react";
import axiosClient from "../../axiosClient";
import { extractErrorMessage } from "../../utils/extractErrorMessage";

interface Colors {
  id: number;
  name: string;
  description: string;
}

interface UseGetCoatingReturn {
  colors: Colors[];
  colorsLoading: boolean;
  colorsError: string | null;
  refresh: () => void;
}

const useGetColors = (): UseGetCoatingReturn => {
  const [colors, setColors] = useState<Colors[]>([]);
  const [colorsLoading, setColorsLoading] = useState<boolean>(true);
  const [colorsError, setColorsError] = useState<string | null>(null);

  const fetchColors = useCallback(async () => {
    setColorsLoading(true);
    setColorsError(null);

    try {
      const response = await axiosClient.get<Colors[]>("/colors/");
      setColors(response.data);
    } catch (err) {
      extractErrorMessage(err);
    } finally {
      setColorsLoading(false);
    }
  }, []);

  // Automatically fetch data on mount
  useEffect(() => {
    fetchColors();
  }, [fetchColors]);

  return {
    colors,
    colorsLoading,
    colorsError,
    refresh: fetchColors,
  };
};

export default useGetColors;
