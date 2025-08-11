import { useState, useCallback, useRef } from "react";
import axiosClient from "../axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import axios from "axios";

interface UseGetHearingServiceHistoryParams {
  order_id: number;
}

interface HearingServiceModel {
  id: number;
  order: number;
  last_service_date: string;
  scheduled_service_date: string;
  price: string;
  created_at: string;
}

export interface HearingServicesReportModel {
  order_id: string;
  total_services: number;
  services: HearingServiceModel[];
  order_item: {
    id: number;
    item_name: string;
    next_service_date: string;
  } | null;
}

interface UseGetHearingServiceHistoryReturn {
  hearingServiceHistory: HearingServicesReportModel | null;
  hearingServiceHistoryLoading: boolean;
  hearingServiceHistoryError: boolean;
  fetchHearingServiceHistory: (
    params: UseGetHearingServiceHistoryParams
  ) => void;
}

const useGetHearingServiceHistory = (): UseGetHearingServiceHistoryReturn => {
  const [data, setData] = useState<HearingServicesReportModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchHearingServiceHistory = useCallback(
    async (params: UseGetHearingServiceHistoryParams) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;
      setLoading(true);
      setError(false);

      try {
        const response = await axiosClient.get<HearingServicesReportModel>(
          "hearing-orders/service/",
          {
            params: { order_id: params.order_id },
            signal: controller.signal,
          }
        );
        // Only update state if this request wasn't aborted
        if (!controller.signal.aborted) {
          setData(response.data);
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          return;
        }
        if (!controller.signal.aborted) {
          extractErrorMessage(err);
          setError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    },
    []
  );

  return {
    hearingServiceHistory: data,
    hearingServiceHistoryLoading: loading,
    hearingServiceHistoryError: error,
    fetchHearingServiceHistory,
  };
};

export default useGetHearingServiceHistory;
