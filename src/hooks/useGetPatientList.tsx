import { useCallback, useEffect, useRef, useState } from "react";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import axiosClient from "../axiosClient";
import { PatientModel } from "../model/Patient";
import { PaginatedResponse } from "../model/PaginatedResponse";
import { paramsNullCleaner } from "../utils/paramsNullCleaner";
import toast from "react-hot-toast";
import axios from "axios";

export interface PatientListParams {
  page_size: number;
  page: number;
  // search: string | null;
  nic: string | null;
  phone_number: string | null;
  name: string | null;
}

const useGetPatientList = () => {
  //use null or [] base on scenario
  const [dataList, SetDataList] = useState<PatientModel[] | []>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [params, setParams] = useState<PatientListParams>({
    page_size: 10,
    page: 1,
    nic: null,
    phone_number: null,
    name: null,
  });
  const abortControllerRef = useRef<AbortController | null>(null);
  //Prevent initial RUN
  const didMount = useRef(false);

  const loadData = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;
    setLoading(true);
    try {
      const response: { data: PaginatedResponse<PatientModel> } =
        await axiosClient.get(`patients/`, {
          params: {
            ...paramsNullCleaner(params),
          },
          signal: controller.signal,
        });
      // Only update state if this request wasn't aborted
      if (!controller.signal.aborted) {
        SetDataList(response.data?.results);
        setTotalCount(response.data?.count);
        if (response.data?.count > 0) {
          toast.success("Maching Invoice found ");
        } else {
          toast.error("No matching invoice found");
        }
      }

      // setTotalCount(response.data.count);
    } catch (err) {
      // Check if the error is a cancellation
      if (axios.isCancel(err)) {
        return;
      }
      // Only update error state if this request wasn't aborted
      if (!controller.signal.aborted) {
        SetDataList([]);
        extractErrorMessage(err);
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  }, [params]);

  const setParamsData = (newParams: PatientListParams) => {
    // use null to remove params
    setParams((prev) => ({
      ...prev,
      ...newParams,
    }));
  };
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return; // <-- Prevent initial load
    }
    loadData();
    // Return cleanup function for component unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [loadData]);
  const handlePageNavigation = useCallback((page: number) => {
    setParams((prev) => ({
      ...prev,
      page,
    }));
  }, []);
  const changePageSize = useCallback((pageSize: number) => {
    setParams((prev) => ({
      ...prev,
      page_size: pageSize,
    }));
    ///* if you use functional prev state you do not need to add params to callback depandancy array
  }, []);
  return {
    PatientListLimit: params.page_size,
    PatientList: dataList,
    PatientListLoading: loading,
    PatientListError: error,
    PatientListTotalCount: totalCount,
    PatientListPageNavigation: handlePageNavigation,
    PatientListSearch: setParamsData,
    PatientListRefres: loadData,
    PatientListChangePageSize: changePageSize,
  };
};

export default useGetPatientList;
