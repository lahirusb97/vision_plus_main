import { useState, useCallback, useRef, useEffect } from "react";

import { extractErrorMessage } from "../utils/extractErrorMessage";
import { getUserCurentBranch } from "../utils/authDataConver";
import toast from "react-hot-toast";
import axiosClient from "../axiosClient";
import axios from "axios";
import { PaginatedResponse } from "../model/PaginatedResponse";
import { paramsNullCleaner } from "../utils/paramsNullCleaner";
import dayjs from "dayjs";

export interface ChannelSearchModel {
  id: number;
  address: string;
  doctor_name: string;
  contact_number: string;
  patient_name: string;
  channel_no: number;
  first_payment: number;
  date: string;
  time: string;
  note: string;
  invoice_number: number;
  total_payment: number;
  balance: number;
  amount: number;
  is_deleted: boolean;
  is_refund: boolean;
  created_at: string;
}

type ChannelSearchParams = {
  page_size: number;
  page: number;
  doctor: number | null;
  date: string | null;
  invoice_number: number | null;
  search: string | null;
};

const useGetChannelDetails = () => {
  const [channelList, setChannelList] = useState<
    PaginatedResponse<ChannelSearchModel>
  >({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [params, setParams] = useState<ChannelSearchParams>({
    page_size: 10,
    page: 1,
    doctor: null,
    date: dayjs().format("YYYY-MM-DD"),
    invoice_number: null,
    search: null,
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const loadChannels = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;
    setLoading(true);
    setError(false);
    try {
      const response = await axiosClient.get<
        PaginatedResponse<ChannelSearchModel>
      >(`channels/`, {
        params: {
          branch_id: getUserCurentBranch()?.id,
          ...paramsNullCleaner(params),
        },
        signal: controller.signal,
      });

      if (!controller.signal.aborted) {
        setChannelList(response.data);
        console.log(response.data);
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      }
      if (!controller.signal.aborted) {
        setChannelList({
          count: 0,
          next: null,
          previous: null,
          results: [],
        });
        extractErrorMessage(error);
        setError(true);
        toast.error("Failed to load channels");
      }
    } finally {
      setLoading(false);
    }
  }, [params]);

  const setQuaryParamsData = (newParams: ChannelSearchParams) => {
    // use null to remove params
    setParams((prev) => ({
      ...prev,
      ...newParams,
    }));
  };
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

  useEffect(() => {
    // Call loadData directly - it will handle its own cleanup
    loadChannels();
    // Return cleanup function for component unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [loadChannels]);
  return {
    channelList: channelList,
    channelListLimit: params.page_size,
    channelListLoading: loading,
    channelListError: error,
    channelListTotalCount: channelList?.count,
    channelListRefresh: loadChannels,
    channelListSearch: setQuaryParamsData,
    channelListPageNavigation: handlePageNavigation,
    channelListChangePageSize: changePageSize,
  };
};

export default useGetChannelDetails;
