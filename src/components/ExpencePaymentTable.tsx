import { useMemo } from "react";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { Box, IconButton, Typography } from "@mui/material";
import { ExpenseItem } from "../model/ExpenceModel";
import { formatDateTimeByType } from "../utils/formatDateTimeByType";
import { Edit } from "@mui/icons-material";
import { useNavigate } from "react-router";
interface ChannelTableProps {
  data: ExpenseItem[];
  loading: boolean;
}

export const ExpencePaymentTable = ({ data, loading }: ChannelTableProps) => {
  const navigate = useNavigate();
  const columns = useMemo<MRT_ColumnDef<ExpenseItem>[]>(
    () => [
      {
        accessorKey: "created_at",
        header: "Time",
        size: 50,
        Cell: ({ row }) => {
          const value = row.original.created_at;
          return value ? formatDateTimeByType(value, "time") : "";
        },
      },
      {
        accessorKey: "main_category_name",
        header: "Main Category",
        size: 100,
      },
      {
        accessorKey: "sub_category_name",
        header: "Sub Category",
        size: 100,
      },
      {
        accessorKey: "note",
        header: "Note",
        size: 160,
        Cell: ({ row }) => (
          <Typography
            sx={{
              whiteSpace: "normal", // Enable text wrapping
              wordBreak: "break-word", // Break words if they exceed column width
              lineHeight: "1.2", // Add some line spacing
              fontSize: ".8rem",
              maxHeight: "60px", // Optional: limit the height
              overflow: "hidden", // Hide overflow if needed
              textOverflow: "ellipsis", // Show ellipsis for overflow
            }}
          >
            {row.original.note}
          </Typography>
        ),
      },

      {
        accessorKey: "paid_from_safe",
        header: "Paid From",
        size: 80,
        Cell: ({ row }) => {
          const value = row.original.paid_from_safe;
          return value ? "Safe" : "Cashier";
        },
      },
      {
        accessorKey: "amount",
        header: "Amount ",
        size: 80,
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
        enableRowActions
        initialState={{
          density: "compact",
          pagination: { pageIndex: 0, pageSize: 5 },
        }}
        renderRowActions={({ row }) => (
          <Box>
            <IconButton
              size="small"
              onClick={() => {
                const params = new URLSearchParams({
                  created_at: row.original.created_at,
                  main_category_name: row.original.main_category_name,
                  sub_category_name: row.original.sub_category_name,
                  note: row.original.note,
                  amount: row.original.amount,
                }).toString();
                navigate(
                  `/account/expence/update/${row.original.id}/?${params}`
                );
              }}
            >
              <Edit sx={{ fontSize: "1rem" }} />
            </IconButton>
          </Box>
        )}
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
