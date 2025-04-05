import { useState, useEffect, useCallback } from "react";
import axiosClient from "../axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import toast from "react-hot-toast";
import { getUserCurentBranch } from "../utils/authDataConver";

// Type definitions
interface InvoiceReport {
  invoice_id: number;
  invoice_number: string;
  invoice_type: "normal" | "factory";
  invoice_date: string;
  order_id: number;
  total_invoice_price: number;
  total_cash_payment: number;
  total_credit_card_payment: number;
  total_online_payment: number;
  total_payment: number;
  balance: number;
}

interface UseInvoiceReportsParams {
  payment_date: string; // Format: "YYYY-MM-DD"
}

const useInvoiceReports = ({ payment_date }: UseInvoiceReportsParams) => {
  const [data, setData] = useState<InvoiceReport[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInvoiceReports = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Validate date format
      if (!/^\d{4}-\d{2}-\d{2}$/.test(payment_date)) {
        throw new Error("Invalid date format. Use YYYY-MM-DD");
      }

      const response = await axiosClient.get<InvoiceReport[]>(
        "reports/invoices/",
        {
          params: {
            payment_date,
            branch_id: getUserCurentBranch()?.id,
          },
        }
      );

      setData(response.data);
      toast.success("Invoice reports loaded successfully");
    } catch (err) {
      extractErrorMessage(err);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [payment_date]);

  // Initial fetch
  useEffect(() => {
    fetchInvoiceReports();
  }, [fetchInvoiceReports]);

  // Refresh function
  const refresh = () => {
    fetchInvoiceReports();
  };

  return {
    invoiceReport: data,
    invoiceReportLoading: loading,
    error,
    refreshInvoiceReport: refresh,
    isEmpty: !loading && data.length === 0,
  };
};

export default useInvoiceReports;
