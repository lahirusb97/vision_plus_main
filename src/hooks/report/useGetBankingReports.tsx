import { useState, useEffect, useCallback, useRef } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import axiosClient from "../../axiosClient";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import { paramsNullCleaner } from "../../utils/paramsNullCleaner";
import { getUserCurentBranch } from "../../utils/authDataConver";
import dayjs from "dayjs";
import { BranchModel } from "../../model/BranchModel";

interface FilterParams {
  start_date: string | null;
  end_date: string | null;
}

export interface DepositsReportData {
  id: number;
  bank_name: string;
  account_number: string;
  date: string;
  amount: number;
  is_confirmed: boolean;
  note: string;
}

interface DepositsSummary {
  total_amount: number;
  total_deposits: number;
  confirmed_deposits: number;
  confirmed_amount: number;
  pending_deposits: number;
  pending_amount: number;
  confirmation_percentage: number;
}
interface WithdrawalsReportData {
  data: {
    branch: BranchModel;
    filters: FilterParams;
    deposits: DepositsReportData[];
    summary: DepositsSummary;
    total_records: number;
  };
}

const useGetBankingReports = () => {
  const [Data, setData] = useState<DepositsReportData[]>([]);
  const [Summary, setSummary] = useState<DepositsSummary>({
    total_amount: 0,
    total_deposits: 0,
    confirmed_deposits: 0,
    confirmed_amount: 0,
    pending_deposits: 0,
    pending_amount: 0,
    confirmation_percentage: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [params, setParams] = useState<FilterParams>({
    start_date: dayjs().format("YYYY-MM-DD"),
    end_date: dayjs().format("YYYY-MM-DD"),
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const loadData = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;
    setLoading(true);
    try {
      const response: { data: WithdrawalsReportData } = await axiosClient.get(
        `banking-report/`,
        {
          params: {
            ...paramsNullCleaner(params),
            branch_id: getUserCurentBranch()?.id,
          },
          signal: controller.signal,
        }
      );
      if (!controller.signal.aborted) {
        setData(response.data.data.deposits);
        setSummary(response.data.data.summary);

        toast.success("Banking Report found ");
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        return;
      }
      if (!controller.signal.aborted) {
        setData([]);
        setSummary({
          total_amount: 0,
          total_deposits: 0,
          confirmed_deposits: 0,
          confirmed_amount: 0,
          pending_deposits: 0,
          pending_amount: 0,
          confirmation_percentage: 0,
        });
        extractErrorMessage(err);
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  }, [params]);

  const setParamsData = (newParams: FilterParams) => {
    setParams((prev) => ({
      ...prev,
      ...newParams,
    }));
  };

  useEffect(() => {
    loadData();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [loadData]);

  return {
    bankingReportData: Data,
    bankingReportSummary: Summary,
    bankingReportLoading: loading,
    bankingReportListRefres: loadData,
    bankingReportError: error,
    setBankingReportParamsData: setParamsData,
  };
};

export default useGetBankingReports;
