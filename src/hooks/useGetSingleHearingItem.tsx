import { useCallback, useEffect, useState } from "react";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import axiosClient from "../axiosClient";
import { getUserCurentBranch } from "../utils/authDataConver";
import { HearingItemStockSerializer } from "../model/HearingtemStockSerializer";

export default function useGetSingleHearingItem(id: string | undefined) {
  const [singleHearingItem, setSingleHearingItem] =
    useState<HearingItemStockSerializer | null>(null);
  const [singleHearingItemLoading, setSingleHearingItemLoading] =
    useState<boolean>(true);
  const [singleHearingItemError, setSingleHearingItemError] =
    useState<boolean>(false);

  const loadData = useCallback(async () => {
    if (id) {
      try {
        setSingleHearingItemError(false);
        const response = await axiosClient.get(`hearing-items/${id}/`, {
          params: {
            branch_id: getUserCurentBranch()?.id,
          },
        });
        setSingleHearingItem(response.data);
      } catch (error) {
        extractErrorMessage(error);
        setSingleHearingItemError(true);
      } finally {
        setSingleHearingItemLoading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    const controller = new AbortController();
    loadData();
    return () => controller.abort();
  }, [loadData]);

  return {
    singleHearingItem,
    singleHearingItemLoading,
    singleHearingItemError,
    singleHearingItemDataRefresh: loadData,
  };
}
