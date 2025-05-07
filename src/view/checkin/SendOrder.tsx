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

import CustomerPagination from "../../components/CustomPagination";
import ProgressStagesColors from "../../components/ProgressStagesColors";
import FactoryInvoiceSearch from "../../hooks/FactoryInvoiceSearch";
import useGetCheckinInvoiceList from "../../hooks/useGetCheckinInvoiceList";
import { ProgressStatus } from "../../model/StaticTypeModels";

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

  // Persist selections in localStorage/sessionStorage

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
          <FactoryInvoiceSearch invoiceListSearch={invoiceListSearch} />
          <ProgressStagesColors />
        </Box>
        
        <CustomerPagination
          totalCount={invoiceListTotalCount}
          handlePageNavigation={invoiceListPageNavigation}
          changePageSize={invoiceListChangePageSize}
          page_size={invoiceLimit}
        />
      </TableContainer>

      
    </Box>
  );
}
