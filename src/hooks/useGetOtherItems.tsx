import { useState, useEffect, useCallback } from "react";
import axiosClient from "../axiosClient";
interface Items {
  id: number;
  name: string;
  price: number;
}

interface UseGetLenseReturn {
  items: Items[];
  itemsLoading: boolean;
  itemsError: string | null;
  refresh: () => void;
}

const useGetOtherItems = (): UseGetLenseReturn => {
  const [items, setItems] = useState<Items[]>([]);
  const [itemsLoading, setItemsLoading] = useState<boolean>(true);
  const [itemsError, setItemsError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    setItemsLoading(true);
    setItemsError(null);

    try {
      const response = await axiosClient.get<Items[]>("/lens-cleaners/");
      setItems(response.data);
    } catch (err: any) {
      setItemsError(
        err?.response?.data?.message || "Failed to fetch items."
      );
    } finally {
      setItemsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return {
    items,
    itemsLoading,
    itemsError,
    refresh: fetchItems,
  };
};

export default useGetOtherItems;