import { useMemo } from "react";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { ChannelPaymentReport } from "../model/ChannelReportModel";
import { Box, Typography } from "@mui/material";
interface ChannelTableProps {
  data: ChannelPaymentReport[];
  loading: boolean;
}

export const ChannelPaymentTable = ({ data, loading }: ChannelTableProps) => {
  const columns = useMemo<MRT_ColumnDef<ChannelPaymentReport>[]>(
    () => [
      {
        accessorKey: "invoice_number",
        header: "Invoice No",
        size: 50,
      },
      {
        accessorKey: "channel_no",
        header: "channel No",
        size: 100,
      },
      {
        accessorKey: "amount_cash",
        header: "Cash",
        size: 100,
      },
      {
        accessorKey: "amount_credit_card",
        header: "Card",
        size: 100,
      },
      {
        accessorKey: "amount_online",
        header: "Online",
        size: 100,
      },
      {
        accessorKey: "total_paid",
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
        muiTableBodyCellProps={({ row }) => ({
          sx: {
            padding: "0px 10px",
            backgroundColor: row.original.is_deleted ? "#ffebee" : "inherit", // Light red background for deleted rows
            color: row.original.is_deleted ? "#d32f2f" : "inherit", // Darker red text for deleted rows
          },
        })}
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
