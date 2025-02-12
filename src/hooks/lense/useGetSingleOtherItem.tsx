import { useState, useEffect, useCallback } from "react";
import axiosClient from "../../axiosClient";
import { AxiosError } from "axios";

interface SingleOtherItem {
  lens_cleaner: number;
  initial_count: number;
  qty: number;
  }
  
interface UseGetSingleOtherItemReturn {
  singleOtherItem: SingleOtherItem | null;
  singleOtherItemLoading: boolean;
  singleOtherItemError: string | null;
  refresh: () => Promise<void>;
}

const useGetSingleOtherItem = (singleOtherItemId: string): UseGetSingleOtherItemReturn => {
  const [state, setState] = useState<Omit<UseGetSingleOtherItemReturn, 'refresh'>>({
    singleOtherItem: null,
    singleOtherItemLoading: true,
    singleOtherItemError: null,
  });

  const fetchSingleOtherItem = useCallback(async () => {
    try {
      setState({ singleOtherItem: null, singleOtherItemLoading: true, singleOtherItemError: null });

      const response = await axiosClient.get<SingleOtherItem>(`/lens-cleaners/${singleOtherItemId}/`);

      setState({
        singleOtherItem: response.data,
        singleOtherItemLoading: false,
        singleOtherItemError: null,
      });
    } catch (err) {
      const error = err as AxiosError;
      const errorMessage = error.response?.data?.message || "Failed to fetch the singleOtherItem.";
      setState({
        singleOtherItem: null,
        singleOtherItemLoading: false,
        singleOtherItemError: errorMessage,
      });
    }
  },[] );

  useEffect(() => {
    fetchSingleOtherItem()
  }, [fetchSingleOtherItem]);

  return {
    ...state,
    refresh: () => fetchSingleOtherItem(),
  };
};

export default useGetSingleOtherItem;