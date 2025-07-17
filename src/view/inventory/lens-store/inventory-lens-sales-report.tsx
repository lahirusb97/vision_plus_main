import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  Grid,
  Paper,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { useGetBranch } from "../../../hooks/useGetBranch";
import dayjs, { Dayjs } from "dayjs";
import { useTheme, useMediaQuery } from "@mui/material";
import useGetLensSalesHistory from "../../../hooks/report/useGetLensSalesHistory";
import { LenseModel, Power } from "../../../model/LenseModel";
import { addID, cylID, sphID } from "../../../data/staticVariables";
import returnPlusSymbol from "../../../utils/returnPlusSymbol";

interface BranchOption {
  id: string;
  name: string;
}

interface BranchData {
  branch_id: number;
  branch_name: string;
  stock_count: number;
  stock_received: number;
  stock_removed: number;
  sold_qty: number;
}

interface LensSalesHistory {
  lens_id: number;
  lens_type: string;
  coating: string;
  brand: string;
  species: string;
  other_branches_qty: number;
  sold_count: number;
  total_available: number;
  as_of_date: string;
  powers: Power[];
  branches: BranchData[];
}

const FrameInventoryReport = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
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
    lensSalesHistoryList,
    lensSalesHistoryListLoading,
    lensSalesHistoryListSearch,
  } = useGetLensSalesHistory();
  console.log(lensSalesHistoryList);
  const handleBranchChange = (event: SelectChangeEvent) => {
    setBranchId(event.target.value);
  };

  const handleSearch = () => {
    lensSalesHistoryListSearch({
      branch_id: null,
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
    return (lensSalesHistoryList || []).map((item) => {
      const branchData: Record<string, any> = {};
      item.branches.forEach((branch) => {
        branchData[`branch_${branch.branch_id}_stock`] = branch.stock_count;
        branchData[`branch_${branch.branch_id}_received`] =
          branch.stock_received;
        branchData[`branch_${branch.branch_id}_removed`] =
          branch.stock_removed || 0;
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
  }, [lensSalesHistoryList]);

  const branchGroupedColumns = useMemo<
    MRT_ColumnDef<LensSalesHistory>[]
  >(() => {
    if (!lensSalesHistoryList?.length) return [];

    // Get all unique branches across all items
    const allBranches = Array.from(
      new Map(
        lensSalesHistoryList
          .flatMap((item) => item.branches)
          .map((branch) => [branch.branch_id, branch])
      ).values()
    );

    const colors = ["#e3f2fd", "#fce4ec", "#e8f5e9", "#fff3e0", "#f3e5f5"]; // light blue, pink, green, orange, purple
    let colorIndex = 0;

    return allBranches.map((branch) => {
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
                fontWeight: "bold",
                borderBottom: "2px solid #ddd",
              },
            },
            muiTableBodyCellProps: {
              sx: {
                backgroundColor: `${bgColor}33`,
                fontWeight: "bold",
                borderBottom: "1px solid #eee",
              },
            },
            aggregationFn: "sum",
            AggregatedCell: ({ cell }) => (
              <Box sx={{ fontWeight: "bold" }}>
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
                fontWeight: "bold",
                borderBottom: "2px solid #ddd",
              },
            },
            muiTableBodyCellProps: {
              sx: {
                backgroundColor: `${bgColor}33`,
                borderBottom: "1px solid #eee",
              },
            },
            aggregationFn: "sum",
            AggregatedCell: ({ cell }) => (
              <Box sx={{ fontWeight: "bold" }}>
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
                fontWeight: "bold",
                borderBottom: "2px solid #ddd",
              },
            },
            muiTableBodyCellProps: {
              sx: {
                backgroundColor: `${bgColor}33`,
                color: "error.main",
                fontWeight: "bold",
                borderBottom: "1px solid #eee",
              },
            },
            aggregationFn: "sum",
            AggregatedCell: ({ cell }) => (
              <Box sx={{ color: "error.main", fontWeight: "bold" }}>
                {cell.getValue<number>()?.toLocaleString()}
              </Box>
            ),
          },
          {
            accessorKey: `branch_${branch.branch_id}_removed`,
            header: "Removed",
            size: 80,
            muiTableHeadCellProps: {
              sx: {
                backgroundColor: bgColor,
                fontWeight: "bold",
                borderBottom: "2px solid #ddd",
              },
            },
            muiTableBodyCellProps: {
              sx: {
                backgroundColor: `${bgColor}33`,
                color: "error.main",
                fontWeight: "bold",
                borderBottom: "1px solid #eee",
              },
            },
            aggregationFn: "sum",
            AggregatedCell: ({ cell }) => (
              <Box sx={{ color: "error.main", fontWeight: "bold" }}>
                {cell.getValue<number>()?.toLocaleString()}
              </Box>
            ),
          },
        ],
      };
    });
  }, [lensSalesHistoryList]);

  const columns = useMemo<MRT_ColumnDef<LensSalesHistory>[]>(() => {
    return [
      {
        header: "Frame Info",
        columns: [
          { accessorKey: "lens_type", header: "Brand", size: 150 },
          { accessorKey: "coating", header: "Code", size: 100 },
          { accessorKey: "brand", header: "Color", size: 100 },
          {
            header: "Side",
            id: "side",
            muiTableHeadCellProps: { align: "center" as const },
            muiTableBodyCellProps: { align: "center" as const },
            Cell: ({ row }: { row: { original: LenseModel } }) => {
              const sphEntry = row.original.powers.find(
                (p) => p.power === sphID
              );
              return sphEntry && sphEntry.side ? sphEntry.side : "-";
            },
            size: 30,
          },
          {
            header: "SPH",
            id: "sph",
            muiTableHeadCellProps: { align: "center" as const },
            muiTableBodyCellProps: { align: "center" as const },
            accessorFn: (row: LenseModel) => {
              const sph = row.powers.find((p) => p.power === sphID);
              console.log(row);
              return sph
                ? `${returnPlusSymbol(String(sph.value))}${parseFloat(
                    String(sph.value)
                  ).toFixed(2)}`
                : "-";
            },
            size: 30,
          },
          {
            header: "CYL",
            id: "cyl",
            muiTableHeadCellProps: { align: "center" as const },
            muiTableBodyCellProps: { align: "center" as const },
            accessorFn: (row: LenseModel) => {
              const cyl = row.powers.find((p) => p.power === cylID);
              return cyl
                ? `${returnPlusSymbol(String(cyl.value))}${parseFloat(
                    String(cyl.value)
                  ).toFixed(2)}`
                : "-";
            },
            size: 30,
          },
          {
            header: "ADD",
            id: "add",
            muiTableHeadCellProps: { align: "center" as const },
            muiTableBodyCellProps: { align: "center" as const },
            accessorFn: (row: LenseModel) => {
              const add = row.powers.find((p) => p.power === addID);
              return add
                ? `${returnPlusSymbol(String(add.value))}${parseFloat(
                    String(add.value)
                  ).toFixed(2)}`
                : "-";
            },
            size: 30,
          },
          {
            accessorKey: "total_available",
            header: "Total Available",
            size: 100,
          },
          { accessorKey: "sold_count", header: "Total Sold", size: 120 },
        ],
      },
      ...branchGroupedColumns,
    ];
  }, [branchGroupedColumns]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          width: "100%",
          maxWidth: "100vw",
          overflowX: "hidden",
          p: isSmallScreen ? 1 : 2,
        }}
      >
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Frame Inventory Report
            </Typography>

            {/* Filters */}
            <Paper sx={{ p: { xs: 2, sm: 3 }, mb: 3 }} elevation={1}>
              <Grid container spacing={2} alignItems="flex-end">
                <Grid item xs={12} sm={6} md={3}>
                  <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        size: "small",
                        sx: { "& .MuiInputBase-root": { height: "40px" } },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        size: "small",
                        sx: { "& .MuiInputBase-root": { height: "40px" } },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={6} sm={3} md={2} sx={{ mt: { xs: 0, sm: 0 } }}>
                  <Button
                    variant="contained"
                    onClick={handleSearch}
                    disabled={lensSalesHistoryListLoading}
                    fullWidth
                    size="medium"
                    sx={{ height: "40px" }}
                  >
                    {lensSalesHistoryListLoading ? (
                      <CircularProgress size={24} />
                    ) : (
                      "Search"
                    )}
                  </Button>
                </Grid>

                <Grid item xs={6} sm={3} md={2} sx={{ mt: { xs: 0, sm: 0 } }}>
                  <Button
                    variant="outlined"
                    onClick={handleReset}
                    disabled={lensSalesHistoryListLoading}
                    fullWidth
                    size="medium"
                    sx={{ height: "40px" }}
                  >
                    Reset
                  </Button>
                </Grid>
              </Grid>
            </Paper>

            {/* Data Table */}
            <Box
              sx={{
                mt: 3,
                width: "100%",
                maxWidth: "100%",
                overflow: "hidden",
                "& .MuiTableContainer-root": {
                  maxWidth: "100%",
                  maxHeight: "calc(100vh - 300px)",
                  overflow: "auto",
                  "&::-webkit-scrollbar": {
                    height: "8px",
                    width: "8px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#bdbdbd",
                    borderRadius: "4px",
                  },
                  "& .MuiTable-root": {
                    minWidth: "max-content",
                    width: "100%",
                  },
                  "& .MuiTableCell-root": {
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "200px",
                    padding: "8px 16px",
                  },
                  "& .MuiTableHead-root": {
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    "& .MuiTableCell-root": {
                      fontWeight: "bold",
                      backgroundColor: "#f5f5f5",
                      borderBottom: "2px solid #e0e0e0",
                    },
                  },
                  "& .MuiTableBody-root": {
                    "& tr:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                    },
                  },
                },
              }}
            >
              <MaterialReactTable
                columns={columns}
                data={transformedData}
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
      </Box>
    </LocalizationProvider>
  );
};

export default FrameInventoryReport;
