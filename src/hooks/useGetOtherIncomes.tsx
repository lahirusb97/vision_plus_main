import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";

import { extractErrorMessage } from "../utils/extractErrorMessage";
import { OtherIncomeCategory } from "../model/OtherIncomeCategory";
import axios from "axios";

export const useGetOtherIncomes = () => {
  const [data, setData] = useState<OtherIncomeCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchLenses = async () => {
      setLoading(true);
      setError(false);

      try {
        const response = await axiosClient.get<OtherIncomeCategory[]>(
          "other-income-categories/",
          {
            signal,
          }
        );

        setData(response.data);
        setError(false);
      } catch (err) {
        if (axios.isCancel(err)) {
          return;
        }
        setData([]);
        setError(true);
        extractErrorMessage(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLenses();
    return () => {
      controller.abort(); // Cancel request on unmount
    };
  }, []);

  return {
    otherIncomeList: data,
    otherIncomeListLoading: loading,
    otherIncomeListError: error,
  };
};
