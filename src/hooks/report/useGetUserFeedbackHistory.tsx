import { useState, useRef } from "react";
import axiosClient from "../../axiosClient";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import axios from "axios";
import { paramsNullCleaner } from "../../utils/paramsNullCleaner";
import { FeedbackModel } from "../../model/FeedbackModel";
export interface FeedbackHistoryParams {
  user_id: string;
  start_date: string | null;
  end_date: string | null;
}

interface UserFeedbackHistory {
  user_id: string;
  start_date: string;
  end_date: string;
  count: number;
  feedbacks: FeedbackModel[];
}
const useGetUserFeedbackHistory = () => {
  //use null or [] base on scenario
  const [dataList, SetDataList] = useState<FeedbackModel[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  const loadData = async (params: FeedbackHistoryParams) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;
    setLoading(true);
    try {
      const queryParams = {
        ...paramsNullCleaner(params),
      };

      const response: { data: UserFeedbackHistory } = await axiosClient.get(
        `order-feedback/by-invoice/`,
        {
          params: queryParams,
          signal: controller.signal,
        }
      );
      // Only update state if this request wasn't aborted
      if (!controller.signal.aborted) {
        SetDataList(response.data.feedbacks);
      }
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
  };

  return {
    userFeedbackHistoryList: dataList,
    userFeedbackHistoryListLoading: loading,
    userFeedbackHistoryListError: error,
    userFeedbackHistoryListRefresh: loadData,
  };
};

export default useGetUserFeedbackHistory;
