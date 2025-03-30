import { useCallback, useEffect, useState } from "react";
import { OtherItemModel } from "../model/OtherItemModel";
import { PaginatedResponse } from "../model/PaginatedResponse";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import axiosClient from "../axiosClient";
import { getUserCurentBranch } from "../utils/authDataConver";

export default function useGetOtherItem() {
  const limit = 10;
  const [navigatePage, setNavigatePage] = useState<number>(1);
  const [searchQuary, setSearchQuary] = useState<string>("");
  const [DataList, setDataList] = useState<OtherItemModel[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const response: { data: PaginatedResponse<OtherItemModel> } =
        await axiosClient.get(`other-items/`, {
          params: {
            page: navigatePage,
            limit,
            ...(searchQuary ? { search: searchQuary } : {}),
            branch_id: getUserCurentBranch()?.id,
          },
        });
      setDataList(response.data.results);
      setTotalCount(response.data.count);
    } catch (error) {
      extractErrorMessage(error);
    } finally {
      setLoading(false);
    }
  }, [navigatePage, searchQuary]);

  //SEARCH HANDLE

  const handleSearch = (searchKeyWord: string) => {
    setNavigatePage(1);
    setSearchQuary(searchKeyWord);
  };
  const handlePageNavigation = (pageNumber: number) => {
    setNavigatePage(pageNumber);
  };
  //PAGE NAVIGATION HANDLE

  useEffect(() => {
    const controller = new AbortController(); // ✅ Create an abort controller

    loadData();
    return () => controller.abort();
  }, [loadData]);

  return {
    otherItemLimit: limit,
    otherItem: DataList,
    otherItemLoading: loading,
    searchOtherItem: handleSearch,
    totalOtherItemCount: totalCount,
    pageNavigationByNumber: handlePageNavigation,
    OtherItemDataRefresh: loadData,
  };
}
