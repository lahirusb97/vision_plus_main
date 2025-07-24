import React, { useMemo } from "react";
import useGetPaymentMethodReport, {
  PaymentMethodTransaction,
} from "../../../hooks/report/useGetPaymentMethodReport";
import { DateRangeInputModel } from "../../../model/DateRangeInputModel";
import { useOutletContext } from "react-router";
import AutocompleteInputField from "../../../components/inputui/DropdownInput";
import { LENS_AND_FRAME_STORE_ID } from "../../../data/staticVariables";
import useGetBranches from "../../../hooks/useGetBranches";
import { Button, CircularProgress } from "@mui/material";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
export default function PaymentMethodTable() {
  const { end_date, start_date } = useOutletContext<DateRangeInputModel>();
  const { branches, branchesLoading } = useGetBranches();
  const [branchId, setBranchId] = React.useState<number | null>(null);

  const {
    paymentMethodReportTransactions,
    paymentMethodReportLoading,
    setPaymentMethodReportParamsData,
  } = useGetPaymentMethodReport();
  const handleSearch = () => {
    setPaymentMethodReportParamsData({
      start_date: start_date?.format("YYYY-MM-DD") || "",
      end_date: end_date?.format("YYYY-MM-DD") || "",
    });
  };
  console.log(paymentMethodReportTransactions);

  const columns = useMemo<MRT_ColumnDef<PaymentMethodTransaction>[]>(
    () => [
      { header: "Date", accessorKey: "date" },
      { header: "Online Transfer", accessorKey: "online_transfer" },
      {
        header: "Cash",
        accessorKey: "cash",
      },
      {
        header: "Card",
        accessorKey: "card",
      },
      { header: "Other Income", accessorKey: "other_income" },
      { header: "Total", accessorKey: "total" },
    ],
    []
  );
  return (
    <div>
      <div style={{ display: "flex", gap: 10 }}>
        <AutocompleteInputField
          options={[
            ...(branches
              ?.filter(
                (branch) => branch.id !== parseInt(LENS_AND_FRAME_STORE_ID)
              )
              .map((branch) => ({
                id: branch.id,
                name: branch.branch_name,
              })) || []),
          ]}
          loading={branchesLoading}
          labelName="Branch"
          defaultId={branchId ?? undefined}
          onChange={setBranchId}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          disabled={paymentMethodReportLoading}
          sx={{ minWidth: 120, height: 40 }}
        >
          {paymentMethodReportLoading ? (
            <CircularProgress size={22} color="inherit" />
          ) : (
            "Search"
          )}
        </Button>
      </div>
      <MaterialReactTable
        columns={columns}
        data={paymentMethodReportTransactions || []}
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
    </div>
  );
}
