import { useState, useEffect, useCallback, useRef } from "react";
import axiosClient from "../../axiosClient";

import { extractErrorMessage } from "../../utils/extractErrorMessage";
import axios from "axios";
import { TypeInStockBrand } from "../../model/StaticTypeModels";
import { BrandModel } from "../../model/BrandModel";

interface UseGetBrandReturn {
  brands: BrandModel[];
  brandsLoading: boolean;
  brandsError: string | null;
  refresh: () => void;
}

const useGetBrands = (brand_type: TypeInStockBrand): UseGetBrandReturn => {
  const [brands, setBrands] = useState<BrandModel[]>([]);
  const [brandsLoading, setBrandsLoading] = useState<boolean>(true);
  const [brandsError, setBrandsError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchBrands = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    // Create a new controller for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    setBrandsLoading(true);
    setBrandsError(null);

    try {
      const response = await axiosClient.get<BrandModel[]>("/brands/", {
        params: { brand_type: brand_type },
        signal: abortController.signal,
      });
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
    brands,
    brandsLoading,
    brandsError,
    refresh: fetchBrands,
  };
};

export default useGetBrands;
