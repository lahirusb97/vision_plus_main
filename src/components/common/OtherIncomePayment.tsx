import { Box, Typography } from "@mui/material";
import { useMemo } from "react";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { OtherIncomeReport } from "../../model/OtherIncomeReport";

interface TodayBankingTableProps {
  data: OtherIncomeReport[];
  loading: boolean;
}

const OtherIncomePayment: React.FC<TodayBankingTableProps> = ({
  data,
  loading,
}) => {
  const columns = useMemo<MRT_ColumnDef<OtherIncomeReport>[]>(
    () => [
      {
        accessorKey: "category_name",
        header: "Category",
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
        accessorKey: "note",
        header: "Note",
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
            minWidth: "400px",
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
              No Other Income transactions found
            </Typography>
          </Box>
        )}
      />
    </Box>
  );
};

export default OtherIncomePayment;
