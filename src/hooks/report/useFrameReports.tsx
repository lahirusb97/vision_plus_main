import { useState, useEffect, useCallback, useRef } from "react";

import toast from "react-hot-toast";

import axios from "axios";
import { Invoice } from "../../model/SingleInvoiceModel";
import axiosClient from "../../axiosClient";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
interface FilterParams {
  start_date: string | null;
  end_date: string | null;
}

const useFrameReports = () => {
  //use null or [] base on scenario
  const [Data, setData] = useState<null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [params, setParams] = useState<FilterParams>({
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
      //TODO ASS MODEL
      const response: { data: Invoice } = await axiosClient.get(
        `frames/report/`,
        {
          params: params,
          signal: controller.signal,
        }
      );
      // Only update state if this request wasn't aborted
      if (!controller.signal.aborted) {
        setData(response.data);
        toast.success("Maching Invoice found ");
      }

      // setTotalCount(response.data.count);
    } catch (err) {
      // Check if the error is a cancellation
      if (axios.isCancel(err)) {
        return;
      }
      // Only update error state if this request wasn't aborted
      if (!controller.signal.aborted) {
        setData(null);
        extractErrorMessage(err);
        setError(true);
      }
    } finally {
      setLoading(false);
    }
    // return () => {
    //   abortController.abort();
    // };//! only need when useEffect des not use
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.start_date, params.end_date]);
  const setParamsData = (newParams: FilterParams) => {
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

  return {
    frameReportData: Data,
    frameReportLoading: loading,
    frameReportListRefres: loadData,
    frameReportError: error,
    setParamsData: setParamsData,
  };
};

export default useFrameReports;
