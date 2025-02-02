import { useState, useEffect, useCallback } from "react";
import axiosClient from "../../axiosClient";
import { AxiosError } from "axios";

interface Power {
    id: number;
    lens: number;
    power: number;
    value: string;
    side: string | null; // Side can be "left", "right", or null
  }
  
interface Stock {
    id: number;
    lens: number;
    lens_type: number;
    coating: string;
    initial_count: string | null; // Side can be "left", "right", or null
    qty: string | null; // Side can be "left", "right", or null
    limit: string | null; // Side can be "left", "right", or null
    powers: string | null; // Side can be "left", "right", or null
  }
  
  interface SingleLense {
    id: number;
    type: number; 
    coating: string; 
    price: string; 
    brand: string;
    stock: Stock; 
    limit: number; // Limit for the lens
    powers: Power[]; // Array of power values
    created_at: string; // ISO 8601 date string
    updated_at: string; // ISO 8601 date string
  }
interface UseGetSingleLenseReturn {
  singleLense: SingleLense | null;
  singleLenseLoading: boolean;
  singleLenseError: string | null;
  refresh: () => Promise<void>;
}

const useGetSingleLense = (singleLenseId: number): UseGetSingleLenseReturn => {
  const [state, setState] = useState<Omit<UseGetSingleLenseReturn, 'refresh'>>({
    singleLense: null,
    singleLenseLoading: true,
    singleLenseError: null,
  });


  const fetchSingleLense = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, singleLenseLoading: true, singleLenseError: null }));

      const response = await axiosClient.get<SingleLense>(`/lenses/${singleLenseId}/`, );

      setState({
        singleLense: response.data,
        singleLenseLoading: false,
        singleLenseError: null,
      });
    } catch (err) {
    
      const error = err as AxiosError;
      const errorMessage = error.response?.data?.message || "Failed to fetch the singleLense.";

      setState(prev => ({
        ...prev,
        singleLenseLoading: false,
        singleLenseError: errorMessage,
      }));
    }
  }, []);

  useEffect(() => {
    
    fetchSingleLense();
  }, [fetchSingleLense]);

  return {
    ...state,
    refresh: () => fetchSingleLense(),
  };
};

export default useGetSingleLense;