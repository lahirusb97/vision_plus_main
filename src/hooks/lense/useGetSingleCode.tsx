import { useState, useEffect, useCallback, useRef } from "react";
import axiosClient from "../../axiosClient";
import { CodeModel } from "../../model/CodeModel";
import { extractErrorMessage } from "../../utils/extractErrorMessage";

import axios from "axios";

interface UseGetSingleCodeReturn {
  singleCode: CodeModel | null;
  singleCodeLoading: boolean;
  singleCodeError: boolean;
  refresh: () => Promise<void>;
}

const useGetSingleCode = (singleCodeId: string | undefined) => {
  const [state, setState] = useState<Omit<UseGetSingleCodeReturn, "refresh">>({
    singleCode: null,
    singleCodeLoading: true,
    singleCodeError: false,
  });
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchSingleCode = useCallback(async () => {
    const controller = new AbortController();

    if (singleCodeId) {
      try {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
        abortControllerRef.current = controller;
        setState({
          singleCode: null,
          singleCodeLoading: true,
          singleCodeError: false,
        });

        const response = await axiosClient.get<CodeModel>(
          `/codes/${singleCodeId}/`,
          {
            signal: controller.signal,
          }
        );
        if (!controller.signal.aborted) {
          setState({
            singleCode: response.data,
            singleCodeLoading: false,
            singleCodeError: false,
          });
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          return;
        }
        if (!controller.signal.aborted) {
          extractErrorMessage(err);
          setState({
            singleCode: null,
            singleCodeLoading: false,
            singleCodeError: true,
          });
        }
      }
    }
  }, [singleCodeId]);

  useEffect(() => {
    fetchSingleCode();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchSingleCode]);

  return {
    ...state,
    refresh: () => fetchSingleCode(),
  };
};

export default useGetSingleCode;
