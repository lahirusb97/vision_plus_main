import { useState, useRef } from "react";
import axiosClient from "../axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import toast from "react-hot-toast";
import axios from "axios";
import { paramsNullCleaner } from "../utils/paramsNullCleaner";
import { PatientRefractionDetailOrderSerializer } from "../model/PatientRefractionDetailOrderSerializer";
import { PaginatedResponse } from "../model/PaginatedResponse";

export interface CheckinInvoiceListParams {
  // page_size: number;
  // page: number;
  // search: string | null;
  // invoice_number: string | null;
  // mobile: string | null;
  // nic: string | null;
  // progress_status: ProgressStatus | null;
  patient_id: number | null;
}

const useGetPatientRefractionOrderList = () => {
  //use null or [] base on scenario
  const [dataList, SetDataList] = useState<
    PatientRefractionDetailOrderSerializer[] | []
  >([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  const loadData = async (params: CheckinInvoiceListParams) => {
    // Cancel any existing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;
    setLoading(true);

    try {
      const response: {
        data: PaginatedResponse<PatientRefractionDetailOrderSerializer>;
      } = await axiosClient.get(`refraction/orders/`, {
        params: paramsNullCleaner(params),
        signal: controller.signal,
      });

      // Only update state if this request wasn't aborted
      if (!controller.signal.aborted) {
        SetDataList(response.data.results || []);
        setTotalCount(response.data?.count || 0);
        if (response.data?.count > 0) {
          toast.success("Matching Refraction Order found ");
        } else {
          toast.error("No matching Refraction Order found");
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
  };

  return {
    // invoiceManualLimit: params.page_size,
    refractionInvoiceList: dataList,
    refractionInvoiceListLoading: loading,
    refractionInvoiceListError: error,
    refractionInvoiceListTotalCount: totalCount,
    // invoiceManualListPageNavigation: handlePageNavigation,
    refractionInvoiceListSearch: loadData,
    // invoiceManualListChangePageSize: changePageSize,
  };
};

export default useGetPatientRefractionOrderList;
