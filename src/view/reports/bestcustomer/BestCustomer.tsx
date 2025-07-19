import React, { useMemo } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ExpandMore, ExpandLess, Search } from "@mui/icons-material";
import dayjs from "dayjs";
import useGetBestCUstomerReports from "../../../hooks/report/useGetBestCUstomerReports";
import { numberWithCommas } from "../../../utils/numberWithCommas";
import {
  BestCustomerData,
  CustomerInvoiceData,
} from "../../../hooks/report/useGetBestCUstomerReports";

// Define the summary type locally since it's not exported from the hook
interface BestCustomerSummary {
  date_range: {
    start: string;
    end: string;
  };
  criteria: {
    min_budget: number;
  };
  statistics: {
    total_customers: number;
    qualifying_customers: number;
    total_factory_orders: number;
    total_revenue: number;
    qualifying_revenue: number;
    percentage_qualifying: number;
  };
}

// Summary Card Component
const BestCustomerSummaryCard: React.FC<{ summary: BestCustomerSummary }> = ({
  summary,
}) => {
  const summaryItems = [
    {
      label: "Total Customers",
      value: summary.statistics?.total_customers || 0,
    },
    {
      label: "Qualifying Customers",
      value: summary.statistics?.qualifying_customers || 0,
    },
    {
      label: "Total Orders",
      value: summary.statistics?.total_factory_orders || 0,
    },
    {
      label: "Total Revenue",
      value: numberWithCommas(summary.statistics?.total_revenue || 0),
    },
    {
      label: "Qualifying Revenue",
      value: numberWithCommas(summary.statistics?.qualifying_revenue || 0),
    },
    {
      label: "Qualifying %",
      value: `${summary.statistics?.percentage_qualifying || 0}%`,
    },
  ];

  return (
    <Card sx={{ mb: 2, background: "#f5f5f5" }}>
      <CardContent sx={{ py: 1.5, "&:last-child": { pb: 1.5 } }}>
        <Grid container spacing={1}>
          {summaryItems.map((item, index) => (
            <Grid item xs={6} sm={4} md={2} key={index}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 0.25 }}
              >
                {item.label}
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                {item.value}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

// Customer Invoices Table Component
const CustomerInvoicesTable: React.FC<{ invoices: CustomerInvoiceData[] }> = ({
  invoices,
}) => {
  const invoiceColumns = useMemo<MRT_ColumnDef<CustomerInvoiceData>[]>(
    () => [
      {
        header: "Order ID",
        accessorKey: "order_id",
        size: 100,
      },
      {
        header: "Invoice Number",
        accessorKey: "invoice_number",
        size: 150,
      },
      {
        header: "Invoice Type",
        accessorKey: "invoice_type",
        size: 120,
        Cell: ({ cell }) => (
          <Chip
            label={cell.getValue<string>()}
            size="small"
            color={
              cell.getValue<string>() === "factory" ? "primary" : "default"
            }
          />
        ),
      },
      {
        header: "Order Date",
        accessorKey: "order_date",
        size: 120,
      },
      {
        header: "Total Price",
        accessorKey: "total_price",
        size: 120,
        Cell: ({ cell }) => numberWithCommas(cell.getValue<number>()),
      },
      {
        header: "Sub Total",
        accessorKey: "sub_total",
        size: 120,
        Cell: ({ cell }) => numberWithCommas(cell.getValue<number>()),
      },
      {
        header: "Discount",
        accessorKey: "discount",
        size: 100,
        Cell: ({ cell }) => numberWithCommas(cell.getValue<number>()),
      },
      {
        header: "Status",
        accessorKey: "status",
        size: 100,
        Cell: ({ cell }) => (
          <Chip
            label={cell.getValue<string>()}
            size="small"
            color={
              cell.getValue<string>() === "completed" ? "success" : "warning"
            }
          />
        ),
      },
    ],
    []
  );

  return (
    <MaterialReactTable
      columns={invoiceColumns}
      data={invoices}
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
  );
};

// Main Component
export default function BestCustomer() {
  const [startDate, setStartDate] = React.useState<dayjs.Dayjs | null>(
    dayjs().subtract(30, "day")
  );
  const [endDate, setEndDate] = React.useState<dayjs.Dayjs | null>(dayjs());
  const [minBudget, setMinBudget] = React.useState<string>("0");
  const [expandedRows, setExpandedRows] = React.useState<Set<number>>(
    new Set()
  );

  const {
    bestCustomerReportData,
    bestCustomerReportSummary,
    bestCustomerReportLoading,
    bestCustomerReportError,
    setBestCustomerReportParamsData,
  } = useGetBestCUstomerReports();

  const handleSearch = () => {
    setBestCustomerReportParamsData({
      start_date: startDate?.format("YYYY-MM-DD") || null,
      end_date: endDate?.format("YYYY-MM-DD") || null,
      min_budget: Number(minBudget),
      include_invoices: true,
      include_summary: true,
    });
  };

  const handleRowExpand = (customerId: number) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(customerId)) {
      newExpandedRows.delete(customerId);
    } else {
      newExpandedRows.add(customerId);
    }
    setExpandedRows(newExpandedRows);
  };

  const columns = useMemo<MRT_ColumnDef<BestCustomerData>[]>(
    () => [
      {
        header: "Customer ID",
        accessorKey: "customer_id",
        size: 100,
      },
      {
        header: "Customer Name",
        accessorKey: "customer_name",
        size: 200,
      },
      {
        header: "NIC",
        accessorKey: "nic",
        size: 120,
      },
      {
        header: "Address",
        accessorKey: "address",
        size: 200,
      },
      {
        header: "Mobile Number",
        accessorKey: "mobile_number",
        size: 140,
      },
      {
        header: "Total Order Amount",
        accessorKey: "total_factory_order_amount",
        size: 150,
        Cell: ({ cell }) => numberWithCommas(cell.getValue<number>()),
      },
      {
        header: "Number of Orders",
        accessorKey: "number_of_orders",
        size: 130,
      },
      {
        header: "Invoice Count",
        accessorKey: "invoice_count",
        size: 120,
      },
      {
        header: "Actions",
        size: 100,
        Cell: ({ row }) => (
          <IconButton
            size="small"
            onClick={() => handleRowExpand(row.original.customer_id)}
          >
            {expandedRows.has(row.original.customer_id) ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )}
          </IconButton>
        ),
      },
    ],
    [expandedRows]
  );

  return (
    <Box sx={{ padding: 2, maxWidth: "1400px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 3,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography
          sx={{ marginBottom: 1, fontWeight: "bold" }}
          variant="h4"
          gutterBottom
        >
          Best Customer Report
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="From Date"
              format="YYYY-MM-DD"
              value={startDate}
              onChange={(date) => setStartDate(date)}
            />
            <DatePicker
              label="To Date"
              format="YYYY-MM-DD"
              value={endDate}
              onChange={(date) => setEndDate(date)}
            />
          </LocalizationProvider>
          <TextField
            label="Min Budget"
            type="number"
            value={minBudget}
            onChange={(e) => setMinBudget(e.target.value)}
            size="small"
            sx={{ minWidth: 120 }}
            InputProps={{
              inputProps: { min: 0 },
            }}
          />
          <Button
            variant="contained"
            startIcon={<Search />}
            onClick={handleSearch}
            disabled={bestCustomerReportLoading}
          >
            Search
          </Button>
        </Box>
      </Box>

      {bestCustomerReportLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : bestCustomerReportError ? (
        <Alert severity="error">Error loading best customer data</Alert>
      ) : (
        <>
          <BestCustomerSummaryCard summary={bestCustomerReportSummary} />

          <MaterialReactTable
            columns={columns}
            data={bestCustomerReportData || []}
            enableColumnFilters={false}
            enableSorting
            enablePagination
            muiTableProps={{
              sx: {
                borderRadius: 2,
                overflow: "hidden",
              },
            }}
            renderDetailPanel={({ row }) => (
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Invoices for {row.original.customer_name}
                </Typography>
                <CustomerInvoicesTable invoices={row.original.invoices} />
              </Box>
            )}
            muiDetailPanelProps={{
              sx: (theme) => ({
                backgroundColor: theme.palette.background.default,
              }),
            }}
          />
        </>
      )}
    </Box>
  );
}
