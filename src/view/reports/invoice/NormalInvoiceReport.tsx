import React, { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, CircularProgress, Alert } from "@mui/material";
import { useOutletContext } from "react-router";
import useGetNormalInvoiceReports from "../../../hooks/report/invoice/useGetNormalInvoiceReports";
import { InvoiceReportContext } from "../layout/InvoiceReportLayout";
import InvoiceSummaryCard from "./InvoiceSummaryCard";

export default function NormalInvoiceReport() {
  const { end_date, start_date } = useOutletContext<InvoiceReportContext>();

  const {
    normalInvoiceReportData,
    normalInvoiceReportSummary,
    normalInvoiceReportLoading,
    normalInvoiceReportError,
    setNormalInvoiceReportParamsData,
  } = useGetNormalInvoiceReports();

  React.useEffect(() => {
    setNormalInvoiceReportParamsData({
      start_date: start_date?.format("YYYY-MM-DD") || null,
      end_date: end_date?.format("YYYY-MM-DD") || null,
    });
  }, [start_date, end_date]);

  // Define columns for the table
  const columns = useMemo(
    () => [
      //   { header: "Refraction No", accessorKey: "refraction_number", size: 130 },
      { header: "Invoice No", accessorKey: "invoice_number", size: 120 },
      { header: "Date", accessorKey: "date", size: 100 },
      { header: "Time", accessorKey: "time", size: 100 },
      { header: "Customer Name", accessorKey: "customer_name", size: 150 },
      { header: "NIC", accessorKey: "nic", size: 120 },
      { header: "Address", accessorKey: "address", size: 180 },
      { header: "Mobile", accessorKey: "mobile_number", size: 120 },
      { header: "Total Amount", accessorKey: "total_amount", size: 120 },
      { header: "Paid Amount", accessorKey: "paid_amount", size: 120 },
      { header: "Balance", accessorKey: "balance", size: 120 },
      { header: "Bill", accessorKey: "bill", size: 120 },
    ],
    []
  );

  return (
    <Box sx={{ padding: 1, maxWidth: "1200px" }}>
      {/* Summary Section */}
      <InvoiceSummaryCard data={normalInvoiceReportSummary} />

      {/* Table Section */}
      {normalInvoiceReportLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : normalInvoiceReportError ? (
        <Alert severity="error">Error loading data</Alert>
      ) : (
        <MaterialReactTable
          columns={columns}
          data={normalInvoiceReportData || []}
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
