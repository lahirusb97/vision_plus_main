import React from "react";
import useGetFrameHistory from "../../../hooks/report/useGetFrameHistory";
import { useParams } from "react-router";

export default function FrameActionHistory() {
  //get prams from url
  const { id } = useParams();
  const {
    frameHistoryList,
    frameHistoryLimit,
    frameHistoryListChangePageSize,
    frameHistoryListPageNavigation,
    frameHistoryListSearch,
    frameHistoryListRefres,
    frameHistoryListTotalCount,
    frameHistoryListError,
    frameHistoryListLoading,
  } = useGetFrameHistory(id as string);
  return <div></div>;
}
