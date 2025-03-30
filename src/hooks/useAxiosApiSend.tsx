import { useState } from "react";
import axiosClient from "../axiosClient";

type HttpMethod = "post" | "put" | "patch";

export const useAxiosApiSend = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const apiSendHandler = async (
    method: HttpMethod,
    url: string,
    data: unknown
  ) => {
    setLoading(true);
    setError(false);

    try {
      const response = await axiosClient.request({ method, url, data });
      return response.data;
    } catch (err) {
      setError(true);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, apiSendHandler };
};
