import React from "react";
import { Box, Checkbox, Typography } from "@mui/material";
import { useMemo } from "react";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";

// Define the TypeScript type
interface TodayBankingItem {
  bank_name: string;
  account_number: string;
  amount: number;
  is_confirmed: boolean;
}

interface TodayBankingTableProps {
  data: TodayBankingItem[];
  loading: boolean;
}

const TodayBankingTable: React.FC<TodayBankingTableProps> = ({
  data,
  loading,
}) => {
  const columns = useMemo<MRT_ColumnDef<TodayBankingItem>[]>(
    () => [
      {
        accessorKey: "bank_name",
        header: "Bank",
        size: 50,
      },
      {
        accessorKey: "account_number",
        header: "Account",
        size: 50,
      },
      {
        accessorKey: "amount",
        header: "Amount",
        size: 50,
        Cell: ({ cell }) => {
          return cell.getValue<number>().toLocaleString();
        },
      },
      // {
      //   accessorKey: "is_confirmed",
      //   header: "Confirmed",
      //   size: 50,
      //   Cell: ({ cell }) => {
      //     return (
      //       <Checkbox
      //         size="small"
      //         checked={cell.getValue<boolean>()}
      //         disabled
      //       />
      //     );
      //   },
      // },
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
            minWidth: "350px",
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
              No banking transactions found
            </Typography>
          </Box>
        )}
      />
    </Box>
  );
};

export default TodayBankingTable;
