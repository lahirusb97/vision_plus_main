import { useState, useEffect, useCallback, useRef } from "react";
import axiosClient from "../axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";

import axios from "axios";
import { BankDepositeModel } from "../model/BankDepositeModel";
import { getUserCurentBranch } from "../utils/authDataConver";
import dayjs from "dayjs";
interface FilterParams {
  bank_account: number | null;
  date: string | null;
}
const useGetBankDesposites = () => {
  //use null or [] base on scenario
  const [Data, setData] = useState<BankDepositeModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [params, setParams] = useState<FilterParams>({
    bank_account: null,
    date: dayjs().format("YYYY-MM-DD"),
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
      const response: { data: BankDepositeModel[] } = await axiosClient.get(
        `bank-deposits/`,
        {
          params: { ...params, branch: getUserCurentBranch()?.id },
          signal: controller.signal,
        }
      );
      // Only update state if this request wasn't aborted
      if (!controller.signal.aborted) {
        setData(response.data);
      }

      // setTotalCount(response.data.count);
    } catch (err) {
      // Check if the error is a cancellation
      if (axios.isCancel(err)) {
        return;
      }
      // Only update error state if this request wasn't aborted
      if (!controller.signal.aborted) {
        setData([]);
        extractErrorMessage(err);
        setError(true);
      }
    } finally {
      setLoading(false);
    }
    // return () => {
    //   abortController.abort();
    // };//! only need when useEffect des not use
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.bank_account, params.date]);
  const setParamsData = (newParams: FilterParams) => {
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
    bankDepositeList: Data,
    bankDepositeLoading: loading,
    bankDepositeRefresh: loadData,
    bankDepositeError: error,
    bankDepositeParams: setParamsData,
  };
};

export default useGetBankDesposites;
