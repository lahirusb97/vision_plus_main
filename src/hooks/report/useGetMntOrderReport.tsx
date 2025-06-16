// hooks/useGetMntOrderReport.ts
// ------------------------------------------------------------------
// Same pattern as useGetGlassSenderReport, but pulls MNT metrics.
// ------------------------------------------------------------------

import { useState, useEffect, useCallback, useRef } from "react";
import axios, { AxiosError } from "axios";
import axiosClient from "../../axiosClient";
import { getUserCurentBranch } from "../../utils/authDataConver";
import { paramsNullCleaner } from "../../utils/paramsNullCleaner";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import toast from "react-hot-toast";
import { MntOrderModel } from "../../model/MTNOrderModel";

// ---------------- Types ----------------
export interface MntOrderReportParams {
  page_size: number;
  page: number;
  start_date: string | null; // YYYY-MM-DD
  end_date: string | null; // YYYY-MM-DD
}

interface MntOrderReportresponce {
  total_mnt_orders: number;
  total_mnt_price: string;
  orders: MntOrderModel[];
}
interface MntOrderReportpaginated {
  count: number;
  next: string | null;
  previous: string | null;
  results: MntOrderReportresponce;
}

const useGetMntOrderReport = () => {
  // --- State -------------------------------------------------------
  const [dataList, setDataList] = useState<MntOrderModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalMntPrice, setTotalMntPrice] = useState<string>("0.00");

  /** Aggregated KPIs returned by the endpoint */
  const [kpi, setKpi] = useState<{
    totalMntOrders: number;
    totalMntPrice: string;
    distinctFactoryOrders: number;
  }>({ totalMntOrders: 0, totalMntPrice: "0.00", distinctFactoryOrders: 0 });

  const [params, setParams] = useState<MntOrderReportParams>({
    page_size: 10,
    page: 1,
    start_date: null,
    end_date: null,
  });

  // AbortController prevents race-conditions when users change filters quickly
  const abortControllerRef = useRef<AbortController | null>(null);

  // --- Data loader -------------------------------------------------
  const loadData = useCallback(async () => {
    // Cancel any in-flight request
    if (abortControllerRef.current) abortControllerRef.current.abort();

    const controller = new AbortController();
    abortControllerRef.current = controller;
    setLoading(true);
    setError(false);

    try {
      const { data } = await axiosClient.get<MntOrderReportpaginated>(
        "report/mnt-order-report/",
        {
          params: {
            ...paramsNullCleaner(params),
            branch_id: getUserCurentBranch()?.id,
          },
          signal: controller.signal,
        }
      );

      if (!controller.signal.aborted) {
        setDataList(data.results.orders);
        setTotalMntPrice(data.results.total_mnt_price);
        setTotalCount(data.count);

        if (data.count === 0) {
          toast.error("No MNT orders found for the selected range");
        } else {
          toast.success(`${data.count} MNT orders loaded`);
        }
      }
    } catch (err) {
      if (axios.isCancel(err)) return;

      if (!controller.signal.aborted) {
        setDataList([]);
        setTotalMntPrice("0.00");
        setError(true);
        extractErrorMessage(err as AxiosError);
      }
    } finally {
      setLoading(false);
    }
  }, [params]);

  // Fire once on mount + whenever params change
  useEffect(() => {
    loadData();
    return () => abortControllerRef.current?.abort();
  }, [loadData]);

  // --- Helpers for the consumer component -------------------------
  const setParamsData = (newParams: Partial<MntOrderReportParams>) =>
    setParams((prev) => ({ ...prev, ...newParams }));

  const handlePageNavigation = (page: number) =>
    setParams((prev) => ({ ...prev, page }));

  const changePageSize = (page_size: number) =>
    setParams((prev) => ({ ...prev, page_size }));

  return {
    mntReportLimit: params.page_size,
    mntReportList: dataList,
    mntReportLoading: loading,
    mntReportError: error,
    mntReportTotalMntPrice: totalMntPrice,
    mntReportTotalCount: totalCount,
    mntReportNavigate: handlePageNavigation,
    mntReportSearch: setParamsData,
    mntReportRefresh: loadData,
    mntReportChangePageSize: changePageSize,
  };
};

export default useGetMntOrderReport;
