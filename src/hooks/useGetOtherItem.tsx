import { useCallback, useEffect, useState } from "react";
import { OtherItemModel } from "../model/OtherItemModel";
import { PaginatedResponse } from "../model/PaginatedResponse";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import axiosClient from "../axiosClient";

export default function useGetOtherItem() {
  const [otherItem, setOtherItem] =
    useState<PaginatedResponse<OtherItemModel> | null>(null);
  const [otherItemLoading, setOtherItemLoading] = useState<boolean>(false);
  const [paramList, setParamList] = useState<object>({});

  const loadData = useCallback(async () => {
    setOtherItemLoading(true);

    try {
      const response = await axiosClient.get("other-items/", {
        params: {
          page_size: 10,
          ...paramList,
        },
      });
      setOtherItem(response.data);
    } catch (error) {
      extractErrorMessage(error);
    } finally {
      setOtherItemLoading(false);
    }
  }, [paramList]);

  //SEARCH HANDLE
  const searchOtherItem = (searchKeyWord: string) => {
    setParamList({
      search: searchKeyWord,
    });
  };

  //PAGE NAVIGATION HANDLE
  const pageNavigationByNumber = (pageNumber: number) => {
    setParamList({
      page: pageNumber,
    });
  };
  useEffect(() => {
    const controller = new AbortController(); // ✅ Create an abort controller

    loadData();
    return () => controller.abort();
  }, [loadData]);

  return {
    otherItem,
    otherItemLoading,
    searchOtherItem,
    pageNavigationByNumber,
    OtherItemDataRefresh: loadData,
  };
}
