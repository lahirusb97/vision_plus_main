import React, { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box } from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const InvoiceReport = () => {
  const [alignment, setAlignment] = React.useState("factory");

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  // Define columns
  const columns = useMemo(
    () => [
      {
        header: "Refraction No",
        accessorKey: "refraction_no",
        size: 130,
      },
      {
        header: "Invoice",
        accessorKey: "invoice_no",
        size: 120,
      },
      {
        header: "Date",
        accessorKey: "date",
        size: 80,
      },
      {
        header: "Time",
        accessorKey: "time",
        size: 130,
      },
      {
        header: "Name",
        accessorKey: "name",
        size: 120,
      },
      {
        header: "NIC",
        accessorKey: "nic",
        size: 120,
      },
      {
        header: "Address",
        accessorKey: "address",
        size: 130,
      },
      {
        header: "Mobile",
        accessorKey: "mobile",
        size: 60,
      },
      {
        header: "Total Amount",
        accessorKey: "total_amount",
        size: 60,
      },
      {
        header: "Pay Amount",
        accessorKey: "pay_amount",
        size: 60,
      },
      {
        header: "Balance",
        accessorKey: "balance",
        size: 60,
      },
    ],
    []
  );

  return (
    <Box sx={{ padding: 2, maxWidth: "1200px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="factory">Factory Order</ToggleButton>
          <ToggleButton value="normal">Normal Order</ToggleButton>
          <ToggleButton value="channel">Channel Order</ToggleButton>
        </ToggleButtonGroup>
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

export default InvoiceReport;
