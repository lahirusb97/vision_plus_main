import { useState, useEffect, useCallback } from "react";
import axiosClient from "../axiosClient";
import { PaginatedResponse } from "../model/PaginatedResponse";
import { RefractionNumberModel } from "../model/RefractionModel";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import { getUserCurentBranch } from "../utils/authDataConver";

const useGetRefraction = () => {
  const limit = 10;
  const [navigatePage, setNavigatePage] = useState<number>(1);
  const [searchQuary, setSearchQuary] = useState<string>("");
  const [DataList, setDataList] = useState<RefractionNumberModel[]>([]);
  const [totalCount, setTotalCount] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const response: { data: PaginatedResponse<RefractionNumberModel> } =
        await axiosClient.get(`refractions/`, {
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

  const handleSearch = (searchKeyWord: string) => {
    setNavigatePage(1);
    setSearchQuary(searchKeyWord);
  };
  const handlePageNavigation = (pageNumber: number) => {
    setNavigatePage(pageNumber);
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    refractionLimit: limit,
    refractionsList: DataList,
    refractionLoading: loading,
    totalRefractionCount: totalCount,
    refractionPageNavigation: handlePageNavigation,
    handleRefractionSearch: handleSearch,
    refreshRefractionList: loadData,
  };
};

export default useGetRefraction;
