import { useState, useEffect, useCallback, useRef } from "react";
import axiosClient from "../axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import toast from "react-hot-toast";

import axios from "axios";
import { getUserCurentBranch } from "../utils/authDataConver";

import { PaginatedResponse } from "../model/PaginatedResponse";
import { paramsNullCleaner } from "../utils/paramsNullCleaner";
import dayjs from "dayjs";
export interface HearingInvoiceListParams {
  page_size: number;
  page: number;
  search: string | null;
  invoice_number: string | null;
  mobile: string | null;
  nic: string | null;
  start_date: string | null;
  end_date: string | null;
}
export interface HearingOrderItem {
  order_item_id: number;
  hearing_item_id: number;
  item_name: string;
  quantity: number;
  price_per_unit: number;
  subtotal: number;
  last_reminder_at: string | null;
  next_service_date: string | null;
  serial_no: string | null;
  battery: string | null;
  note: string;
}

export interface HearingOrderReport {
  invoice_number: string;
  invoice_date: string;
  order_id: number;
  customer_name: string;
  customer_phone: string;
  extra_phone_number: string | null;
  branch_name: string;
  subtotal: number;
  discount: number;
  total_price: number;
  items: HearingOrderItem[];
  order_remark: string;
  total_paid: number;
  balance: number;
}

const useGetHearingInvoiceList = () => {
  //use null or [] base on scenario
  const [dataList, SetDataList] = useState<HearingOrderReport[] | []>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [params, setParams] = useState<HearingInvoiceListParams>({
    page_size: 10,
    page: 1,
    search: null,
    invoice_number: null,
    mobile: null,
    nic: null,
    start_date: dayjs().format("YYYY-MM-DD"),
    end_date: dayjs().add(7, "day").format("YYYY-MM-DD"),
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
      const response: { data: PaginatedResponse<HearingOrderReport> } =
        await axiosClient.get(`hearing-report/invoice/`, {
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

  const setParamsData = (newParams: HearingInvoiceListParams) => {
    // use null to remove params
    setParams((prev: HearingInvoiceListParams) => ({
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
    setParams((prev: HearingInvoiceListParams) => ({
      ...prev,
      page,
    }));
  }, []);
  const changePageSize = useCallback((pageSize: number) => {
    setParams((prev: HearingInvoiceListParams) => ({
      ...prev,
      page_size: pageSize,
    }));
    ///* if you use functional prev state you do not need to add params to callback depandancy array
  }, []);
  return {
    hearingInvoiceLimit: params.page_size,
    hearingInvoiceList: dataList,
    hearingInvoiceListLoading: loading,
    hearingInvoiceListError: error,
    hearingInvoiceListTotalCount: totalCount,
    hearingInvoiceListPageNavigation: handlePageNavigation,
    hearingInvoiceListSearch: setParamsData,
    hearingInvoiceListRefres: loadData,
    hearingInvoiceListChangePageSize: changePageSize,
  };
};

export default useGetHearingInvoiceList;
