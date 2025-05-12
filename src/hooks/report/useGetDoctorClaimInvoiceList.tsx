import { useState, useEffect, useCallback, useRef } from "react";
import axiosClient from "../../axiosClient";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import toast from "react-hot-toast";

import axios from "axios";
import { getUserCurentBranch } from "../../utils/authDataConver";
import { PaginatedResponse } from "../../model/PaginatedResponse";
import { paramsNullCleaner } from "../../utils/paramsNullCleaner";
import { DoctorClaimInvoiceReportModel } from "../../model/DoctorClaimInvoiceModel";
export interface DoctorClaimInvoiceListParams {
  page_size: number;
  page: number;
  start_date: string | null;
  end_date: string | null;
}
const useGetDoctorClaimInvoiceList = () => {
  //use null or [] base on scenario
  const [dataList, SetDataList] = useState<
    DoctorClaimInvoiceReportModel[] | []
  >([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [params, setParams] = useState<DoctorClaimInvoiceListParams>({
    page_size: 10,
    page: 1,
    start_date: null,
    end_date: null,
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
      const response: {
        data: PaginatedResponse<DoctorClaimInvoiceReportModel>;
      } = await axiosClient.get(`doctor-claims-invoices/`, {
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

  const setParamsData = (
    newParams: Omit<DoctorClaimInvoiceListParams, "page_size" | "page">
  ) => {
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
    doctorClaimInvoiceLimit: params.page_size,
    doctorClaimInvoiceList: dataList,
    doctorClaimInvoiceListLoading: loading,
    doctorClaimInvoiceListError: error,
    doctorClaimInvoiceListTotalCount: totalCount,
    doctorClaimInvoiceListPageNavigation: handlePageNavigation,
    doctorClaimInvoiceListSearch: setParamsData,
    doctorClaimInvoiceListRefres: loadData,
    doctorClaimInvoiceListChangePageSize: changePageSize,
  };
};

export default useGetDoctorClaimInvoiceList;
