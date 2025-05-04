import { useState, useEffect, useCallback } from "react";
import axiosClient from "../axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { getUserCurentBranch } from "../utils/authDataConver";
import { ChannelPaymentReport } from "../model/ChannelReportModel";

// Type definitions

interface UseChannelReportsParams {
  payment_date: string; // Format: "YYYY-MM-DD"
}

const useChannelReports = ({ payment_date }: UseChannelReportsParams) => {
  const [channelReports, setChannelReports] = useState<ChannelPaymentReport[]>(
    []
  );
  const [channelReportsLoading, setChannelReportsLoading] =
    useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  console.log(channelReports);
  const fetchChannelReports = useCallback(async () => {
    setChannelReportsLoading(true);
    setError(null);

    try {
      // Validate date format
      if (!dayjs(payment_date, "YYYY-MM-DD", true).isValid()) {
        throw new Error("Invalid date format. Use YYYY-MM-DD");
      }

      const response = await axiosClient.get<ChannelPaymentReport[]>(
        "reports/channels/",
        {
          params: {
            payment_date,
            branch_id: getUserCurentBranch()?.id,
          },
        }
      );

      setChannelReports(response.data);
      toast.success("Channel reports loaded successfully");
    } catch (err) {
      extractErrorMessage(err);
      setChannelReports([]);
    } finally {
      setChannelReportsLoading(false);
    }
  }, [payment_date]);

  // Initial fetch
  useEffect(() => {
    fetchChannelReports();
  }, [fetchChannelReports]);

  // Refresh function
  const refreshChannelReports = () => {
    fetchChannelReports();
  };

  return {
    channelReports,
    channelReportsLoading,
    error,
    refreshChannelReports,
    isEmpty: !channelReportsLoading && channelReports.length === 0,
  };
};

export default useChannelReports;
