import { useState, useEffect, useCallback, useRef } from "react";
import axiosClient from "../axiosClient";
import { PaginatedResponse } from "../model/PaginatedResponse";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import { getUserCurentBranch } from "../utils/authDataConver";
import toast from "react-hot-toast";
import { CheckinInvoiceModel } from "../model/CheckinInvoiceModel";
type searchParams = "invoice_number" | "mobile" | "nic" | "progress_status";

type SearchQuery = {
  [key in searchParams]?: string; // Optional string values for each of the possible keys
};
const useGetFactoryInvoices = () => {
  const [page_size, setPage_size] = useState<number>(10);
  const [navigatePage, setNavigatePage] = useState<number>(1);
  const [searchQuary, setSearchQuary] = useState<SearchQuery>({});
  const [DataList, setDataList] = useState<CheckinInvoiceModel[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);

  const abortControllerRef = useRef<AbortController | null>(null);

  const loadData = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;
    setLoading(true);
    try {
      const response: { data: PaginatedResponse<CheckinInvoiceModel> } =
        await axiosClient.get(`factory-invoices/search/`, {
          params: {
            page: navigatePage,
            page_size,
            ...(searchQuary.invoice_number
              ? { invoice_number: searchQuary.invoice_number }
              : {}),
            ...(searchQuary.mobile ? { mobile: searchQuary.mobile } : {}),
            ...(searchQuary.nic ? { nic: searchQuary.nic } : {}),
            ...(searchQuary.progress_status
              ? { progress_status: searchQuary.progress_status }
              : {}),
            branch_id: getUserCurentBranch()?.id,
          },
          signal: controller.signal,
        });

      if (response.data?.results.length > 0) {
        setDataList(response.data.results);
        setTotalCount(response.data.count);
        toast.success("invoice found loadingg...");
      } else {
        setDataList([]);
        setTotalCount(0);
        toast.error("invoice not found");
      }

      // setTotalCount(response.data.count);
    } catch (error) {
      setDataList([]);
      extractErrorMessage(error);
    } finally {
      setLoading(false);
    }
  }, [navigatePage, searchQuary, page_size]);

  const handleSearch = (searchKey: searchParams, searchTerm: string) => {
    setNavigatePage(1);
    setSearchQuary({ [searchKey]: searchTerm });
  };
  const handlePageNavigation = (pageNumber: number) => {
    setNavigatePage(pageNumber);
  };
  const changePageSize = (pageNumber: number) => {
    setPage_size(pageNumber);
  };

  useEffect(() => {
    setInitialLoad(false);
    if (!initialLoad) loadData();
    //!initialLoad not inluded in the array to stock initial loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [loadData]);

  return {
    invoiceLimit: page_size,
    invoiceList: DataList,
    invoiceLoading: loading,
    invoiceTotalCount: totalCount,
    invoicePageNavigation: handlePageNavigation,
    invoiceSearch: handleSearch,
    invoiceListRefres: loadData,
    changePageSize: changePageSize,
  };
};

export default useGetFactoryInvoices;
