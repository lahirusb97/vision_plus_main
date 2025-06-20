import { useState, useEffect, useCallback, useRef } from "react";
import axiosClient from "../axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import axios from "axios";
import dayjs from "dayjs";
import { paramsNullCleaner } from "../utils/paramsNullCleaner";
import { getUserCurentBranch } from "../utils/authDataConver";
interface AuditResult {
  invoice_number: string;
  order_id: number;
  order_details: boolean;
  order_item: boolean;
  order_payment: boolean;
  refraction_details: boolean;
}

interface AuditResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: AuditResult[];
}

interface OrderAuditParams {
  page: number;
  page_size: number;
  start_date: string;
  end_date: string;
}

export interface OrderAuditData {
  data: AuditResponse | null;
  loading: boolean;
  error: boolean;
  params: OrderAuditParams;
  fetchData: () => void;
  setParams: (newParams: Partial<OrderAuditParams>) => void;
}

export const useGetOrderAudit = (): OrderAuditData => {
  const [data, setData] = useState<AuditResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [params, setParams] = useState<OrderAuditParams>({
    page: 1,
    page_size: 10,
    start_date: dayjs().format("YYYY-MM-DD"),
    end_date: dayjs().format("YYYY-MM-DD"),
  });
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;
    setLoading(true);

    try {
      const response: { data: AuditResponse } = await axiosClient.get(
        `audit/orders/`,
        {
          params: {
            branch_id: getUserCurentBranch()?.id,
            ...paramsNullCleaner(params),
          },
          signal: controller.signal,
        }
      );

      if (!controller.signal.aborted) {
        setData(response.data);
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        return;
      }
      if (!controller.signal.aborted) {
        setData(null);
        extractErrorMessage(err);
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  }, [params]);

  const setParamsData = (newParams: Partial<OrderAuditParams>) => {
    setParams((prev) => ({
      ...prev,
      ...newParams,
    }));
  };

  useEffect(() => {
    fetchData();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    params,
    fetchData,
    setParams: setParamsData,
  };
};

export default useGetOrderAudit;
