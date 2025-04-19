import { useState, useEffect, useCallback } from "react";
import axiosClient from "../axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import toast from "react-hot-toast";

import { Invoice } from "../model/SingleInvoiceModel";
import { InvoiceType } from "../model/StaticTypeModels";

const useGetSingleInvoice = (
  invoice_number: string,
  invoice_type: InvoiceType
) => {
  const [Data, setData] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const response: { data: Invoice } = await axiosClient.get(`invoices/`, {
        params: {
          invoice_number: invoice_number,
          invoice_type: invoice_type,
        },
      });

      setData(response.data);
      toast.success("Maching Invoice found ");

      // setTotalCount(response.data.count);
    } catch (error) {
      setData(null);
      extractErrorMessage(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [invoice_number, invoice_type]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    invoiceData: Data,
    invoiceLoading: loading,
    invoiceListRefres: loadData,
    invoiceError: error,
  };
};

export default useGetSingleInvoice;
