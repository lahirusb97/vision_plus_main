import { useState, useEffect, useCallback, useRef } from "react";
import axiosClient from "../../axiosClient";
import { BrandModel } from "../../model/BrandModel";
import { extractErrorMessage } from "../../utils/extractErrorMessage";

import axios from "axios";

interface UseGetSingleBrandReturn {
  singleBrand: BrandModel | null;
  singleBrandLoading: boolean;
  singleBrandError: boolean;
  refresh: () => Promise<void>;
}

const useGetSingleBrand = (singleBrandId: string | undefined) => {
  const [state, setState] = useState<Omit<UseGetSingleBrandReturn, "refresh">>({
    singleBrand: null,
    singleBrandLoading: true,
    singleBrandError: false,
  });
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchSingleBrand = useCallback(async () => {
    const controller = new AbortController();

    if (singleBrandId) {
      try {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
        abortControllerRef.current = controller;
        setState({
          singleBrand: null,
          singleBrandLoading: true,
          singleBrandError: false,
        });

        const response = await axiosClient.get<BrandModel>(
          `/brands/${singleBrandId}/`,
          {
            signal: controller.signal,
          }
        );
        if (!controller.signal.aborted) {
          setState({
            singleBrand: response.data,
            singleBrandLoading: false,
            singleBrandError: false,
          });
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          return;
        }
        if (!controller.signal.aborted) {
          extractErrorMessage(err);
          setState({
            singleBrand: null,
            singleBrandLoading: false,
            singleBrandError: true,
          });
        }
      }
    }
  }, [singleBrandId]);

  useEffect(() => {
    fetchSingleBrand();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchSingleBrand]);

  return {
    ...state,
    refresh: () => fetchSingleBrand(),
  };
};

export default useGetSingleBrand;
