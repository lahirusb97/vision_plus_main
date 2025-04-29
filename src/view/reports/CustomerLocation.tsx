import { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Typography } from "@mui/material";

const CustomerLocation = () => {
  // Define columns
  const columns = useMemo(
    () => [
      {
        header: "Invoice",
        accessorKey: "invoice",
        size: 130,
      },
      {
        header: "Customer Name",
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
        header: "Address",
        accessorKey: "address",
        size: 130,
      },
      {
        header: "Date",
        accessorKey: "date",
        size: 60,
      },
      {
        header: "Age",
        accessorKey: "age",
        size: 60,
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
          Customer Location
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 5,
          }}
        ></Box>
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

export default CustomerLocation;
