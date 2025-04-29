import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TableContainer,
} from "@mui/material";
import { useState } from "react";
import useGetFactoryInvoices from "../../hooks/useGetFactoryInvoices";

import CustomerPagination from "../../components/CustomPagination";
import ProgressStagesColors from "../../components/ProgressStagesColors";
import FactoryInvoiceSearch from "../../hooks/FactoryInvoiceSearch";
import { BulkUpdateProgress } from "../../components/BulkUpdateProgress";
import SelectableTable from "../../components/inputui/SelectableTable";

export default function JobProgress() {
  const {
    invoiceList,
    invoiceLimit,
    invoiceSearch,
    changePageSize,
    invoicePageNavigation,
    invoiceLoading,
    invoiceTotalCount,
    invoiceListRefres,
  } = useGetFactoryInvoices();

  const [orderProgress, setOrderProgress] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setOrderProgress(event.target.value as string);
    invoiceSearch("progress_status", event.target.value);
  };
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  return (
    <Box sx={{ display: "flex" }}>
      <TableContainer sx={{ mt: 2 }} elevation={3} component={Paper}>
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
          <FactoryInvoiceSearch invoiceSearch={invoiceSearch} />
          <ProgressStagesColors />
        </Box>
        <SelectableTable
          data={invoiceList}
          loading={invoiceLoading}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
        />
        <CustomerPagination
          totalCount={invoiceTotalCount}
          handlePageNavigation={invoicePageNavigation}
          changePageSize={changePageSize}
          page_size={invoiceLimit}
        />
      </TableContainer>

      <Box sx={{ minHeight: "10vh" }}>
        <BulkUpdateProgress
          selectedIds={selectedIds}
          onUpdateSuccess={invoiceListRefres} // Refresh data after update
          onClearSelection={() => setSelectedIds([])} // Clear selection
        />
      </Box>
    </Box>
  );
}
