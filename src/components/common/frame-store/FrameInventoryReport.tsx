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
import { MaterialReactTable, type MRT_ColumnDef, useMaterialReactTable } from "material-react-table";
import { useGetBranch } from "../../../hooks/useGetBranch";
import useGetFrameSalesHistory from "../../../hooks/report/useGetFrameSalesHistory";
import dayjs, { Dayjs } from "dayjs";

interface BranchOption {
  id: string;
  name: string;
}

interface BranchData {
  branch_id: number;
  branch_name: string;
  stock_count: number;
  stock_received: number;
  sold_qty: number;
}

interface FrameSalesHistory {
  frame_id: number;
  brand: string;
  code: string;
  color: string;
  size: string;
  species: string;
  store_branch_qty: number;
  other_branches_qty: number;
  total_qty: number;
  sold_count: number;
  current_branch_qty: number;
  as_of_date: string;
  branches: BranchData[];
}

const FrameInventoryReport = () => {
  const [branchId, setBranchId] = useState<string>();
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());

  const { brancheData, branchloading } = useGetBranch();

  const branchOptions: BranchOption[] = useMemo(() => {
    if (!brancheData) return [];
    return brancheData
      .filter((branch) => branch.id !== 4)
      .map((branch) => ({
        id: branch.id.toString(),
        name: branch.branch_name,
      }));
  }, [brancheData]);

  useEffect(() => {
    if (branchOptions.length > 0 && !branchId && !branchloading) {
      setBranchId(branchOptions[0].id);
    }
  }, [branchOptions, branchId, branchloading]);

  const {
    frameSalesHistoryList,
    frameSalesHistoryListLoading,
    frameSalesHistoryListSearch,
  } = useGetFrameSalesHistory(branchId);

  const handleBranchChange = (event: SelectChangeEvent) => {
    setBranchId(event.target.value);
  };

  const handleSearch = () => {
    frameSalesHistoryListSearch({
      branch_id: branchId,
      date_start: startDate ? startDate.format("YYYY-MM-DD") : null,
      date_end: endDate ? endDate.format("YYYY-MM-DD") : null,
      store_branch_id: "",
    });
  };

  const handleReset = () => {
    setBranchId("");
    setStartDate(null);
    setEndDate(null);
  };

  const transformedData = useMemo(() => {
    return (frameSalesHistoryList || []).map((item) => {
      const branchData: Record<string, any> = {};
      item.branches.forEach((branch) => {
        branchData[`branch_${branch.branch_id}_stock`] = branch.stock_count;
        branchData[`branch_${branch.branch_id}_received`] = branch.stock_received;
        branchData[`branch_${branch.branch_id}_sold`] = branch.sold_qty || 0;
      });

      // Handle sold_count which can be an object or number
      let soldCount = 0;
      if (typeof item.sold_count === "number") {
        soldCount = item.sold_count;
      } else if (item.sold_count && typeof item.sold_count === "object") {
        // Sum all values if sold_count is an object
        soldCount = Object.values(item.sold_count).reduce(
          (sum: number, val: any) => sum + (Number(val) || 0),
          0
        );
      }

      return {
        ...item,
        ...branchData,
        sold_count: soldCount, // Ensure sold_count is always a number
      };
    });
  }, [frameSalesHistoryList]);

  const branchGroupedColumns = useMemo<
    MRT_ColumnDef<FrameSalesHistory>[]
  >(() => {
    const first = frameSalesHistoryList?.[0];
    if (!first) return [];

    const colors = ["#e3f2fd", "#fce4ec", "#e8f5e9", "#fff3e0", "#f3e5f5"]; // light blue, pink, green, orange, purple
    let colorIndex = 0;

    return first.branches.map((branch) => {
      const bgColor = colors[colorIndex % colors.length];
      colorIndex++;

      return {
        header: branch.branch_name,
        columns: [
          {
            accessorKey: `branch_${branch.branch_id}_stock`,
            header: "Stock",
            size: 100,
            muiTableHeadCellProps: {
              sx: { 
                backgroundColor: bgColor,
                fontWeight: 'bold',
                borderBottom: '2px solid #ddd'
              },
            },
            muiTableBodyCellProps: {
              sx: { 
                backgroundColor: `${bgColor}33`,
                fontWeight: 'bold',
                borderBottom: '1px solid #eee'
              },
            },
            aggregationFn: 'sum',
            AggregatedCell: ({ cell, row }) => (
              <Box sx={{ fontWeight: 'bold' }}>
                {cell.getValue<number>()?.toLocaleString()}
              </Box>
            ),
          },
          {
            accessorKey: `branch_${branch.branch_id}_received`,
            header: "Received",
            size: 100,
            muiTableHeadCellProps: {
              sx: { 
                backgroundColor: bgColor,
                fontWeight: 'bold',
                borderBottom: '2px solid #ddd'
              },
            },
            muiTableBodyCellProps: {
              sx: { 
                backgroundColor: `${bgColor}33`,
                borderBottom: '1px solid #eee'
              },
            },
            aggregationFn: 'sum',
            AggregatedCell: ({ cell }) => (
              <Box sx={{ fontWeight: 'bold' }}>
                {cell.getValue<number>()?.toLocaleString()}
              </Box>
            ),
          },
          {
            accessorKey: `branch_${branch.branch_id}_sold`,
            header: "Sold",
            size: 80,
            muiTableHeadCellProps: {
              sx: { 
                backgroundColor: bgColor,
                fontWeight: 'bold',
                borderBottom: '2px solid #ddd'
              },
            },
            muiTableBodyCellProps: {
              sx: { 
                backgroundColor: `${bgColor}33`,
                color: 'error.main',
                fontWeight: 'bold',
                borderBottom: '1px solid #eee'
              },
            },
            aggregationFn: 'sum',
            AggregatedCell: ({ cell }) => (
              <Box sx={{ color: 'error.main', fontWeight: 'bold' }}>
                {cell.getValue<number>()?.toLocaleString()}
              </Box>
            ),
          },
        ],
      };
    });
  }, [frameSalesHistoryList]);

  const columns = useMemo<MRT_ColumnDef<FrameSalesHistory>[]>(() => {
    return [
      {
        header: "Frame Info",
        columns: [
          { accessorKey: "brand", header: "Brand", size: 150 },
          { accessorKey: "code", header: "Code", size: 100 },
          { accessorKey: "color", header: "Color", size: 100 },
          { accessorKey: "size", header: "Size", size: 80 },
          { accessorKey: "species", header: "Species", size: 100 },
          { accessorKey: "total_qty", header: "Total Qty", size: 100 },
          { accessorKey: "sold_count", header: "Sold Count", size: 120 },
          { accessorKey: "as_of_date", header: "As of Date", size: 140 },
        ],
      },
      ...branchGroupedColumns,
    ];
  }, [branchGroupedColumns]);

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

              <Grid item xs={12} sm={3} sx={{ display: "flex", gap: 1 }}>
                <Button
                  variant="contained"
                  onClick={handleSearch}
                  disabled={frameSalesHistoryListLoading}
                  fullWidth
                >
                  {frameSalesHistoryListLoading ? (
                    <CircularProgress size={24} />
                  ) : (
                    "Search"
                  )}
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleReset}
                  disabled={frameSalesHistoryListLoading}
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
              data={transformedData}
              state={{
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
                  overflowX: "auto",
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
