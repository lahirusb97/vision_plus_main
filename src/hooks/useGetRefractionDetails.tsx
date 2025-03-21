import { useState, useEffect, useCallback } from "react";

import axiosClient from "../axiosClient";
import axios from "axios";
import toast from "react-hot-toast";
import { RefractionDetailModel } from "../model/RefractionDetailModel";
interface UseGetRefractionDetailReturn {
  refractionDetail: RefractionDetailModel;
  refractionDetailLoading: boolean;
  refractionDetailExist: boolean;
  refractionDetailError: boolean;
  refresh: () => void;
}

const useGetRefractionDetails = (
  refraction_id: string | undefined
): UseGetRefractionDetailReturn => {
  const [refractionDetail, setrefractionDetail] = useState(
    {} as RefractionDetailModel
  );
  const [refractionDetailLoading, setrefractionDetailLoading] =
    useState<boolean>(true);

  const [refractionDetailExist, setrefractionDetailExist] =
    useState<boolean>(false);
  const [refractionDetailError, setRefractionDetailError] =
    useState<boolean>(false);

  const fetchrefractionDetail = useCallback(async () => {
    setrefractionDetailLoading(true);

    try {
      const response = await axiosClient.get<RefractionDetailModel>(
        `/refractions/${refraction_id}/`
      );
      setrefractionDetail(response.data);
      setrefractionDetailExist(true);
      toast.success("Previous Refraction Detail Found loading..");

      setRefractionDetailError(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setrefractionDetailExist(false);
        toast.error("Refraction Details Not Found");
      }
      setRefractionDetailError(true);
    } finally {
      setrefractionDetailLoading(false);
    }
  }, [refraction_id]);

  // Automatically fetch data on mount
  useEffect(() => {
    fetchrefractionDetail();
  }, [fetchrefractionDetail]);

  return {
    refractionDetail,
    refractionDetailLoading,
    refractionDetailExist,
    refractionDetailError,
    refresh: fetchrefractionDetail,
  };
};

export default useGetRefractionDetails;
