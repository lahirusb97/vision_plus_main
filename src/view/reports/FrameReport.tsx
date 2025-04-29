import { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Typography } from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const FrameReport = () => {
  // Define columns
  const columns = useMemo(
    () => [
      {
        header: "Date",
        accessorKey: "date",
        size: 130,
      },
      {
        header: "Brand",
        accessorKey: "brand",
        size: 130,
      },
      {
        header: "Code",
        accessorKey: "code",
        size: 130,
      },
      {
        header: "Color",
        accessorKey: "color",
        size: 130,
      },
      {
        header: "Species",
        accessorKey: "species",
        size: 60,
      },
      {
        header: "Shape",
        accessorKey: "shape",
        size: 60,
      },
      // {
      //   header: "Quantity",
      //   accessorFn: (row) => row.stock?.[0]?.qty ?? 0,
      //   size: 50,
      // },
      // {
      //   header: "Stock Limit",
      //   accessorFn: (row) => row.stock?.[0]?.limit ?? 0,
      //   size: 50,
      // },
    ],
    []
  );

  return (
    <Box sx={{ padding: 4, maxWidth: "1300px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        <Typography
          sx={{ marginBottom: 2, fontWeight: "bold" }}
          variant="h4"
          gutterBottom
        >
          Frames Report
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 5,
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="From Date"
              format="YYYY-MM-DD"
              onChange={(date) => console.log(date)}
            />
            <DatePicker
              label="To Date"
              format="YYYY-MM-DD"
              onChange={(date) => console.log(date)}
            />
          </LocalizationProvider>
        </Box>
      </Box>

      <MaterialReactTable
        columns={columns}
        data={[]}
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
    </Box>
  );
};

export default FrameReport;
