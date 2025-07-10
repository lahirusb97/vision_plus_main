import { useState, useEffect, useCallback, useRef } from "react";
import axiosClient from "../axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import toast from "react-hot-toast";

import axios from "axios";
import { getUserCurentBranch } from "../utils/authDataConver";
import { paramsNullCleaner } from "../utils/paramsNullCleaner";
export interface OrderImageListParams {
  order_id: number;
}
interface OrderImageData {
  id: number;
  image: string;
  uploaded_at: string;
}

const useGetOrderImages = ({ order_id }: OrderImageListParams) => {
  //use null or [] base on scenario
  const [dataList, SetDataList] = useState<OrderImageData[] | []>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [params, setParams] = useState<OrderImageListParams>({
    order_id: order_id,
  });
  const abortControllerRef = useRef<AbortController | null>(null);

  const loadData = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;
    setLoading(true);
    try {
      const response: { data: OrderImageData[] } = await axiosClient.get(
        `orders/${order_id}/images/`,
        {
          params: {
            ...paramsNullCleaner(params),
            branch_id: getUserCurentBranch()?.id,
          },
          signal: controller.signal,
        }
      );
      // Only update state if this request wasn't aborted
      if (!controller.signal.aborted) {
        SetDataList(response.data);
        setTotalCount(response.data?.length);
        if (response.data?.length > 0) {
          toast.success("Images found ");
        } else {
          toast.error("No images found");
        }
      }

      // setTotalCount(response.data.count);
    } catch (err) {
      // Check if the error is a cancellation
      if (axios.isCancel(err)) {
        return;
      }
      // Only update error state if this request wasn't aborted
      if (!controller.signal.aborted) {
        SetDataList([]);
        extractErrorMessage(err);
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  }, [params]);

  const setParamsData = (newParams: OrderImageListParams) => {
    // use null to remove params
    setParams((prev) => ({
      ...prev,
      ...newParams,
    }));
  };
  useEffect(() => {
    // Call loadData directly - it will handle its own cleanup
    loadData();
    // Return cleanup function for component unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [loadData]);

  return {
    orderImageList: dataList,
    orderImageListLoading: loading,
    orderImageListError: error,
    orderImageListTotalCount: totalCount,
    orderImageListSearch: setParamsData,
    orderImageListRefresh: loadData,
  };
};

export default useGetOrderImages;
