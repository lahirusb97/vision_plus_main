import React, { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, CircularProgress, Alert } from "@mui/material";
import { useOutletContext } from "react-router";
import useGetChannelInvoiceReports from "../../../hooks/report/invoice/useGetChannelInvoiceReports";
import { InvoiceReportContext } from "../layout/InvoiceReportLayout";
import InvoiceSummaryCard from "./InvoiceSummaryCard";

export default function ChannelInvoiceReport() {
  const { end_date, start_date } = useOutletContext<InvoiceReportContext>();

  const {
    channelInvoiceReportData,
    channelInvoiceReportSummary,
    channelInvoiceReportLoading,
    channelInvoiceReportError,
    setChannelInvoiceReportParamsData,
  } = useGetChannelInvoiceReports();

  React.useEffect(() => {
    setChannelInvoiceReportParamsData({
      start_date: start_date?.format("YYYY-MM-DD") || null,
      end_date: end_date?.format("YYYY-MM-DD") || null,
    });
  }, [start_date, end_date]);

  // Define columns for the channel invoice table
  const columns = useMemo(
    () => [
      { header: "Invoice No", accessorKey: "channel_id", size: 100 },
      { header: "Channel No", accessorKey: "channel_number", size: 120 },
      { header: "Date", accessorKey: "date", size: 100 },
      { header: "Time", accessorKey: "time", size: 100 },
      { header: "Customer Name", accessorKey: "customer_name", size: 150 },
      { header: "Address", accessorKey: "address", size: 180 },
      { header: "Mobile", accessorKey: "mobile_number", size: 120 },
      { header: "Total Amount", accessorKey: "total_amount", size: 120 },
      { header: "Paid Amount", accessorKey: "paid_amount", size: 120 },
      { header: "Balance", accessorKey: "balance", size: 120 },
    ],
    []
  );

  return (
    <Box sx={{ padding: 1, maxWidth: "1200px" }}>
      <InvoiceSummaryCard data={channelInvoiceReportSummary} />
      {channelInvoiceReportLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : channelInvoiceReportError ? (
        <Alert severity="error">Error loading data</Alert>
      ) : (
        <MaterialReactTable
          columns={columns}
          data={channelInvoiceReportData || []}
          enableColumnFilters={false}
          enableSorting
          enablePagination
          muiTableProps={{
            sx: {
              borderRadius: 2,
              overflow: "hidden",
            },
          }}
        />
      )}
    </Box>
  );
}
