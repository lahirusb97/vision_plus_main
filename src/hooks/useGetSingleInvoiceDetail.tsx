import { useState, useEffect, useCallback } from "react";
import axiosClient from "../axiosClient";
import axios from "axios";
import toast from "react-hot-toast";
import { Invoice } from "../model/SingleInvoiceModel";
import { PaginatedResponse } from "../model/PaginatedResponse";
interface UseGetInvoiceDetailReturn {
  invoiceDetail: Invoice | null;
  invoiceDetailLoading: boolean;
  invoiceDetailError: boolean;
  refresh: () => void;
}

const useGetSingleInvoiceDetail = (
  invoice_number: number
): UseGetInvoiceDetailReturn => {
  const [invoiceDetail, setinvoiceDetail] = useState<Invoice | null>(null);
  const [invoiceDetailLoading, setinvoiceDetailLoading] =
    useState<boolean>(true);

  const [invoiceDetailError, setInvoiceDetailError] = useState<boolean>(false);

  const fetchinvoiceDetail = useCallback(async () => {
    setinvoiceDetailLoading(true);

    try {
      const response: { data: PaginatedResponse<Invoice> } =
        await axiosClient.get(`factory-invoices/search/`, {
          params: {
            invoice_number: invoice_number,
          },
        });

      setinvoiceDetail(response.data.results[0]);
      toast.success("Invoice Saved");

      setInvoiceDetailError(false);
    } catch (error) {
      setinvoiceDetailLoading(false);
      setinvoiceDetail(null);
      if (axios.isAxiosError(error)) {
        toast.error("Invoice not Found");
      }
      setInvoiceDetailError(true);
    } finally {
      setinvoiceDetailLoading(false);
    }
  }, [invoice_number]);

  // Automatically fetch data on mount
  useEffect(() => {
    fetchinvoiceDetail();
  }, [fetchinvoiceDetail]);

  return {
    invoiceDetail,
    invoiceDetailLoading,
    invoiceDetailError,
    refresh: fetchinvoiceDetail,
  };
};

export default useGetSingleInvoiceDetail;
