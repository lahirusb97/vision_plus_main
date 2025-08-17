import { useState, useEffect, useCallback, useRef } from "react";
import axiosClient from "../axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import toast from "react-hot-toast";

import axios from "axios";
import { ProgressStatus } from "../model/StaticTypeModels";
import { getUserCurentBranch } from "../utils/authDataConver";
import { CheckinInvoiceModel } from "../model/CheckinInvoiceModel";
import { PaginatedResponse } from "../model/PaginatedResponse";
import { paramsNullCleaner } from "../utils/paramsNullCleaner";

export interface CheckinInvoiceListParams {
  page_size: number;
  page: number;
  search: string | null;
  invoice_number: string | null;
  mobile: string | null;
  nic: string | null;
  progress_status: ProgressStatus | null;
  patient_id: number | null;
}

const useGetCheckinInvoiceListManual = () => {
  //use null or [] base on scenario
  const [dataList, SetDataList] = useState<CheckinInvoiceModel[] | []>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [params, setParams] = useState<CheckinInvoiceListParams>({
    page_size: 10,
    page: 1,
    search: null,
    mobile: null,
    invoice_number: null,
    nic: null,
    progress_status: null,
    patient_id: null,
  });
  const abortControllerRef = useRef<AbortController | null>(null);

  const loadData = useCallback(async () => {
    // Don't fetch on initial load
    if (initialLoad) {
      setInitialLoad(false);
      return;
    }

    // Cancel any existing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;
    setLoading(true);

    try {
      const response: { data: PaginatedResponse<CheckinInvoiceModel> } =
        await axiosClient.get(`factory-invoices/search/`, {
          params: paramsNullCleaner(params),
          signal: controller.signal,
        });

      // Only update state if this request wasn't aborted
      if (!controller.signal.aborted) {
        SetDataList(response.data?.results || []);
        setTotalCount(response.data?.count || 0);
        if (response.data?.count > 0) {
          toast.success("Matching Invoice found ");
        } else {
          toast.error("No matching invoice found");
        }
        setError(false);
      }
    } catch (err) {
      // Check if the error is a cancellation
      if (axios.isCancel(err)) {
        return;
      }
      // Only update error state if this request wasn't aborted
      if (!controller.signal.aborted) {
        SetDataList([]);
        setTotalCount(0);
        extractErrorMessage(err);
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  }, [params, initialLoad]);

  const setParamsData = useCallback((newParams: CheckinInvoiceListParams) => {
    setParams((prev) => ({
      ...prev,
      ...newParams,
    }));
  }, []);

  useEffect(() => {
    loadData();
    // Cleanup function for component unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [loadData]);

  // Manual trigger function
  const triggerFetch = useCallback(() => {
    setInitialLoad(true);
    loadData();
  }, [loadData]);

  const handlePageNavigation = useCallback((page: number) => {
    setParams((prev) => ({
      ...prev,
      page,
    }));
  }, []);

  const changePageSize = useCallback((pageSize: number) => {
    setParams((prev) => ({
      ...prev,
      page_size: pageSize,
    }));
    ///* if you use functional prev state you do not need to add params to callback depandancy array
  }, []);

  return {
    invoiceManualLimit: params.page_size,
    invoiceManualList: dataList,
    invoiceManualListLoading: loading,
    invoiceManualListError: error,
    invoiceManualListTotalCount: totalCount,
    invoiceManualListPageNavigation: handlePageNavigation,
    invoiceManualListSearch: setParamsData,
    invoiceManualListRefres: triggerFetch,
    invoiceManualListChangePageSize: changePageSize,
  };
};

export default useGetCheckinInvoiceListManual;
