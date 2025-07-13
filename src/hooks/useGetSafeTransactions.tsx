import { useState, useEffect, useCallback, useRef } from "react";
import axiosClient from "../axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import { getUserCurentBranch } from "../utils/authDataConver";
import toast from "react-hot-toast";
import axios from "axios";
import { SafeTransactionSerializer } from "../model/SafeTransactionSerializer";
import { paramsNullCleaner } from "../utils/paramsNullCleaner";

interface SafeTransactionReportParams {
  start_date: string;
  end_date: string;
}

const useGetSafeTransactions = () => {
  const [reportParams, setReportParams] = useState<SafeTransactionReportParams>(
    {
      start_date: new Date().toISOString().split("T")[0], // Today's date as default
      end_date: new Date().toISOString().split("T")[0],
    }
  );
  const [safeTransactions, setSafeTransactions] = useState<
    SafeTransactionSerializer["transactions"]
  >([]);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [totalDeposit, setTotalDeposit] = useState<number>(0);
  const [netAmount, setNetAmount] = useState<number>(0);
  const [transactionCount, setTransactionCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  const loadData = useCallback(async () => {
    if (controllerRef.current) {
      controllerRef.current.abort(); // Cancel any previous request
    }
    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);
    setError(null);
    try {
      const response = await axiosClient.get<SafeTransactionSerializer>(
        "/safe/transactions/report/",
        {
          params: {
            ...paramsNullCleaner(reportParams),
            branch: getUserCurentBranch()?.id,
          },
          signal: controller.signal,
        }
      );

      setSafeTransactions(response.data.transactions);
      setTotalIncome(response.data.summary.total_income);
      setTotalExpense(response.data.summary.total_expense);
      setTotalDeposit(response.data.summary.total_deposit);
      setNetAmount(response.data.summary.net_amount);
      setTransactionCount(response.data.summary.transaction_count);

      if (response.data.transactions.length === 0) {
        toast.error("No safe transactions found for selected criteria");
      } else {
        toast.success(
          `Loaded ${response.data.transactions.length} safe transactions`
        );
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        return;
      }
      if (!controller.signal.aborted) {
        setError(true);
        setSafeTransactions([]);
        setTotalIncome(0);
        setTotalExpense(0);
        setTotalDeposit(0);
        setNetAmount(0);
        setTransactionCount(0);
        extractErrorMessage(err);
      }
    } finally {
      setLoading(false);
    }
  }, [reportParams]);

  const handleDateRangeChange = (startDate: string, endDate: string) => {
    setReportParams((prev) => ({
      ...prev,
      start_date: startDate,
      end_date: endDate,
    }));
  };

  // Load data when params change
  useEffect(() => {
    loadData();
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, [loadData]);

  return {
    safeTransactions,
    totalIncome,
    totalExpense,
    totalDeposit,
    netAmount,
    transactionCount,
    loading,
    error,
    reportParams,
    handleDateRangeChange,
    refreshReport: loadData,
  };
};

export default useGetSafeTransactions;
