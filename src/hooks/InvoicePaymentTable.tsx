// InvoiceTable.tsx
import { Box, Typography } from "@mui/material";
import { useMemo } from "react";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { InvoicePaymentReport } from "../model/InvoicePaymentReport";

interface InvoiceTableProps {
  data: InvoicePaymentReport[];
  loading: boolean;
}

export const InvoicePaymentTable = ({ data, loading }: InvoiceTableProps) => {
  const columns = useMemo<MRT_ColumnDef<InvoicePaymentReport>[]>(
    () => [
      {
        accessorKey: "invoice_number",
        header: "Invoice Number",
        size: 100,
      },
      {
        accessorKey: "total_cash_payment",
        header: "Cash",
        size: 100,
      },
      {
        accessorKey: "total_credit_card_payment",
        header: "Card",
        size: 100,
      },
      {
        accessorKey: "total_online_payment",
        header: "Online",
        size: 100,
      },
      {
        accessorKey: "total_payment",
        header: "Total Paid",
        size: 100,
      },
      {
        accessorKey: "balance",
        header: "Balance",
        size: 100,
      },
    ],
    [data]
  );

  return (
    <Box>
      <MaterialReactTable
        columns={columns}
        data={data}
        enableColumnActions={false}
        state={{ isLoading: loading }}
        enableTopToolbar={false}
        initialState={{
          density: "compact",
          pagination: { pageIndex: 0, pageSize: 5 },
        }}
        enableSorting
        enablePagination
        muiTableProps={{
          sx: {
            borderRadius: 2,
            overflow: "hidden",
          },
        }}
        muiTableBodyCellProps={{
          sx: {
            padding: "0px 10px",
          },
        }}
        renderEmptyRowsFallback={() => (
          <Box
            sx={{
              minHeight: "30px", // Set empty rows height
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              No expenses found
            </Typography>
          </Box>
        )}
      />
    </Box>
  );
};
