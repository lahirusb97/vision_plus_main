import { useState, useEffect, useCallback, useRef } from "react";
import axiosClient from "../axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { getUserCurentBranch } from "../utils/authDataConver";
import { ChannelPaymentReport } from "../model/ChannelReportModel";
import axios from "axios";

// Type definitions

interface UseChannelReportsParams {
  payment_date: string; // Format: "YYYY-MM-DD"
}

const useChannelReports = () => {
  const [channelReports, setChannelReports] = useState<ChannelPaymentReport[]>(
    []
  );
  const [channelReportsLoading, setChannelReportsLoading] =
    useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [params, setParams] = useState<UseChannelReportsParams>({
    payment_date: dayjs().format("YYYY-MM-DD"),
  });
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchChannelReports = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;
    setChannelReportsLoading(true);
    setError(false);

    try {
      // Validate date format
      if (!dayjs(params.payment_date, "YYYY-MM-DD", true).isValid()) {
        throw new Error("Invalid date format. Use YYYY-MM-DD");
      }

      const response = await axiosClient.get<ChannelPaymentReport[]>(
        "reports/channels/",
        {
          params: {
            payment_date: params.payment_date,
            branch_id: getUserCurentBranch()?.id,
          },
          signal: controller.signal,
        }
      );

      if (!controller.signal.aborted) {
        setChannelReports(response.data);
        toast.success("Channel reports loaded successfully");
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        return;
      }
      if (!controller.signal.aborted) {
        extractErrorMessage(err);
        setChannelReports([]);
        setError(true);
      }
    } finally {
      setChannelReportsLoading(false);
    }
  }, [params.payment_date]);

  // Initial fetch
  useEffect(() => {
    fetchChannelReports();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchChannelReports]);

  // Refresh function
  const refreshChannelReports = () => {
    fetchChannelReports();
  };
  const setParamsData = (newParams: UseChannelReportsParams) => {
    // use null to remove params
    setParams((prev) => ({
      ...prev,
      ...newParams,
    }));
  };
  return {
    channelReports,
    channelReportsLoading,
    error,
    refreshChannelReports,
    isEmpty: !channelReportsLoading && channelReports.length === 0,
    setChannelReportsParamsData: setParamsData,
  };
};

export default useChannelReports;
