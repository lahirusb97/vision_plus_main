import { useState, useCallback, useEffect } from "react";
import axiosClient from "../axiosClient";
import { useAuthContext } from "../context/AuthContext";

// Define a generic type for the hook
type UseDataReturn<T> = {
  data: T[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
  nextPage: () => void;
  prevPage: () => void;
};

const useData = <T,>(endpoint: string): UseDataReturn<T> => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [next, setNext] = useState<string | null>(null);
  const [prev, setPrev] = useState<string | null>(null);

  const { token } = useAuthContext();

  const fetchData = useCallback(
    (url: string) => {
      setLoading(true);
      axiosClient
        .get<{ results: T[]; next: string | null; previous: string | null }>(
          url
        )
        .then((response) => {
          setData(response.data);
          setNext(response.data.next);
          setPrev(response.data.previous);
          setError(null);
        })
        .catch((err) => {
          setData([]);
          setNext(null);
          setPrev(null);
          setError(err.response?.data?.message || "Network Error");
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [token]
  );

  useEffect(() => {
    fetchData(`/${endpoint}`);
  }, [fetchData, endpoint]);

  const refresh = useCallback(() => {
    fetchData(`/${endpoint}`);
  }, [fetchData, endpoint]);

  const nextPage = useCallback(() => {
    if (next) {
      fetchData(next);
    }
  }, [fetchData, next]);

  const prevPage = useCallback(() => {
    if (prev) {
      fetchData(prev);
    }
  }, [fetchData, prev]);

  return { data, loading, error, refresh, nextPage, prevPage };
};

export default useData;
