import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import { ExternalLensModel } from "../model/ExternalLenseModel";

export default function useGetSingleExternalLens(
  id: number | string | undefined
) {
  const [externalLens, setExternalLens] = useState<ExternalLensModel | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(false);

      try {
        const response = await axiosClient.get(`external_lenses/${id}/`, {
          signal: controller.signal,
        });
        setExternalLens(response.data);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(true);
          extractErrorMessage(err);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, [id]);

  return {
    externalLens,
    externalLensLoading: loading,
    externalLensError: error,
  };
}
