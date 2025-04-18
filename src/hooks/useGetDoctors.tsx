import { useState, useEffect, useCallback } from "react";
import axiosClient from "../axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import { DoctorModel } from "../model/DoctorModel";

interface UseGetDoctorsReturn {
  data: DoctorModel[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

const useGetDoctors = (): UseGetDoctorsReturn => {
  const [data, setData] = useState<DoctorModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDoctors = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosClient.get<DoctorModel[]>("/doctors/");
      setData(response.data);
    } catch (err) {
      extractErrorMessage(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Automatically fetch data on mount
  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  return {
    data,
    loading,
    error,
    refresh: fetchDoctors,
  };
};

export default useGetDoctors;
