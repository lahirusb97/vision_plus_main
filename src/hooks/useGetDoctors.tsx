import { useState, useEffect, useCallback } from "react";
import axiosClient from "../axiosClient";

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  contact_info: string;
  status: string;
}

interface UseGetDoctorsReturn {
  data: Doctor[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

const useGetDoctors = (): UseGetDoctorsReturn => {
  const [data, setData] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDoctors = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosClient.get<Doctor[]>("/doctors/");
      setData(response.data);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to fetch doctors.");
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
