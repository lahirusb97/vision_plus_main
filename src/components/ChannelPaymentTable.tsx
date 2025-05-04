import { useMemo } from "react";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { ChannelPaymentReport } from "../model/ChannelReportModel";
import { Box } from "@mui/material";
interface ChannelTableProps {
  data: ChannelPaymentReport[];
  loading: boolean;
}

export const ChannelPaymentTable = ({ data, loading }: ChannelTableProps) => {
  const columns = useMemo<MRT_ColumnDef<ChannelPaymentReport>[]>(
    () => [
      {
        accessorKey: "appointment_id",
        header: "Channel ID",
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
          pagination: { pageIndex: 0, pageSize: 15 },
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
      />
    </Box>
  );
};
