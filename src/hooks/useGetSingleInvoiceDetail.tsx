import { useState, useEffect, useCallback } from "react";
import axiosClient from "../axiosClient";
import axios from "axios";
import toast from "react-hot-toast";
import { Invoice } from "../model/SingleInvoiceModel";
interface UseGetInvoiceDetailReturn {
  invoiceDetail: Invoice;
  invoiceDetailLoading: boolean;
  invoiceDetailError: boolean;
  refresh: () => void;
}

const useGetSingleInvoiceDetail = (
  order_id: number
): UseGetInvoiceDetailReturn => {
  const [invoiceDetail, setinvoiceDetail] = useState({} as Invoice);
  const [invoiceDetailLoading, setinvoiceDetailLoading] =
    useState<boolean>(true);

  const [invoiceDetailError, setInvoiceDetailError] = useState<boolean>(false);

  const fetchinvoiceDetail = useCallback(async () => {
    setinvoiceDetailLoading(true);

    try {
      const response = await axiosClient.get<Invoice>(`/invoices/`, {
        params: {
          order_id: order_id,
        },
      });
      setinvoiceDetail(response.data);
      toast.success("Invoice Saved");

      setInvoiceDetailError(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error("Invoice Found");
      }
      setInvoiceDetailError(true);
    } finally {
      setinvoiceDetailLoading(false);
    }
  }, [order_id]);

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
