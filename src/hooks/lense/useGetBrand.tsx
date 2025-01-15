import { useState, useEffect, useCallback } from "react";
import axiosClient from "../../axiosClient";

interface Brand {
  id: number;
  name: string;
  description: string;
}

interface UseGetBrandReturn {
  brands: Brand[];
  brandsLoading: boolean;
  brandsError: string | null;
  refresh: () => void;
}

const useGetBrands = (): UseGetBrandReturn => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [brandsLoading, setBrandsLoading] = useState<boolean>(true);
  const [brandsError, setBrandsError] = useState<string | null>(null);

  const fetchBrands = useCallback(async () => {
    setBrandsLoading(true);
    setBrandsError(null);

    try {
      const response = await axiosClient.get<Brand[]>("/brands/");
      setBrands(response.data);
    } catch (err: any) {
      setBrandsLoading(
        err?.response?.data?.message || "Failed to fetch doctors."
      );
    } finally {
      setBrandsLoading(false);
    }
  }, []);

  // Automatically fetch data on mount
  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  return {
    brands,
    brandsLoading,
    brandsError,
    refresh: fetchBrands,
  };
};

export default useGetBrands;
