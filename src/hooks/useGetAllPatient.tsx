import { useCallback, useEffect, useState } from "react";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import axiosClient from "../axiosClient";
import { PatientModel } from "../model/Patient";
import { PaginatedResponse } from "../model/PaginatedResponse";

export default function useGetAllPatient({ open }: { open: boolean }) {
  const limit = 10;
  const [navigatePage, setNavigatePage] = useState<number>(1);
  const [searchQuary, setSearchQuary] = useState<string>("");
  const [DataList, setDataList] = useState<PatientModel[]>([]);
  const [totalCount, setTotalCount] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = useCallback(async () => {
    if (open) {
      setLoading(true);
      try {
        const response: { data: PaginatedResponse<PatientModel> } =
          await axiosClient.get(`patients/`, {
            params: {
              page: navigatePage,
              limit,
              ...(searchQuary ? { ...searchQuary } : {}),
            },
          });
        setDataList(response.data.results);
        setTotalCount(response.data.count);
      } catch (error) {
        extractErrorMessage(error);
      } finally {
        setLoading(false);
      }
    }
  }, [navigatePage, open, searchQuary]);

  const handleSearch = (searchKeyWord: string) => {
    setNavigatePage(1);
    setSearchQuary(searchKeyWord);
  };
  const handlePageNavigation = (pageNumber: number) => {
    setNavigatePage(pageNumber);
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    patientLimit: limit,
    patientsList: DataList,
    patientLoading: loading,
    totalPatientCount: totalCount,
    patientPageNavigation: handlePageNavigation,
    handlePatientSearch: handleSearch,
    refreshPatientList: loadData,
  };
}
