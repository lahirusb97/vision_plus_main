import { Box, Typography } from "@mui/material";
import { useMemo } from "react";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { SafeTransaction } from "../../model/SafeTransactionSerializer";

interface TodayBankingTableProps {
  data: SafeTransaction[];
  loading: boolean;
}

const SafeTransactionsTable: React.FC<TodayBankingTableProps> = ({
  data,
  loading,
}) => {
  const columns = useMemo<MRT_ColumnDef<SafeTransaction>[]>(
    () => [
      {
        accessorKey: "transaction_type_display",
        header: "Type",
        size: 100,
      },

      {
        accessorKey: "amount",
        header: "Amount",
        size: 50,
        Cell: ({ cell }) => {
          return cell.getValue<number>().toLocaleString();
        },
      },
      {
        accessorKey: "reason",
        header: "Reason",
        size: 150,
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
              minHeight: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              No safe transactions found
            </Typography>
          </Box>
        )}
      />
    </Box>
  );
};

export default SafeTransactionsTable;
