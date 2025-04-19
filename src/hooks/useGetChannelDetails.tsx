import { useState, useEffect, useCallback } from "react";

import { extractErrorMessage } from "../utils/extractErrorMessage";
import { getUserCurentBranch } from "../utils/authDataConver";
import toast from "react-hot-toast";
import axiosClient from "../axiosClient";

type ChannelModel = {
  id: number;
  address: string;
  doctor_name: string;
  contact_number: string;
  patient_name: string;
  channel_no: number;
  first_payment: number;
  date: string;
};

type ChannelSearchParams = {
  doctor?: number;
  date?: string | null;
  search?: string;
};

const useGetChannelDetails = () => {
  const [channelList, setChannelList] = useState<ChannelModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<ChannelSearchParams>({});
  const [initialLoad, setInitialLoad] = useState(true);

  const loadChannels = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await axiosClient.get<ChannelModel[]>(`channels/`, {
        params: {
          branch_id: getUserCurentBranch()?.id,
          ...(searchParams.doctor ? { doctor: searchParams.doctor } : {}),
          ...(searchParams.date ? { date: searchParams.date } : {}),
          ...(searchParams.search ? { search: searchParams.search } : {}),
        },
      });

      if (response.data?.length > 0) {
        setChannelList(response.data);
        toast.success("Channels loaded successfully");
      } else {
        setChannelList([]);
        toast.error("No channels found");
      }
    } catch (error) {
      setChannelList([]);
      extractErrorMessage(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  const handleSearch = (params: ChannelSearchParams) => {
    setSearchParams(params);
  };

  useEffect(() => {
    if (!initialLoad) loadChannels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadChannels]);

  useEffect(() => {
    setInitialLoad(false);
  }, []);

  return {
    channelList,
    loading,
    error,
    refreshChannels: loadChannels,
    searchChannels: handleSearch,
  };
};

export default useGetChannelDetails;
