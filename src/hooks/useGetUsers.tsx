import { useCallback, useEffect, useState } from "react";
import { UserModel } from "../model/UserModel";
import { PaginatedResponse } from "../model/PaginatedResponse";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import axiosClient from "../axiosClient";

export default function useGetUsers() {
  const [users, setUsers] = useState<UserModel[] | null>(null);
  const [usersLoading, setUsersLoading] = useState<boolean>(false);
  const [paramList, setParamList] = useState<object>({});

  const loadData = useCallback(async () => {
    setUsersLoading(true);

    try {
      const response = await axiosClient.get("users/", {
        params: {
          page_size: 10,
          ...paramList,
        },
      });
      setUsers(response.data);
    } catch (error) {
      extractErrorMessage(error);
    } finally {
      setUsersLoading(false);
    }
  }, [paramList]);

  //SEARCH HANDLE
  const searchUsers = (searchKeyWord: string) => {
    setParamList({
      search: searchKeyWord,
    });
  };

  //PAGE NAVIGATION HANDLE
  const pageNavigationByNumber = (pageNumber: number) => {
    setParamList({
      page: pageNumber,
    });
  };
  useEffect(() => {
    const controller = new AbortController(); // ✅ Create an abort controller

    loadData();
    return () => controller.abort();
  }, [loadData]);

  return {
    users,
    usersLoading,
    searchUsers,
    pageNavigationByNumber,
    UsersDataRefresh: loadData,
  };
}
