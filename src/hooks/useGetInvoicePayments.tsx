import { useState, useEffect, useCallback } from "react";
import axiosClient from "../axiosClient";
import axios from "axios";
import toast from "react-hot-toast";
import { PaymentModel } from "../model/PaymentModel";

//! USE ORDER ID TO GET PAYMENT DETAILS OF AN ORDER
interface UseGetInvoicePaymentsReturn {
  invoicePayments: PaymentModel[] | null;
  invoicePaymentsLoading: boolean;
  invoicePaymentsError: boolean;
  refresh: () => void;
}

const useGetInvoicePayments = (
  order_id: number | null
): UseGetInvoicePaymentsReturn => {
  const [invoicePayments, setinvoicePayments] = useState<PaymentModel[] | null>(
    null
  );
  const [invoicePaymentsLoading, setinvoicePaymentsLoading] =
    useState<boolean>(true);

  const [invoicePaymentsError, setInvoicePaymentsError] =
    useState<boolean>(false);

  const fetchinvoicePayments = useCallback(async () => {
    if (order_id) {
      setinvoicePaymentsLoading(true);

      try {
        const response = await axiosClient.get<{ payments: PaymentModel[] }>(
          `/orders/payments/`,
          {
            params: {
              order_id: order_id,
            },
          }
        );
        setinvoicePayments(response.data.payments);
        toast.success("Invoice Mach Found Loading...");

        setInvoicePaymentsError(false);
      } catch (error) {
        setinvoicePaymentsLoading(false);
        setinvoicePayments(null);
        if (axios.isAxiosError(error)) {
          toast.error("Invoice Data Not Found Saved");
        }
        setInvoicePaymentsError(true);
      } finally {
        setinvoicePaymentsLoading(false);
      }
    }
  }, [order_id]);

  // Automatically fetch data on mount
  useEffect(() => {
    fetchinvoicePayments();
  }, [fetchinvoicePayments]);

  return {
    invoicePayments,
    invoicePaymentsLoading,
    invoicePaymentsError,
    refresh: fetchinvoicePayments,
  };
};

export default useGetInvoicePayments;
