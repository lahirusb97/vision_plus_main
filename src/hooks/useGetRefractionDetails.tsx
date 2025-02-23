import { useState, useEffect, useCallback } from "react";

import { RefractionDetailModel } from "../model/RefractionDetailModel";
import axiosClient from "../axiosClient";
import axios from "axios";
import toast from "react-hot-toast";

interface UseGetRefractionDetailReturn {
  refractionDetail: RefractionDetailModel;
  refractionDetailLoading: boolean;
  refractionDetailError: boolean;
  refresh: () => void;
}

const useGetRefractionDetails = (
  refractionNumber: string | undefined
): UseGetRefractionDetailReturn => {
  const [refractionDetail, setrefractionDetail] = useState(
    {} as RefractionDetailModel
  );
  const [refractionDetailLoading, setrefractionDetailLoading] =
    useState<boolean>(true);
  const [refractionDetailError, setrefractionDetailError] =
    useState<boolean>(false);

  const fetchrefractionDetail = useCallback(async () => {
    setrefractionDetailLoading(true);
    setrefractionDetailError(false);

    try {
      const response = await axiosClient.get<RefractionDetailModel>(
        `/refractions/${refractionNumber}/`
      );
      setrefractionDetail(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 404) {
          setrefractionDetailError(true);
        }
      } else {
        setrefractionDetailError(false);
        toast.error("Network Error");
      }
    } finally {
      setTimeout(() => {
        setrefractionDetailLoading(false);
        if (refractionDetailError) {
          toast.success("Refraction Detail recived successfully");
        } else {
          toast.error("Refraction Detail not found");
        }
      }, 2000);
    }
  }, []);

  // Automatically fetch data on mount
  useEffect(() => {
    fetchrefractionDetail();
  }, [fetchrefractionDetail]);

  return {
    refractionDetail,
    refractionDetailLoading,
    refractionDetailError,
    refresh: fetchrefractionDetail,
  };
};

export default useGetRefractionDetails;
