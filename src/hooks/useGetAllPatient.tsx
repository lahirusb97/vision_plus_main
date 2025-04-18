import { useCallback, useEffect, useState } from "react";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import axiosClient from "../axiosClient";
import { PatientModel } from "../model/Patient";
import { PaginatedResponse } from "../model/PaginatedResponse";

type SearchParams = "name" | "nic" | "phone_number";

type SearchQuery = {
  search?: string; // General search term (for name)
  nic?: string; // Exact NIC match
  phone_number?: string; // Exact phone match
};

export default function useGetAllPatient({ open }: { open: boolean }) {
  const [pageSize, setPageSize] = useState<number>(10);
  const [navigatePage, setNavigatePage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({});
  const [dataList, setDataList] = useState<PatientModel[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);

  const loadData = useCallback(async () => {
    if (!open) return;

    setLoading(true);
    try {
      const response: { data: PaginatedResponse<PatientModel> } =
        await axiosClient.get(`patients/`, {
          params: {
            page: navigatePage,
            page_size: pageSize,
            ...searchQuery, // Spread all search parameters
          },
        });

      setDataList(response.data?.results || []);
      setTotalCount(response.data?.count || 0);

      if (response.data?.results?.length === 0) {
        // Optional: Show message if no results found
      }
    } catch (error) {
      setDataList([]);
      setTotalCount(0);
      extractErrorMessage(error);
    } finally {
      setLoading(false);
    }
  }, [navigatePage, searchQuery, pageSize, open]);

  const handleSearch = (searchKey: SearchParams, searchTerm: string) => {
    setNavigatePage(1);

    // Reset all search fields first
    const newSearchQuery: SearchQuery = {};

    if (searchKey === "name") {
      // For name, use general search parameter
      newSearchQuery.search = searchTerm;
    } else {
      // For nic and phone_number, use exact match
      newSearchQuery[searchKey] = searchTerm;
    }

    setSearchQuery(newSearchQuery);
  };

  const handlePageNavigation = (pageNumber: number) => {
    setNavigatePage(pageNumber);
  };

  const changePageSize = (size: number) => {
    setPageSize(size);
  };

  useEffect(() => {
    if (!initialLoad) {
      loadData();
    } else {
      setInitialLoad(false);
    }
  }, [loadData, initialLoad]);

  return {
    patientLimit: pageSize,
    patientsList: dataList,
    patientLoading: loading,
    totalPatientCount: totalCount,
    patientPageNavigation: handlePageNavigation,
    handlePatientSearch: handleSearch,
    refreshPatientList: loadData,
    changePatientPageSize: changePageSize,
  };
}
