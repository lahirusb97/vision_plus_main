import { useState, useEffect, useCallback } from "react";
import axiosClient from "../../axiosClient";
import { handleError } from "../../utils/handleError";

interface Brand {
  id: number;
  name: string;
  brand_type: string;
}

interface UseGetBrandReturn {
  brands: Brand[];
  brandsLoading: boolean;
  brandsError: string | null;
  refresh: () => void;
}

const useGetBrands = ({
  brand_type,
}: {
  brand_type: string;
}): UseGetBrandReturn => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [brandsLoading, setBrandsLoading] = useState<boolean>(true);
  const [brandsError, setBrandsError] = useState<string | null>(null);

  const fetchBrands = useCallback(async () => {
    setBrandsLoading(true);
    setBrandsError(null);

    try {
      const response = await axiosClient.get<Brand[]>("/brands/", {
        params: { brand_type },
      });
      setBrands(response.data);
    } catch (err) {
      handleError(err, "Failed to Recive Brands.");
      console.log(err);
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
