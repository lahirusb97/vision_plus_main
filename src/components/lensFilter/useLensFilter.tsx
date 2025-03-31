import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { LenseModel } from "../../model/LenseModel";

export const useLensFilter = () => {
  const [leftFilterLoading, setLeftFilterLoading] = useState<boolean>(false);
  const [rightFilterLoading, setRightFilterLoading] = useState<boolean>(false);
  const [leftLens, setLeftLens] = useState<LenseModel | null>(null);
  const [rightLens, setRightLens] = useState<LenseModel | null>(null);
  useEffect(() => {
    return () => {
      // Cleanup function to prevent state updates on unmounted components
      setLeftFilterLoading(false);
      setRightFilterLoading(false);
    };
  }, []);
  const handleLeftLensFilter = async (
    params: Record<string, string | number | null>
  ) => {
    setLeftFilterLoading(true);

    try {
      const response = await axiosClient.get("/lenses/search/", {
        params: params,
      });
      setLeftLens(response.data);

      return response;

      // eslint-disable-next-line no-useless-catch
    } catch (error) {
      throw error;
      setLeftLens(null);
    } finally {
      setLeftFilterLoading(false);
    }
  };
  const handleRightLensFilter = async (
    params: Record<string, string | number | null>
  ) => {
    setRightFilterLoading(true);

    try {
      const response = await axiosClient.get("/lenses/search/", {
        params: params,
      });
      setRightLens(response.data);
      return response;
      // eslint-disable-next-line no-useless-catch
    } catch (error) {
      setRightLens(null);
      throw error;
    } finally {
      setRightFilterLoading(false);
    }
  };
  return {
    leftLens,
    rightLens,
    leftFilterLoading,
    rightFilterLoading,
    handleLeftLensFilter,
    handleRightLensFilter,
  };
};
