import { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Typography } from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const InvoiceSummary = () => {
  // Define columns
  const columns = useMemo(
    () => [
      {
        header: "Refraction No",
        accessorKey: "refraction_no",
        size: 130,
      },
      {
        header: "Invoice No",
        accessorKey: "invoice",
        size: 130,
      },
      {
        header: "Name",
        accessorKey: "name",
        size: 130,
      },
      {
        header: "Mobile No",
        accessorKey: "mobile",
        size: 130,
      },
      {
        header: "Address",
        accessorKey: "address",
        size: 150,
      },
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
          Invoice Summary
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
              label="Date"
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

export default InvoiceSummary;
