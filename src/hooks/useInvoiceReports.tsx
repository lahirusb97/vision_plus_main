import { useState, useEffect, useCallback, useMemo } from "react";
import axiosClient from "../axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import toast from "react-hot-toast";
import { getUserCurentBranch } from "../utils/authDataConver";
import { InvoicePaymentReport } from "../model/InvoicePaymentReport";
import dayjs from "dayjs";

// Type definitions

interface UseInvoiceReportsParams {
  payment_date: string; // Format: "YYYY-MM-DD"
}

const useInvoiceReports = ({ payment_date }: UseInvoiceReportsParams) => {
  const [data, setData] = useState<InvoicePaymentReport[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const PaymentDate = useMemo(() => {
    return dayjs(payment_date).format("YYYY-MM-DD");
  }, [payment_date]);
  const fetchInvoiceReports = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Validate date format
      if (!/^\d{4}-\d{2}-\d{2}$/.test(PaymentDate)) {
        throw new Error("Invalid date format. Use YYYY-MM-DD");
      }

      const response = await axiosClient.get<InvoicePaymentReport[]>(
        "reports/invoices/",
        {
          params: {
            payment_date: PaymentDate,
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
  }, [PaymentDate]);

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
