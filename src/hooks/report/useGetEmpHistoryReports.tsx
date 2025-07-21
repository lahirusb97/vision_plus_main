import { useState, useEffect, useCallback, useRef } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import axiosClient from "../../axiosClient";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import { paramsNullCleaner } from "../../utils/paramsNullCleaner";
import dayjs from "dayjs";
import { BranchModel } from "../../model/BranchModel";

export interface EmpHistoryData {
  employee_id: number;
  user_code: string;
  username: string;
  full_name: string;
  branded_frames_sold_count: number;
  branded_lenses_sold_count: number;
  factory_order_count: number;
  normal_order_count: number;
  customer_feedback_count: number;
  total_count: number;
  total_sales_amount: number;
  total_orders: number;
  branch: BranchModel;
}

interface EmpHistoryCriteria {
  start_date: string;
  end_date: string;
  employee_code: string | null;
  branch_id: number | null;
}

interface BestCustomerSummary {
  criteria: {
    branch_id: number | null;
    start_date: string;
    end_date: string;
    employee_code: string | null;
  };
  count: number;
  generated_at: string;
  summary: {
    date_range: {
      start: string;
      end: string;
    };
    branch: number | null;
    totals: {
      active_employees: number;
      total_orders: number;
      total_revenue: number;
      total_frames_sold: number;
      total_lenses_sold: number;
      factory_orders: number;
      normal_orders: number;
    };
    averages: {
      avg_revenue_per_employee: number;
      avg_orders_per_employee: number;
      avg_items_per_order: number;
    };
  };
}

interface EmpHistoryReportResponse {
  employees: EmpHistoryData[];
  criteria: EmpHistoryCriteria;
  count: number;
  generated_at: string;
  summary: BestCustomerSummary;
}

const useGetEmpHistoryReports = () => {
  const [Data, setData] = useState<EmpHistoryData[]>([]);
  const [Summary, setSummary] = useState<BestCustomerSummary>({
    criteria: {
      branch_id: null,
      start_date: "",
      end_date: "",
      employee_code: null,
    },
    count: 0,
    generated_at: "",
    summary: {
      date_range: {
        start: "",
        end: "",
      },
      branch: null,
      totals: {
        active_employees: 0,
        total_orders: 0,
        total_revenue: 0,
        total_frames_sold: 0,
        total_lenses_sold: 0,
        factory_orders: 0,
        normal_orders: 0,
      },
      averages: {
        avg_revenue_per_employee: 0,
        avg_orders_per_employee: 0,
        avg_items_per_order: 0,
      },
    },
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [params, setParams] = useState<EmpHistoryCriteria>({
    start_date: dayjs().format("YYYY-MM-DD"),
    end_date: dayjs().format("YYYY-MM-DD"),
    employee_code: null,
    branch_id: null,
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
      const response = await axiosClient.get(`reports/employee-history/`, {
        params: {
          ...paramsNullCleaner(params),
        },
        signal: controller.signal,
      });
      if (!controller.signal.aborted) {
        const responseData: EmpHistoryReportResponse = response.data.data;
        setData(responseData.employees);
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
          criteria: {
            branch_id: null,
            start_date: "",
            end_date: "",
            employee_code: null,
          },
          count: 0,
          generated_at: "",
          summary: {
            date_range: {
              start: "",
              end: "",
            },
            branch: null,
            totals: {
              active_employees: 0,
              total_orders: 0,
              total_revenue: 0,
              total_frames_sold: 0,
              total_lenses_sold: 0,
              factory_orders: 0,
              normal_orders: 0,
            },
            averages: {
              avg_revenue_per_employee: 0,
              avg_orders_per_employee: 0,
              avg_items_per_order: 0,
            },
          },
        });
        extractErrorMessage(err);
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  }, [params]);

  const setParamsData = (newParams: EmpHistoryCriteria) => {
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
    empHistoryReportData: Data,
    empHistoryReportSummary: Summary,
    empHistoryReportLoading: loading,
    empHistoryReportListRefresh: loadData,
    empHistoryReportError: error,
    setEmpHistoryReportParamsData: setParamsData,
  };
};

export default useGetEmpHistoryReports;
