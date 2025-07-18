import { useState, useEffect, useCallback, useRef } from "react";

import toast from "react-hot-toast";

import axios from "axios";
import axiosClient from "../../../axiosClient";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { paramsNullCleaner } from "../../../utils/paramsNullCleaner";
import { getUserCurentBranch } from "../../../utils/authDataConver";
import dayjs from "dayjs";
interface FilterParams {
  start_date: string | null;
  end_date: string | null;
}
interface NormalInvoiceReportData {
  refraction_number: string;
  invoice_number: string;
  date: string;
  time: string;
  customer_name: string;
  nic: string;
  address: string;
  mobile_number: string;
  total_amount: number;
  paid_amount: number;
  balance: number;
  bill: number;
}
interface NormalInvoiceSummary {
  total_balance: number;
  total_invoice_amount: number;
  total_invoice_count: number;
  total_paid_amount: number;
}

const useGetNormalInvoiceReports = () => {
  //use null or [] base on scenario
  const [Data, setData] = useState<NormalInvoiceReportData[]>([]);
  const [Summary, setSummary] = useState<NormalInvoiceSummary>({
    total_balance: 0,
    total_invoice_amount: 0,
    total_invoice_count: 0,
    total_paid_amount: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [params, setParams] = useState<FilterParams>({
    start_date: dayjs().format("YYYY-MM-DD"),
    end_date: dayjs().format("YYYY-MM-DD"),
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
      //TODO ASS MODEL
      const response = await axiosClient.get(`reports/normal-orders/`, {
        params: {
          ...paramsNullCleaner(params),
          branch_id: getUserCurentBranch()?.id,
        },
        signal: controller.signal,
      });
      // Only update state if this request wasn't aborted
      if (!controller.signal.aborted) {
        setData(response.data.data.orders);
        setSummary(response.data.data.summary);
        toast.success("Normal Invoice found ");
      }

      // setTotalCount(response.data.count);
    } catch (err) {
      // Check if the error is a cancellation
      if (axios.isCancel(err)) {
        return;
      }
      // Only update error state if this request wasn't aborted
      if (!controller.signal.aborted) {
        setData([]);
        setSummary({
          total_balance: 0,
          total_invoice_amount: 0,
          total_invoice_count: 0,
          total_paid_amount: 0,
        });
        extractErrorMessage(err);
        setError(true);
      }
    } finally {
      setLoading(false);
    }
    // return () => {
    //   abortController.abort();
    // };//! only need when useEffect des not use
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  const setParamsData = (newParams: FilterParams) => {
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
    normalInvoiceReportData: Data,
    normalInvoiceReportSummary: Summary,
    normalInvoiceReportLoading: loading,
    normalInvoiceReportListRefres: loadData,
    normalInvoiceReportError: error,
    setNormalInvoiceReportParamsData: setParamsData,
  };
};

export default useGetNormalInvoiceReports;
