import { useState, useEffect, useCallback, useRef } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import axiosClient from "../../../axiosClient";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { paramsNullCleaner } from "../../../utils/paramsNullCleaner";
import { getUserCurentBranch } from "../../../utils/authDataConver";
import dayjs from "dayjs";
import { ProgressStatusModel } from "../../../model/progressStatusModel";

interface FilterParams {
  start_date: string | null;
  end_date: string | null;
}

export interface FactoryInvoiceReportData {
  order_id: number;
  invoice_number: string;
  date: string;
  time: string;
  customer_name: string;
  address: string;
  mobile_number: string;
  total_amount: number;
  paid_amount: number;
  balance: number;
  bill: number;
  status: string;
  progress_status: ProgressStatusModel;
}

interface FactoryInvoiceSummary {
  total_invoice_count: number;
  total_invoice_amount: number;
  total_paid_amount: number;
  total_balance: number;
}

const useGetSolderingInvoiceReports = () => {
  const [Data, setData] = useState<FactoryInvoiceReportData[]>([]);
  const [Summary, setSummary] = useState<FactoryInvoiceSummary>({
    total_invoice_count: 0,
    total_invoice_amount: 0,
    total_paid_amount: 0,
    total_balance: 0,
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
      const response = await axiosClient.get(`reports/soldering-orders/`, {
        params: {
          ...paramsNullCleaner(params),
          branch_id: getUserCurentBranch()?.id,
        },
        signal: controller.signal,
      });
      if (!controller.signal.aborted) {
        setData(response.data.data.orders);
        setSummary(response.data.data.summary);
        console.log(response.data);
        toast.success("Soldering Invoice found ");
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        return;
      }
      if (!controller.signal.aborted) {
        setData([]);
        setSummary({
          total_invoice_count: 0,
          total_invoice_amount: 0,
          total_paid_amount: 0,
          total_balance: 0,
        });
        extractErrorMessage(err);
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  }, [params]);

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
    solderingInvoiceReportData: Data,
    solderingInvoiceReportSummary: Summary,
    solderingInvoiceReportLoading: loading,
    solderingInvoiceReportListRefres: loadData,
    solderingInvoiceReportError: error,
    setSolderingInvoiceReportParamsData: setParamsData,
  };
};

export default useGetSolderingInvoiceReports;
