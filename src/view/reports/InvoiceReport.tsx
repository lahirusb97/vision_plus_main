import React, { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Typography } from "@mui/material";
import useGetFrames from "../../hooks/lense/useGetFrames";
import { useNavigate } from "react-router";
import { useDeleteDialog } from "../../context/DeleteDialogContext";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const InvoiceReport = () => {
  const { frames, framesLoading, refresh } = useGetFrames();

  const [alignment, setAlignment] = React.useState("factory");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  // Define columns
  const columns = useMemo(
    () => [
      {
        header: "Brand",
        accessorKey: "brand_name",
        size: 130,
      },
      {
        header: "Code",
        accessorKey: "code_name",
        size: 130,
      },
      {
        header: "Color",
        accessorKey: "color_name",
        size: 130,
      },
      {
        header: "Species",
        accessorKey: "species",
        size: 130,
      },
      {
        header: "Price",
        accessorKey: "price",
        size: 60,
      },
      {
        header: "Quantity",
        accessorFn: (row) => row.stock?.[0]?.qty ?? 0,
        size: 50,
      },
      {
        header: "Stock Limit",
        accessorFn: (row) => row.stock?.[0]?.limit ?? 0,
        size: 50,
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
        <Typography
          sx={{ marginBottom: 2, fontWeight: "bold" }}
          variant="h4"
          gutterBottom
        >
          Invoice Report
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 5
          }}
        >
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value="factory">Factory</ToggleButton>
            <ToggleButton value="normal">Normal</ToggleButton>
            <ToggleButton value="channel">Channel</ToggleButton>
          </ToggleButtonGroup>
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
        data={frames}
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
