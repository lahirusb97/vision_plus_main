
import useGetFrameHistory from "../../../hooks/report/useGetFrameHistory";
import { useParams } from "react-router";
import CustomerPagination from "../../CustomPagination";
import LensHistoryActionItem from "./LensHistoryActionItem";
import useGetLensHistory from "../../../hooks/report/useGetLensHistory";

export default function LensActionHistory() {
  //get prams from url
  const { id } = useParams();
  const {
    lensHistoryList,
    lensHistoryLimit,
    lensHistoryListChangePageSize,
    lensHistoryListPageNavigation,
    lensHistoryListSearch,
    lensHistoryListRefres,
    lensHistoryListTotalCount,
    lensHistoryListError,
    lensHistoryListLoading,
  } = useGetLensHistory(id as string);
  return (
    <div>
      <LensHistoryActionItem records={lensHistoryList} />
      <CustomerPagination
        totalCount={lensHistoryListTotalCount}
        handlePageNavigation={lensHistoryListPageNavigation}
        changePageSize={lensHistoryListChangePageSize}
        page_size={lensHistoryLimit}
      />
    </div>
  );
}
