import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";

import { extractErrorMessage } from "../utils/extractErrorMessage";
import { BankAccountModel } from "../model/BankAccountModel";
import axios from "axios";

export const useGetBankAccounts = () => {
  const [data, setData] = useState<BankAccountModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  //param bank name
  //account number
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchLenses = async () => {
      setLoading(true);
      setError(false);

      try {
        const response = await axiosClient.get<BankAccountModel[]>(
          "bank_accounts/",
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
        extractErrorMessage(err);
        setError(true);
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
    bankAccountsList: data,
    bankAccountsListLoading: loading,
    bankAccountsListError: error,
  };
};
