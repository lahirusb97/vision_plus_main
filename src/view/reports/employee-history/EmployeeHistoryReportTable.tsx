import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  MRT_ExpandedState,
} from "material-react-table";
import { EmpHistoryData } from "../../../hooks/report/useGetEmpHistoryReports";
import { Box, Typography } from "@mui/material";
import { numberWithCommas } from "../../../utils/numberWithCommas";
import UserFeedbackSubTable from "./UserFeedbackSubTable";

export default function EmployeeHistoryReportTable({
  data,
  startDate,
  endDate,
}: {
  data: EmpHistoryData[];
  startDate: string;
  endDate: string;
}) {
  // Define columns
  const columns = useMemo<MRT_ColumnDef<EmpHistoryData>[]>(
    () => [
      {
        header: "Username",
        accessorKey: "username",
        size: 100,
      },
      {
        header: "Full Name",
        accessorKey: "full_name",
        size: 150,
      },
      {
        header: "Branded Frames",
        accessorKey: "branded_frames_sold_count",
        size: 60,
        align: "center",
      },
      {
        header: "Branded Lenses",
        accessorKey: "branded_lenses_sold_count",
        size: 60,
        align: "center",
      },
      {
        header: "Factory Orders",
        accessorKey: "factory_order_count",
        size: 60,
        align: "center",
      },
      // {
      //   header: "Normal Orders",
      //   accessorKey: "normal_order_count",
      //   size: 60,
      //   align: "center",
      // },
      {
        header: "Feedback (Total)",
        accessorKey: "customer_feedback_count",
        size: 80,
        Cell: ({ cell }) => (
          <Typography variant="body2" fontWeight="bold" align="center">
            {cell.getValue<number>()}
          </Typography>
        ),
      },
      {
        header: "Ratings",
        columns: [
          {
            header: "Poor",
            accessorKey: "feedback_ratings.rating_1",
            size: 40,
            Cell: ({ cell }) => (
              <Typography variant="body2" color="error" align="center">
                {cell.getValue<number>()}
              </Typography>
            ),
          },
          {
            header: "Average",
            accessorKey: "feedback_ratings.rating_2",
            size: 40,
            Cell: ({ cell }) => (
              <Typography variant="body2" color="warning.main" align="center">
                {cell.getValue<number>()}
              </Typography>
            ),
          },
          {
            header: "Good",
            accessorKey: "feedback_ratings.rating_3",
            size: 40,
            Cell: ({ cell }) => (
              <Typography variant="body2" color="info.main" align="center">
                {cell.getValue<number>()}
              </Typography>
            ),
          },
          {
            header: "Excellent",
            accessorKey: "feedback_ratings.rating_4",
            size: 40,
            Cell: ({ cell }) => (
              <Typography variant="body2" color="success.main" align="center">
                {cell.getValue<number>()}
              </Typography>
            ),
          },
        ],
      },
      {
        header: "Total Sales",
        accessorKey: "total_sales_amount",
        size: 100,
        Cell: ({ cell }) => (
          <Typography variant="body2" fontWeight="medium">
            {numberWithCommas(cell.getValue<number>())}
          </Typography>
        ),
      },
      {
        header: "Total Orders",
        accessorKey: "total_orders",
        size: 60,
        align: "center",
      },
    ],
    []
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data || []}
      enableColumnFilters={false}
      enableSorting
      enablePagination
      displayColumnDefOptions={{
        "mrt-row-expand": {
          size: 40,
        },
      }}
      muiTableProps={{
        sx: {
          borderRadius: 2,
          overflow: "hidden",
          "& .MuiTableHead-root": {
            "& .MuiTableRow-head": {
              "& > th": {
                borderRight: "1px solid rgba(224, 224, 224, 1)",
                "&:last-child": {
                  borderRight: "none",
                },
              },
            },
          },
        },
      }}
      renderDetailPanel={({ row }) => (
        <div>
          <Box>
            <Typography variant="subtitle1">
              {row.original.full_name}
            </Typography>
            <UserFeedbackSubTable
              endDate={endDate}
              startDate={startDate}
              userId={row.original.employee_id}
            />
          </Box>
        </div>
      )}
      initialState={{
        columnPinning: {
          left: ["username", "full_name"],
          right: ["total_sales_amount", "total_orders"],
        },
      }}
    />
  );
}
