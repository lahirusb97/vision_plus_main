import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";

import { extractErrorMessage } from "../utils/extractErrorMessage";
import { BankAccountModel } from "../model/BankAccountModel";

export const useGetBankAccounts = () => {
  const [data, setData] = useState<BankAccountModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchLenses = async () => {
      setLoading(true);
      setError(false);

      try {
        const response = await axiosClient.get<BankAccountModel[]>(
          "bank_accounts/"
        );

        setData(response.data);
        setError(false);
      } catch (err) {
        setData([]);
        extractErrorMessage(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchLenses();
  }, []);

  return {
    bankAccountsList: data,
    bankAccountsListLoading: loading,
    bankAccountsListError: error,
  };
};
