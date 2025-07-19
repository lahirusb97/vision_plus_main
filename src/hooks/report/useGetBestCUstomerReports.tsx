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
  min_budget?: number;
  include_invoices?: boolean;
  include_summary?: boolean;
}

export interface CustomerInvoiceData {
  order_id: number;
  invoice_number: string;
  invoice_type: string;
  order_date: string;
  total_price: number;
  sub_total: number;
  discount: number;
  status: string;
}

export interface BestCustomerData {
  customer_id: number;
  customer_name: string;
  nic: string;
  address: string;
  mobile_number: string;
  total_factory_order_amount: number;
  number_of_orders: number;
  total_factory_order_count: number;
  invoices: CustomerInvoiceData[];
  invoice_count: number;
}

interface BestCustomerCriteria {
  start_date: string;
  end_date: string;
  min_budget: number;
  include_invoices: boolean;
}

interface BestCustomerSummary {
  date_range: {
    start: string;
    end: string;
  };
  criteria: {
    min_budget: number;
  };
  statistics: {
    total_customers: number;
    qualifying_customers: number;
    total_factory_orders: number;
    total_revenue: number;
    qualifying_revenue: number;
    percentage_qualifying: number;
  };
}

interface BestCustomerReportResponse {
  customers: BestCustomerData[];
  criteria: BestCustomerCriteria;
  count: number;
  generated_at: string;
  summary: BestCustomerSummary;
}

const useGetBestCUstomerReports = () => {
  const [Data, setData] = useState<BestCustomerData[]>([]);
  const [Summary, setSummary] = useState<BestCustomerSummary>({
    date_range: {
      start: "",
      end: "",
    },
    criteria: {
      min_budget: 0,
    },
    statistics: {
      total_customers: 0,
      qualifying_customers: 0,
      total_factory_orders: 0,
      total_revenue: 0,
      qualifying_revenue: 0,
      percentage_qualifying: 0,
    },
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [params, setParams] = useState<FilterParams>({
    start_date: dayjs().format("YYYY-MM-DD"),
    end_date: dayjs().format("YYYY-MM-DD"),
    min_budget: 0,
    include_invoices: true,
    include_summary: true,
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
      const response = await axiosClient.get(`reports/best-customers/`, {
        params: {
          ...paramsNullCleaner(params),
          branch_id: getUserCurentBranch()?.id,
        },
        signal: controller.signal,
      });
      if (!controller.signal.aborted) {
        const responseData: BestCustomerReportResponse = response.data.data;
        setData(responseData.customers);
        setSummary(responseData.summary);
        console.log(response.data);
        toast.success("Best Customer Report found");
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        return;
      }
      if (!controller.signal.aborted) {
        setData([]);
        setSummary({
          date_range: {
            start: "",
            end: "",
          },
          criteria: {
            min_budget: 0,
          },
          statistics: {
            total_customers: 0,
            qualifying_customers: 0,
            total_factory_orders: 0,
            total_revenue: 0,
            qualifying_revenue: 0,
            percentage_qualifying: 0,
          },
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
    bestCustomerReportData: Data,
    bestCustomerReportSummary: Summary,
    bestCustomerReportLoading: loading,
    bestCustomerReportListRefresh: loadData,
    bestCustomerReportError: error,
    setBestCustomerReportParamsData: setParamsData,
  };
};

export default useGetBestCUstomerReports;
