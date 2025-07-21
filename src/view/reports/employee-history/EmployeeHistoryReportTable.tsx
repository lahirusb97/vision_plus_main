import React, { useMemo } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { EmpHistoryData } from "../../../hooks/report/useGetEmpHistoryReports";

export default function EmployeeHistoryReportTable({
  data,
}: {
  data: EmpHistoryData[];
}) {
  // Define columns
  const columns = useMemo<MRT_ColumnDef<EmpHistoryData>[]>(
    () => [
      { header: "Username", accessorKey: "username" },
      { header: "Full Name", accessorKey: "full_name" },
      {
        header: "Branded Frames Sold",
        accessorKey: "branded_frames_sold_count",
      },
      {
        header: "Branded Lenses Sold",
        accessorKey: "branded_lenses_sold_count",
      },
      { header: "Factory Order Count", accessorKey: "factory_order_count" },
      { header: "Normal Order Count", accessorKey: "normal_order_count" },
      { header: "Customer Feedback", accessorKey: "customer_feedback_count" },
      { header: "Total Count", accessorKey: "total_count" },
      { header: "Total Sales Amount", accessorKey: "total_sales_amount" },
      { header: "Total Orders", accessorKey: "total_orders" },
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
      muiTableProps={{
        sx: {
          borderRadius: 2,
          overflow: "hidden",
        },
      }}
    />
  );
}
