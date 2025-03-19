import { useCallback, useEffect, useState } from "react";
import { OtherItemModel } from "../model/OtherItemModel";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import axiosClient from "../axiosClient";

export default function useGetSingleOtherItem(id: string | undefined) {
  const [singleotherItem, setSingleOtherItem] = useState<OtherItemModel | null>(
    null
  );
  const [singleotherItemLoading, setSingleOtherItemLoading] =
    useState<boolean>(true);

  const loadData = useCallback(async () => {
    if (id) {
      try {
        const response = await axiosClient.get(`other-items/${id}/`);
        setSingleOtherItem(response.data);
      } catch (error) {
        extractErrorMessage(error);
      } finally {
        setSingleOtherItemLoading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    const controller = new AbortController();
    loadData();
    return () => controller.abort();
  }, [loadData]);

  return {
    singleotherItem,
    singleotherItemLoading,
    singleOtherItemDataRefresh: loadData,
  };
}
