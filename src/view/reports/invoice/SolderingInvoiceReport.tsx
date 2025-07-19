import React, { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, CircularProgress, Alert } from "@mui/material";
import { useOutletContext } from "react-router";
import useGetSolderingInvoiceReports from "../../../hooks/report/invoice/useGetSolderingInvoiceReports";
import { InvoiceReportContext } from "../layout/InvoiceReportLayout";
import InvoiceSummaryCard from "./InvoiceSummaryCard";

export default function SolderingInvoiceReport() {
  const { end_date, start_date } = useOutletContext<InvoiceReportContext>();

  const {
    solderingInvoiceReportData,
    solderingInvoiceReportSummary,
    solderingInvoiceReportLoading,
    solderingInvoiceReportError,
    setSolderingInvoiceReportParamsData,
  } = useGetSolderingInvoiceReports();

  React.useEffect(() => {
    setSolderingInvoiceReportParamsData({
      start_date: start_date?.format("YYYY-MM-DD") || null,
      end_date: end_date?.format("YYYY-MM-DD") || null,
    });
  }, [start_date, end_date]);

  // Define columns for the soldering invoice table
  const columns = useMemo(
    () => [
      { header: "Order ID", accessorKey: "order_id", size: 100 },
      { header: "Invoice No", accessorKey: "invoice_number", size: 120 },
      { header: "Date", accessorKey: "date", size: 100 },
      { header: "Time", accessorKey: "time", size: 100 },
      { header: "Customer Name", accessorKey: "customer_name", size: 150 },
      { header: "Address", accessorKey: "address", size: 180 },
      { header: "Mobile", accessorKey: "mobile_number", size: 120 },
      { header: "Total Amount", accessorKey: "total_amount", size: 120 },
      { header: "Paid Amount", accessorKey: "paid_amount", size: 120 },
      { header: "Balance", accessorKey: "balance", size: 120 },
      { header: "Status", accessorKey: "status", size: 100 },
      // { header: "Progress Status", accessorKey: "progress_status", size: 150 },
    ],
    []
  );

  return (
    <Box sx={{ padding: 1, maxWidth: "1200px" }}>
      <InvoiceSummaryCard data={solderingInvoiceReportSummary} />
      {solderingInvoiceReportLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : solderingInvoiceReportError ? (
        <Alert severity="error">Error loading data</Alert>
      ) : (
        <MaterialReactTable
          columns={columns}
          data={solderingInvoiceReportData || []}
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
