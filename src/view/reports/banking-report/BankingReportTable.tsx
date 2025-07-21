import React from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { DepositsReportData } from "../../../hooks/report/useGetBankingReports";
import { Typography } from "@mui/material";
import { numberWithCommas } from "../../../utils/numberWithCommas";

interface Props {
  data: DepositsReportData[];
}

export default function BankingReportTable({ data }: Props) {
  const columns = React.useMemo<MRT_ColumnDef<DepositsReportData>[]>(
    () => [
      { header: "Bank Name", accessorKey: "bank_name" },
      { header: "Account Number", accessorKey: "account_number" },
      { header: "Date", accessorKey: "date" },
      {
        header: "Amount",
        accessorKey: "amount",
        Cell: ({ cell }) => {
          return (
            <Typography variant="body2" color="text.secondary">
              {numberWithCommas(cell.getValue() as number)}
            </Typography>
          );
        },
      },
      { header: "Note", accessorKey: "note" },
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
