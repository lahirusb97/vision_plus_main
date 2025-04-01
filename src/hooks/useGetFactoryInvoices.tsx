import { useState, useEffect, useCallback } from "react";
import axiosClient from "../axiosClient";
import { PaginatedResponse } from "../model/PaginatedResponse";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import { Invoice } from "../model/SingleInvoiceModel";
import { getUserCurentBranch } from "../utils/authDataConver";

interface SearchParams {
  param: string;
  value: string;
}

const useGetFactoryInvoices = () => {
  const limit = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useState<SearchParams>("");
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = useCallback(async () => {
    setLoading(true);

    try {
      const params = {
        search: { invoice_number: searchParams },
      };

      const response = await axiosClient.get<PaginatedResponse<Invoice>>(
        "factory-invoices/",
        {
          params: {
            search: {
              invoice_number: searchParams,
            },
          },
        }
      );

      setInvoices(response.data.results);
      setTotalCount(response.data.count);
    } catch (error) {
      extractErrorMessage(error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchParams]);

  const handleSearch = useCallback((params: SearchParams) => {
    setCurrentPage(1);
    setSearchParams(params);
  }, []);

  const clearFilters = useCallback(() => {
    setCurrentPage(1);
    setSearchParams({});
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    invoices,
    loading,
    totalCount,
    currentPage,
    pageSize: limit,
    searchParams,
    handleSearch,
    handlePageChange,
    clearFilters,
    refreshInvoices: loadData,
  };
};

export default useGetFactoryInvoices;
