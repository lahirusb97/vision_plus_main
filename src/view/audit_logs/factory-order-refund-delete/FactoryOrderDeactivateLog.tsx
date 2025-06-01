import React, { useEffect } from "react";
import useGetFactoryOrderDeleteStatus from "../../../hooks/useGetFactoryOrderDeleteStatus";
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
import OrderDeleteRefund from "../../../components/common/order-delete-refund-dialog/OrderDeleteRefund";
export default function FactoryOrderDeactivateLog() {
  const { start_date, end_date } =
    useOutletContext<LogsDateRangePickerManualState>();
  const {
    factoryOrderStatusList,
    factoryOrderStatusListChangePageSize,
    factoryOrderStatusListError,
    factoryOrderStatusListLimit,
    factoryOrderStatusListLoading,
    factoryOrderStatusListPageNavigation,
    factoryOrderStatusListRefresh,
    factoryOrderStatusListSearch,
    factoryOrderStatusListTotalCount,
  } = useGetFactoryOrderDeleteStatus({
    status: "deactivated",
  });
  useEffect(() => {
    if (start_date && end_date) {
      factoryOrderStatusListSearch({
        start_date: start_date.format("YYYY-MM-DD"),
        end_date: end_date.format("YYYY-MM-DD"),
        page_size: factoryOrderStatusListLimit,
        page: 1,
        // doctor: null,
        // invoice_number: null,
        // search: null,
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
            <TableCell align="center">Invoice Date </TableCell>
            <TableCell align="center">Invoice No.</TableCell>
            <TableCell>Patient Name </TableCell>
            {/* <TableCell>Contact Number </TableCell> */}
            <TableCell>Total Invoice </TableCell>
            <TableCell>Total Payment </TableCell>
            <TableCell>Balance </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {factoryOrderStatusListLoading && (
            <TableRow>
              <TableCell colSpan={10} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          )}
          {factoryOrderStatusList?.results?.map((row) => (
            <TableRow key={row.id}>
              <TableCell
                sx={{
                  display: "flex",
                  gap: 1,
                  justifyContent: "space-between",
                }}
                align="center"
              >
                <OrderDeleteRefund
                  order_id={row.id.toString()}
                  dialogType="refund"
                />
              </TableCell>
              <TableCell>
                {formatDateTimeByType(row.deleted_at, "both")}
              </TableCell>
              <TableCell>
                {formatDateTimeByType(row.issued_date, "both")}
              </TableCell>
              <TableCell>{row.invoice_number}</TableCell>
              <TableCell>{row.customer_name}</TableCell>
              {/* <TableCell>{row.total_price}</TableCell> */}
              <TableCell>{numberWithCommas(row.total_price)}</TableCell>
              <TableCell>{numberWithCommas(row.total_payment)}</TableCell>
              <TableCell>
                {numberWithCommas(
                  Number(row.total_price) - Number(row.total_payment)
                )}
              </TableCell>
            </TableRow>
          ))}
          {!factoryOrderStatusListLoading &&
            !factoryOrderStatusListError &&
            factoryOrderStatusList?.results?.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} rowSpan={6} align="center">
                  No data found
                </TableCell>
              </TableRow>
            )}
          {factoryOrderStatusListError && (
            <TableRow>
              <TableCell colSpan={9} rowSpan={6} align="center">
                {/* //Refreshtable */}
                <Typography variant="body1">Error loading data</Typography>
                <Button onClick={factoryOrderStatusListRefresh}>Refresh</Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <CustomerPagination
        totalCount={factoryOrderStatusListTotalCount}
        handlePageNavigation={factoryOrderStatusListPageNavigation}
        changePageSize={factoryOrderStatusListChangePageSize}
        page_size={factoryOrderStatusListLimit}
      />
    </div>
  );
}
