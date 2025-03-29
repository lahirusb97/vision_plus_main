import React, { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Typography } from "@mui/material";
import useGetFrames from "../../hooks/lense/useGetFrames";
import { useNavigate } from "react-router";
import { useDeleteDialog } from "../../context/DeleteDialogContext";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const BestCustomer = () => {
  const { frames, framesLoading, refresh } = useGetFrames();

  // Define columns
  const columns = useMemo(
    () => [
      {
        header: "Invoice",
        accessorKey: "invoice",
        size: 130,
      },
      {
        header: "Customer",
        accessorKey: "customer",
        size: 130,
      },
      {
        header: "Mobile No",
        accessorKey: "mobile",
        size: 130,
      },
      {
        header: "NIC",
        accessorKey: "nic",
        size: 130,
      },
      {
        header: "Date",
        accessorKey: "date",
        size: 60,
      },
      {
        header: "Price",
        accessorKey: "price",
        size: 60,
      }
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
          Best Customer
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

export default BestCustomer;
