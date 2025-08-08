import { useCallback, useEffect, useRef, useState } from "react";
import { HearingItemStockSerializer } from "../model/HearingtemStockSerializer";
import { PaginatedResponse } from "../model/PaginatedResponse";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import axiosClient from "../axiosClient";
import { getUserCurentBranch } from "../utils/authDataConver";
import axios from "axios";

export default function useGetHearingItem(is_active=true) {
  const limit = 10;
  const [navigatePage, setNavigatePage] = useState<number>(1);
  const [searchQuary, setSearchQuary] = useState<string>("");
  const [DataList, setDataList] = useState<HearingItemStockSerializer[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(true);
  const abortControllerRef = useRef<AbortController | null>(null);
  const timer = useRef<number | null>(null);

  const loadData = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(true);
    try {
      const response: { data: PaginatedResponse<HearingItemStockSerializer> } =
        await axiosClient.get(`hearing-items/`, {
          params: {
            page: navigatePage,
            limit,
            ...(searchQuary ? { search: searchQuary } : {}),
            branch_id: getUserCurentBranch()?.id,
            is_active,
          },
          signal: controller.signal,
        });
      if (!controller.signal.aborted) {
        setDataList(response.data.results);
        setTotalCount(response.data.count);
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      }
      if (!controller.signal.aborted) {
        extractErrorMessage(error);
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  }, [navigatePage, searchQuary]);

  //SEARCH HANDLE

  const handleSearch = (searchKeyWord: string) => {
    setNavigatePage(1);
    if (timer.current) {
      window.clearTimeout(timer.current);
    }
    timer.current = window.setTimeout(() => {
      setSearchQuary(searchKeyWord);
    }, 500);
  };
  const handlePageNavigation = (pageNumber: number) => {
    setNavigatePage(pageNumber);
  };
  //PAGE NAVIGATION HANDLE

  useEffect(() => {
    loadData();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [loadData]);

  return {
    hearingItemLimit: limit,
    hearingItem: DataList,
    hearingItemLoading: loading,
    searchHearingItem: handleSearch,
    totalHearingItemCount: totalCount,
    pageNavigationByNumber: handlePageNavigation,
    HearingItemDataRefresh: loadData,
    hearingItemError: error,
  };
}
