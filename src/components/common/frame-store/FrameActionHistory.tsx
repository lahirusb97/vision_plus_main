import React from "react";
import useGetFrameHistory from "../../../hooks/report/useGetFrameHistory";
import { useParams } from "react-router";
import CustomerPagination from "../../CustomPagination";
import FrameHistoryActionItem from "./FrameHistoryActionItem";

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
  return (
    <div>
      <FrameHistoryActionItem records={frameHistoryList} />
      <CustomerPagination
        totalCount={frameHistoryListTotalCount}
        handlePageNavigation={frameHistoryListPageNavigation}
        changePageSize={frameHistoryListChangePageSize}
        page_size={frameHistoryLimit}
      />
    </div>
  );
}
