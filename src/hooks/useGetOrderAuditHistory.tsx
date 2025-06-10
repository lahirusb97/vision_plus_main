import { useState, useEffect, useCallback, useRef } from "react";
import axiosClient from "../axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import axios from "axios";
import { OrderItem } from "../model/SingleInvoiceModel";
import { PaymentModel } from "../model/PaymentModel";

interface OrderAuditLog {
  id: number;
  field_name: string;
  old_value: string;
  new_value: string;
  created_at: string;
  admin_name?: string;
  user_name?: string;
}
interface OrderAuditHistoryResponse {
  order_items: OrderItem[];
  order_payments: PaymentModel[];
  order_logs: OrderAuditLog[];
  invoice_number: string;
}
export interface OrderAuditHistoryParams {
  order_id: number | null;
}

const useGetOrderAuditHistory = (order_id: number | null) => {
  //use null or [] base on scenario
  const [dataList, SetDataList] = useState<OrderAuditHistoryResponse>({
    order_items: [],
    order_payments: [],
    order_logs: [],
    invoice_number: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [params, setParams] = useState<OrderAuditHistoryParams>({
    order_id: null,
  });
  const abortControllerRef = useRef<AbortController | null>(null);

  const loadData = useCallback(async () => {
    if (order_id) {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;
      setLoading(true);
      try {
        const response: { data: OrderAuditHistoryResponse } =
          await axiosClient.get(`orders/audit-history/`, {
            params: {
              order_id,
            },
            signal: controller.signal,
          });

        // Only update state if this request wasn't aborted
        if (!controller.signal.aborted) {
          SetDataList(response.data);
        }
      } catch (err) {
        // Check if the error is a cancellation
        if (axios.isCancel(err)) {
          return;
        }
        // Only update error state if this request wasn't aborted
        if (!controller.signal.aborted) {
          SetDataList({
            order_items: [],
            order_payments: [],
            order_logs: [],
            invoice_number: "",
          });
          extractErrorMessage(err);
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    }
  }, [order_id]);

  const setParamsData = (newParams: OrderAuditHistoryParams) => {
    // use null to remove params
    setParams((prev) => ({
      ...prev,
      ...newParams,
    }));
  };
  useEffect(() => {
    // Call loadData directly - it will handle its own cleanup
    loadData();
    // Return cleanup function for component unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [loadData]);

  return {
    orderAuditHistoryList: dataList,
    orderAuditHistoryLoading: loading,
    orderAuditHistoryError: error,
    orderAuditHistorySearch: setParamsData,
    orderAuditHistoryRefres: loadData,
  };
};

export default useGetOrderAuditHistory;
