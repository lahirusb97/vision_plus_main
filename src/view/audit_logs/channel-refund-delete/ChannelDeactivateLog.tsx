import React, { useEffect } from "react";
import useGetChannelDeleteStatus from "../../../hooks/useGetChannelDeleteStatus";
import { useOutletContext } from "react-router";
import { LogsDateRangePickerManualState } from "../layout/ChannelLogsLayout";
import CustomerPagination from "../../../components/CustomPagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Button,
  Typography,
} from "@mui/material";
import { formatDateTimeByType } from "../../../utils/formatDateTimeByType";
import { numberWithCommas } from "../../../utils/numberWithCommas";
import ChannelDeleteRefund from "../../../components/common/channel-delete-refund-dialog/ChannelDeleteRefund";
export default function ChannelDeactivateLog() {
  const { start_date, end_date } =
    useOutletContext<LogsDateRangePickerManualState>();
  const {
    channelStatusList,
    channelStatusListChangePageSize,
    channelStatusListError,
    channelStatusListLimit,
    channelStatusListLoading,
    channelStatusListPageNavigation,
    channelStatusListRefresh,
    channelStatusListSearch,
    channelStatusListTotalCount,
  } = useGetChannelDeleteStatus({
    status: "deactivated",
  });
  useEffect(() => {
    if (start_date && end_date) {
      channelStatusListSearch({
        start_date: start_date.format("YYYY-MM-DD"),
        end_date: end_date.format("YYYY-MM-DD"),
        page_size: channelStatusListLimit,
        page: 1,
        doctor: null,
        invoice_number: null,
        search: null,
        status: "deactivated",
      });
    }
  }, [start_date, end_date]);

  return (
    <div>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell align="center">Refund </TableCell>
            <TableCell align="center">Deactivate Date</TableCell>
            <TableCell align="center">Channel Date </TableCell>
            <TableCell align="center">Invoice No.</TableCell>
            <TableCell>Patient Name </TableCell>
            <TableCell>Contact Number </TableCell>
            <TableCell>Total Invoice </TableCell>
            <TableCell>Total Payment </TableCell>
            <TableCell>Balance </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {channelStatusListLoading && (
            <TableRow>
              <TableCell colSpan={10} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          )}
          {channelStatusList?.results?.map((row) => (
            <TableRow key={row.id}>
              <TableCell
                sx={{
                  display: "flex",
                  gap: 1,
                  justifyContent: "space-between",
                }}
                align="center"
              >
                <ChannelDeleteRefund
                  appointment_id={row.id.toString()}
                  dialogType="refund"
                />
              </TableCell>
              <TableCell>
                {formatDateTimeByType(row.deleted_at, "both")}
              </TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.invoice_number}</TableCell>
              <TableCell>{row.patient_name}</TableCell>
              <TableCell>{row.contact_number}</TableCell>
              <TableCell>{numberWithCommas(row.amount)}</TableCell>
              <TableCell>{row.total_payment}</TableCell>
              <TableCell>{row.balance}</TableCell>
            </TableRow>
          ))}
          {!channelStatusListLoading &&
            !channelStatusListError &&
            channelStatusList?.results?.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} rowSpan={6} align="center">
                  No data found
                </TableCell>
              </TableRow>
            )}
          {channelStatusListError && (
            <TableRow>
              <TableCell colSpan={9} rowSpan={6} align="center">
                {/* //Refreshtable */}
                <Typography variant="body1">Error loading data</Typography>
                <Button onClick={channelStatusListRefresh}>Refresh</Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <CustomerPagination
        totalCount={channelStatusListTotalCount}
        handlePageNavigation={channelStatusListPageNavigation}
        changePageSize={channelStatusListChangePageSize}
        page_size={channelStatusListLimit}
      />
    </div>
  );
}
