import { useState, useEffect, useCallback, useRef } from "react";
import axiosClient from "../axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import toast from "react-hot-toast";

import axios from "axios";
import { ProgressStatus } from "../model/StaticTypeModels";
import { getUserCurentBranch } from "../utils/authDataConver";
import { SolderingInvoiceModel } from "../model/SolderingInvoiceModel";
import { PaginatedResponse } from "../model/PaginatedResponse";
import { paramsNullCleaner } from "../utils/paramsNullCleaner";
export interface SolderingInvoiceListParams {
  page_size: number;
  page: number;
  search: string | null;
  nic: string | null;
  invoice_number: string | null;
  mobile: string | null;
  progress_status: ProgressStatus | null;
  end_date: string | null;
  start_date: string | null;
}

interface fetchMode {
  invoice_number?: string | null;
}
const useGetSolderingInvoiceList = ({ invoice_number }: fetchMode = {}) => {
  //use null or [] base on scenario
  const [dataList, SetDataList] = useState<SolderingInvoiceModel[] | []>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [params, setParams] = useState<SolderingInvoiceListParams>({
    page_size: 10,
    page: 1,
    search: null,
    nic: null,
    invoice_number: invoice_number ?? null,
    mobile: null,
    progress_status: null,
    end_date: null,
    start_date: null,
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
      const response: { data: PaginatedResponse<SolderingInvoiceModel> } =
        await axiosClient.get(`soldering/invoices/search/`, {
          params: {
            ...paramsNullCleaner(params),
            branch_id: getUserCurentBranch()?.id,
          },
          signal: controller.signal,
        });
      // Only update state if this request wasn't aborted
      if (!controller.signal.aborted) {
        SetDataList(response.data?.results);
        setTotalCount(response.data?.count);
        if (response.data?.count > 0) {
          toast.success("Maching Invoice found ");
        } else {
          toast.error("No matching invoice found");
        }
      }

      // setTotalCount(response.data.count);
    } catch (err) {
      // Check if the error is a cancellation
      if (axios.isCancel(err)) {
        return;
      }
      // Only update error state if this request wasn't aborted
      if (!controller.signal.aborted) {
        SetDataList([]);
        extractErrorMessage(err);
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  }, [params]);

  const setParamsData = (newParams: SolderingInvoiceListParams) => {
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
    solderingInvoiceLimit: params.page_size,
    solderingInvoiceList: dataList,
    solderingInvoiceListLoading: loading,
    solderingInvoiceListError: error,
    solderingInvoiceListTotalCount: totalCount,
    solderingInvoiceListPageNavigation: handlePageNavigation,
    solderingInvoiceListSearch: setParamsData,
    solderingInvoiceListRefres: loadData,
    solderingInvoiceListChangePageSize: changePageSize,
  };
};

export default useGetSolderingInvoiceList;
