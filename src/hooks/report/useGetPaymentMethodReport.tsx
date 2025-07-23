import { useState, useEffect, useCallback, useRef } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import axiosClient from "../../axiosClient";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import { paramsNullCleaner } from "../../utils/paramsNullCleaner";
import { getUserCurentBranch } from "../../utils/authDataConver";
import dayjs from "dayjs";

interface FilterParams {
  start_date: string | null;
  end_date: string | null;
}

interface PaymentMethodReportData {
  branch_id: number;
  branch_name: string;
  total_cash: number;
  total_card: number;
  total_online_transfer: number;
}

interface PaymentMethodReport {
  sub_total_payments: number;
  payments: PaymentMethodReportData[];
}

const useGetPaymentMethodReport = () => {
  const [Data, setData] = useState<PaymentMethodReportData[]>([]);
  const [Summary, setSummary] = useState<number>(0);
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
      const response: { data: PaymentMethodReport } = await axiosClient.get(
        `reports/payment-method/`,
        {
          params: {
            ...paramsNullCleaner(params),
            branch_id: getUserCurentBranch()?.id,
          },
          signal: controller.signal,
        }
      );
      if (!controller.signal.aborted) {
        setData(response.data.payments);
        setSummary(response.data.sub_total_payments);

        toast.success("Banking Report found ");
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        return;
      }
      if (!controller.signal.aborted) {
        setData([]);
        setSummary(0);
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
    paymentMethodReportData: Data,
    paymentMethodReportSummary: Summary,
    paymentMethodReportLoading: loading,
    paymentMethodReportListRefres: loadData,
    paymentMethodReportError: error,
    setPaymentMethodReportParamsData: setParamsData,
  };
};

export default useGetPaymentMethodReport;
