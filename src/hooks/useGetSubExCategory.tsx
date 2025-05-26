import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import axiosClient from "../axiosClient";
import { REFUND_CHANNEL_ID } from "../data/staticVariables";

export function useGetSubExCategory() {
  const [subExCategories, setSubExCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchSubExCategories = useCallback(async (signal: AbortSignal) => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await axiosClient.get("expense-subcategories/", {
        signal,
      });
      const filteredData = response.data.filter(
        (subCategory: { id: number }) => subCategory.id !== REFUND_CHANNEL_ID
      );
      setSubExCategories(filteredData);
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      } else {
        setIsError(true);
      }
      setSubExCategories([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchSubExCategories(controller.signal);

    return () => {
      controller.abort(); // Cancel the request if component unmounts
    };
  }, [fetchSubExCategories]);

  return {
    subExCategory: subExCategories,
    subExCategoryLoading: isLoading,
    subExCategoryError: isError,
    subExCategoryRefresh: fetchSubExCategories,
  };
}
