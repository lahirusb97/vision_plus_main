import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { useGetBranch } from "../../../hooks/useGetBranch";
import useGetFrameSalesHistory from "../../../hooks/report/useGetFrameSalesHistory";
import dayjs, { Dayjs } from "dayjs";

interface BranchOption {
  id: string;
  name: string;
}

const FrameInventoryReport = () => {
  // State for filters
  const [branchId, setBranchId] = useState<string>();
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());

  // Fetch branches
  const { brancheData, branchloading } = useGetBranch();

  // Format branches for dropdown and filter out branch with ID 4
  const branchOptions: BranchOption[] = useMemo(() => {
    if (!brancheData) return [];
    return brancheData
      .filter((branch) => branch.id !== 4) // Exclude branch with ID 4
      .map((branch) => ({
        id: branch.id.toString(),
        name: branch.branch_name,
      }));
  }, [brancheData]);

  // Set the first branch as selected by default when branches are loaded
  useEffect(() => {
    if (branchOptions.length > 0 && !branchId && !branchloading) {
      setBranchId(branchOptions[0].id);
    }
  }, [branchOptions, branchId, branchloading]);

  // Fetch frame sales history
  const {
    frameSalesHistoryList: data,
    frameSalesHistoryListLoading: loading,
    frameSalesHistoryListError: error,
    frameSalesHistoryListSearch: setSearchParams,
  } = useGetFrameSalesHistory(branchId);

  // Handle branch change
  const handleBranchChange = (event: SelectChangeEvent) => {
    setBranchId(event.target.value);
  };

  // Handle search
  const handleSearch = () => {
    setSearchParams({
      branch_id: branchId,
      date_start: startDate ? startDate.format("YYYY-MM-DD") : null,
      date_end: endDate ? endDate.format("YYYY-MM-DD") : null,
      store_branch_id: "", // Add your store branch ID if needed
    });
  };

  // Define columns for the table
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "brand",
        header: "Brand",
        size: 150,
      },
      {
        accessorKey: "code",
        header: "Code",
        size: 100,
      },
      {
        accessorKey: "color",
        header: "Color",
        size: 100,
      },
      {
        accessorKey: "size",
        header: "Size",
        size: 80,
      },
      {
        accessorKey: "species",
        header: "Species",
        size: 100,
      },
      {
        accessorKey: "current_branch_qty",
        header: "Branch Qty",
        size: 100,
      },
      {
        accessorKey: "store_branch_qty",
        header: "Store Qty",
        size: 100,
      },
      {
        accessorKey: "other_branches_qty",
        header: "Total Branches Qty",
        size: 150,
      },
      {
        accessorKey: "total_qty",
        header: "Total Qty",
        size: 100,
      },
      {
        accessorKey: "sold_count",
        header: "Sold Count",
        size: 100,
      },
    ],
    []
  );

  // Handle reset
  const handleReset = () => {
    setBranchId("");
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Frame Inventory Report
          </Typography>

          {/* Filters */}
          <Paper sx={{ p: 2, mb: 3 }} elevation={1}>
            <Grid container spacing={2} alignItems="flex-end">
              {/* Branch Select */}
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small">
                  <InputLabel id="branch-select-label">Branch</InputLabel>
                  <Select
                    labelId="branch-select-label"
                    id="branch-select"
                    value={branchId}
                    label="Branch"
                    onChange={handleBranchChange}
                    disabled={branchloading}
                  >
                    {branchOptions.map((branch) => (
                      <MenuItem key={branch.id} value={branch.id}>
                        {branch.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Start Date */}
              <Grid item xs={12} sm={2.5}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth size="small" />
                  )}
                />
              </Grid>

              {/* End Date */}
              <Grid item xs={12} sm={2.5}>
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth size="small" />
                  )}
                />
              </Grid>

              {/* Action Buttons */}
              <Grid item xs={12} sm={3} sx={{ display: "flex", gap: 1 }}>
                <Button
                  variant="contained"
                  onClick={handleSearch}
                  disabled={loading}
                  fullWidth
                >
                  {loading ? <CircularProgress size={24} /> : "Search"}
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleReset}
                  disabled={loading}
                  fullWidth
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          </Paper>

          {/* Data Table */}
          <Box sx={{ mt: 3 }}>
            <MaterialReactTable
              columns={columns}
              data={data || []}
              state={{
                isLoading: loading,
              }}
              enableColumnActions
              enablePagination
              enableSorting
              enableTopToolbar
              enableBottomToolbar
              muiTablePaperProps={{
                elevation: 0,
                sx: {
                  border: "1px solid #e0e0e0",
                  borderRadius: 1,
                },
              }}
              muiTableHeadCellProps={{
                sx: {
                  fontWeight: "bold",
                  backgroundColor: "#f5f5f5",
                },
              }}
              muiTableBodyCellProps={{
                sx: {
                  borderRight: "1px solid #f0f0f0",
                  "&:last-child": {
                    borderRight: "none",
                  },
                },
              }}
              muiTableContainerProps={{
                sx: {
                  maxHeight: "calc(100vh - 300px)",
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </LocalizationProvider>
  );
};

export default FrameInventoryReport;
