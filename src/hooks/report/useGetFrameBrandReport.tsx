import { useState, useEffect, useCallback, useRef } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import axiosClient from "../../axiosClient";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import { paramsNullCleaner } from "../../utils/paramsNullCleaner";
import { getUserCurentBranch } from "../../utils/authDataConver";

interface FilterParams {
  initial_branch: number | null | undefined;
}

export interface FrameBrandReportData {
  brand_name: string;
  total_stock: number;
  total_sold: number;
}

export interface FrameBrandReportSummary {
  total_stock: number;
  total_sold: number;
}

interface FrameBrandReport {
  sub_total_payments: number;
  brands: FrameBrandReportData[];
  summary: FrameBrandReportSummary;
}

const useGetFrameBrandReport = () => {
  const [Data, setData] = useState<FrameBrandReportData[]>([]);
  const [Summary, setSummary] = useState<FrameBrandReportSummary>({
    total_stock: 0,
    total_sold: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [params, setParams] = useState<FilterParams>({
    initial_branch: getUserCurentBranch()?.id,
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
      const response: { data: { data: FrameBrandReport } } = await axiosClient.get(
        `report/frames/brand/`,
        {
          params: {
            ...paramsNullCleaner(params),
          },
          signal: controller.signal,
        }
      );
      if (!controller.signal.aborted) {
        setData(response.data.data.brands);
        setSummary(response.data.data.summary);
        toast.success("Banking Report found ");
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        return;
      }
      if (!controller.signal.aborted) {
        setData([]);
        setSummary({
          total_stock: 0,
          total_sold: 0,
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
    frameBrandReportData: Data,
    frameBrandReportSummary: Summary,
    frameBrandReportLoading: loading,
    frameBrandReportListRefres: loadData,
    frameBrandReportError: error,
    setFrameBrandReportParamsData: setParamsData,
  };
};

export default useGetFrameBrandReport;
