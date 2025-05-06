import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import CustomerPagination from "../../components/CustomPagination";
import ProgressStagesColors from "../../components/ProgressStagesColors";
import FactoryInvoiceSearch from "../../hooks/FactoryInvoiceSearch";
import useGetCheckinInvoiceList from "../../hooks/useGetCheckinInvoiceList";
import { ProgressStatus } from "../../model/StaticTypeModels";
import CheckBoxTable from "../../components/inputui/CheckBoxTable";
interface SelectedInvoices {
  id: number;
  invoice_number: string;
}
export default function JobProgress() {
  const {
    invoiceList,
    invoiceLimit,
    invoiceListSearch,
    invoiceListChangePageSize,
    invoiceListPageNavigation,
    invoiceListLoading,
    invoiceListTotalCount,
    invoiceListRefres,
  } = useGetCheckinInvoiceList();

  const [orderProgress, setOrderProgress] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setOrderProgress(event.target.value as string);
    invoiceListSearch({
      progress_status: event.target.value as ProgressStatus,
      search: null,
      invoice_number: null,
      mobile: null,
      nic: null,
      page_size: 10,
      page: 1,
    });
  };
  const [selectedIds, setSelectedIds] = useState<SelectedInvoices[]>([]);

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ mt: 2 }} elevation={3} component={Paper}>
        <Box
          sx={{
            display: "flex",
            m: 1,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <FormControl size="small" sx={{ minWidth: 250 }}>
            <InputLabel id="demo-simple-select-label">
              {" "}
              Filter By Order Progress
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={orderProgress}
              label=" Filter By Order Progress"
              onChange={handleChange}
            >
              <MenuItem value={"received_from_customer"}>
                Received From Customer
              </MenuItem>
              <MenuItem value={"issue_to_factory"}>Issue to Factory</MenuItem>
              <MenuItem value={"received_from_factory"}>
                Received from Factory
              </MenuItem>
              <MenuItem value={"issue_to_customer"}>Issue to Customer</MenuItem>
            </Select>
          </FormControl>
          <FactoryInvoiceSearch invoiceListSearch={invoiceListSearch} />
          <ProgressStagesColors />
        </Box>
        <CheckBoxTable
          invoiceListRefres={invoiceListRefres}
          invoiceList={invoiceList}
          loading={invoiceListLoading}
        />
        <CustomerPagination
          totalCount={invoiceListTotalCount}
          handlePageNavigation={invoiceListPageNavigation}
          changePageSize={invoiceListChangePageSize}
          page_size={invoiceLimit}
        />
      </Box>
      {/* <Box sx={{ minHeight: "10vh" }}>
        <BulkUpdateProgress
          selectedIds={selectedIds.map((id) => id.id)}
          onUpdateSuccess={invoiceListRefres} // Refresh data after update
          onClearSelection={() => setSelectedIds([])} // Clear selection
          invoiceList={selectedIds}
        />
      </Box> */}
    </Box>
  );
}
