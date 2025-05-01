import { useState, useEffect, useCallback, useRef } from "react";
import axiosClient from "../../axiosClient";

import { extractErrorMessage } from "../../utils/extractErrorMessage";
import axios from "axios";

interface Brand {
  id: number;
  name: string;
  description: string;
}

interface UseGetBrandReturn {
  externalCoatings: Brand[];
  externalCoatingsLoading: boolean;
  externalCoatingsError: boolean;
  externalCoatingsRefresh: () => void;
}

const useGetExternalCoating = (): UseGetBrandReturn => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [brandsLoading, setBrandsLoading] = useState<boolean>(true);
  const [brandsError, setBrandsError] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchBrands = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    // Create a new controller for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    setBrandsLoading(true);
    setBrandsError(false);

    try {
      const response = await axiosClient.get<Brand[]>(
        "external-lens-coatings/",
        {
          signal: abortController.signal,
        }
      );
      // Only update state if this request wasn't aborted
      if (!abortController.signal.aborted) {
        setBrands(response.data);
      }
    } catch (err) {
      // Check if the error is a cancellation
      if (axios.isCancel(err)) {
        return;
      }
      // Only update error state if this request wasn't aborted
      if (!abortController.signal.aborted) {
        extractErrorMessage(err);
        setBrandsError(true);
      }
    } finally {
      setBrandsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Automatically fetch data on mount
  useEffect(() => {
    fetchBrands();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchBrands]);

  return {
    externalCoatings: brands,
    externalCoatingsLoading: brandsLoading,
    externalCoatingsError: brandsError,
    externalCoatingsRefresh: fetchBrands,
  };
};

export default useGetExternalCoating;
