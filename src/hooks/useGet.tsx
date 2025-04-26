import { useState, useEffect, useCallback, useRef } from "react";
import axiosClient from "../axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import toast from "react-hot-toast";

import { Invoice } from "../model/SingleInvoiceModel";
interface FilterParams {
  param1: string | null;
}
const useCustomApiGet = () => {
  const [Data, setData] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [params, setParams] = useState<FilterParams>({
    param1: null,
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
      const response: { data: Invoice } = await axiosClient.get(`invoices/`, {
        params: params,
      });

      setData(response.data);
      toast.success("Maching Invoice found ");

      // setTotalCount(response.data.count);
    } catch (error) {
      setData(null);
      extractErrorMessage(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [params.param1]);
  const setParamsData = (newParams: FilterParams) => {
    setParams((prev) => ({
      ...prev,
      ...newParams,
    }));
  };
  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    invoiceData: Data,
    invoiceLoading: loading,
    invoiceListRefres: loadData,
    invoiceError: error,
    setParamsData: setParamsData,
  };
};

export default useCustomApiGet;
