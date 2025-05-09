import { useState, useEffect, useCallback, useRef } from "react";
import axiosClient from "../axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import toast from "react-hot-toast";
import { getUserCurentBranch } from "../utils/authDataConver";
import { InvoicePaymentReport } from "../model/InvoicePaymentReport";
import dayjs from "dayjs";
import axios from "axios";

// Type definitions

interface UseInvoiceReportsParams {
  payment_date: string; // Format: "YYYY-MM-DD"
}

const useInvoiceReports = () => {
  const [data, setData] = useState<InvoicePaymentReport[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [params, setParams] = useState<UseInvoiceReportsParams>({
    payment_date: dayjs().format("YYYY-MM-DD"),
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchInvoiceReports = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      // Validate date format
      if (!/^\d{4}-\d{2}-\d{2}$/.test(params.payment_date)) {
        throw new Error("Invalid date format. Use YYYY-MM-DD");
      }
      setLoading(true);
      setError(false);
      const response = await axiosClient.get<InvoicePaymentReport[]>(
        "reports/invoices/",
        {
          params: {
            payment_date: params.payment_date,
            branch_id: getUserCurentBranch()?.id,
          },
          signal: controller.signal,
        }
      );
      if (!controller.signal.aborted) {
        setData(response.data);
        toast.success("Invoice reports loaded successfully");
      }
    } catch (err) {
      // Check if the error is a cancellation
      if (axios.isCancel(err)) {
        return;
      }
      if (!controller.signal.aborted) {
        extractErrorMessage(err);
        setData([]);
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  }, [params.payment_date]);

  // Initial fetch
  useEffect(() => {
    fetchInvoiceReports();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchInvoiceReports]);

  // Refresh function
  const refresh = () => {
    fetchInvoiceReports();
  };
  const setParamsData = (newParams: UseInvoiceReportsParams) => {
    // use null to remove params
    setParams((prev) => ({
      ...prev,
      ...newParams,
    }));
  };
  return {
    invoiceReport: data,
    invoiceReportLoading: loading,
    invoiceReportError: error,
    refreshInvoiceReport: refresh,
    setInvoiceReportParamsData: setParamsData,
    isEmpty: !loading && data.length === 0,
  };
};

export default useInvoiceReports;
