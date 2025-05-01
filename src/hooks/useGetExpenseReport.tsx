import { useState, useEffect, useCallback, useRef } from "react";
import axiosClient from "../axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import { getUserCurentBranch } from "../utils/authDataConver";
import toast from "react-hot-toast";
import { ExpenseItem, ExpenseReport } from "../model/ExpenceModel";
import axios from "axios";

interface ExpenseReportParams {
  start_date: string;
  end_date: string;
  branch_id?: number;
  main_category?: number;
  sub_category?: number;
}

const useGetExpenseReport = () => {
  const [reportParams, setReportParams] = useState<ExpenseReportParams>({
    start_date: new Date().toISOString().split("T")[0], // Today's date as default
    end_date: new Date().toISOString().split("T")[0],
    branch_id: getUserCurentBranch()?.id,
  });
  const [expenseList, setExpenseList] = useState<ExpenseItem[]>([]);
  const [totalExpense, setTotalExpense] = useState<number>(0);
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
      const response = await axiosClient.get<ExpenseReport>(
        "/expenses/report/",
        {
          params: reportParams,
          signal: controller.signal,
        }
      );

      setExpenseList(response.data.expenses);
      setTotalExpense(response.data.total_expense);

      if (response.data.expenses.length === 0) {
        toast.error("No expenses found for selected criteria");
      } else {
        toast.success(`Loaded ${response.data.expenses.length} expenses`);
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        return;
      }
      if (!controller.signal.aborted) {
        setError(true);
        setExpenseList([]);
        setTotalExpense(0);
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

  const handleCategoryFilter = (
    mainCategory?: number,
    subCategory?: number
  ) => {
    setReportParams((prev) => ({
      ...prev,
      main_category: mainCategory,
      sub_category: subCategory,
    }));
  };

  const handleBranchChange = (branchId?: number) => {
    setReportParams((prev) => ({
      ...prev,
      branch_id: branchId,
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
    expenseList,
    totalExpense,
    loading,
    error,
    reportParams,
    handleDateRangeChange,
    handleCategoryFilter,
    handleBranchChange,
    refreshReport: loadData,
  };
};

export default useGetExpenseReport;
