import { useState, useEffect, useCallback, useRef } from "react";
import axiosClient from "../axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import toast from "react-hot-toast";

import { Invoice } from "../model/SingleInvoiceModel";
import { getUserCurentBranch } from "../utils/authDataConver";
import axios from "axios";
interface FilterParams {
  date: string | null;
}
const useGetReportOtherIncome = () => {
  const [Data, setData] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [params, setParams] = useState<FilterParams>({
    date: null,
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
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([, v]) => v !== undefined && v !== null)
      );
      const response: { data: Invoice } = await axiosClient.get(
        `other-incomes/`,
        {
          params: {
            ...cleanParams,
            branch: getUserCurentBranch()?.id,
          },
          signal: controller.signal,
        }
      );

      setData(response.data);
      toast.success("Maching Invoice found ");

      // setTotalCount(response.data.count);
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      }

      setData(null);
      extractErrorMessage(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [params.date]);
  const setParamsData = (newParams: FilterParams) => {
    setParams((prev) => ({
      ...prev,
      ...newParams,
    }));
  };
  useEffect(() => {
    loadData();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [loadData]);

  return {
    invoiceData: Data,
    invoiceLoading: loading,
    invoiceListRefres: loadData,
    invoiceError: error,
    setParamsData: setParamsData,
  };
};

export default useGetReportOtherIncome;
