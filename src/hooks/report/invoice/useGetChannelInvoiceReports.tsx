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

export interface ChannelInvoiceReportData {
  channel_id: number;
  channel_number: string;
  date: string;
  time: string;
  customer_name: string;
  address: string;
  mobile_number: string;
  total_amount: number;
  paid_amount: number;
  balance: number;
  bill: number;
}

interface ChannelInvoiceSummary {
  total_invoice_count: number;
  total_invoice_amount: number;
  total_paid_amount: number;
  total_balance: number;
}

const useGetChannelInvoiceReports = () => {
  const [Data, setData] = useState<ChannelInvoiceReportData[]>([]);
  const [Summary, setSummary] = useState<ChannelInvoiceSummary>({
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
      const response = await axiosClient.get(`reports/channel-orders/`, {
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
        toast.success("Channel Invoice found ");
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
    channelInvoiceReportData: Data,
    channelInvoiceReportSummary: Summary,
    channelInvoiceReportLoading: loading,
    channelInvoiceReportListRefres: loadData,
    channelInvoiceReportError: error,
    setChannelInvoiceReportParamsData: setParamsData,
  };
};

export default useGetChannelInvoiceReports;
