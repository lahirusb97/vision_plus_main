import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import { ExternalLensFilterList } from "../model/ExternalLenseModel";
import { extractErrorMessage } from "../utils/extractErrorMessage";
interface FilterParams {
  lens_type?: number | null | undefined;
  coating?: number | null | undefined;
  brand?: number | null | undefined;
}
export const useGetExternalLenses = () => {
  const [data, setData] = useState<ExternalLensFilterList | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [params, setParams] = useState<FilterParams>({
    lens_type: null,
    coating: null,
    brand: null,
  });
  useEffect(() => {
    const fetchLenses = async () => {
      setLoading(true);
      setError(false);

      try {
        const cleanParams = Object.fromEntries(
          Object.entries(params).filter(
            ([, v]) => v !== undefined && v !== null
          )
        );
        console.log("cleanParams", cleanParams);

        const response = await axiosClient.get<ExternalLensFilterList>(
          "external_lenses/",
          {
            params: cleanParams,
          }
        );

        setData(response.data);
        setError(false);
      } catch (err) {
        extractErrorMessage(err);
        setError(true);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLenses();
  }, [params.brand, params.coating, params.lens_type]);
  const setExternalLenseParams = (newParams: FilterParams) => {
    setParams((prev) => ({
      ...prev,
      ...newParams,
    }));
  };

  return {
    externaLenseList: data,
    externaLenseListLoading: loading,
    externaLenseListError: error,
    setExternalLenseParams,
  };
};
