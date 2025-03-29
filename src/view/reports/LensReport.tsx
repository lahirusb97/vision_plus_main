import React, { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Typography } from "@mui/material";
import useGetFrames from "../../hooks/lense/useGetFrames";
import { useNavigate } from "react-router";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const LensReport = () => {
  const { frames, framesLoading, refresh } = useGetFrames();

  const [alignment, setAlignment] = React.useState("stock_lens");

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
        header: "Date",
        accessorKey: "date",
        size: 150,
      },
      {
        header: "Lens Type",
        accessorKey: "lens_type",
        size: 150,
      },
      {
        header: "Coating",
        accessorKey: "coating",
        size: 150,
      },
      {
        header: "Lens Brand",
        accessorKey: "lens_brand",
        size: 150,
      },
      {
        header: "Quantity",
        accessorKey: "quantity",
        size: 150,
      },
    ],
    []
  );

  return (
    <Box sx={{ padding: 4, maxWidth: "1200px" }}>
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
          <ToggleButton value="stock_lens">Stock Lens</ToggleButton>
          <ToggleButton value="non_stock_lens">Non Stock Lens</ToggleButton>
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

export default LensReport;
