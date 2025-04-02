import {
  Box,
  Button,
  Checkbox,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import useGetFactoryInvoices from "../../hooks/useGetFactoryInvoices";
import { dateAndTimeFormat } from "../../utils/dateAndTimeFormat";
import { progressStatus } from "../../utils/progressState";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CircleIcon from "@mui/icons-material/Circle";
import CustomerPagination from "../../components/CustomPagination";
import { useNavigate } from "react-router";
import ProgressStagesColors from "../../components/ProgressStagesColors";
import FactoryInvoiceSearch from "../../hooks/FactoryInvoiceSearch";

export default function JobProgress() {
  const navigate = useNavigate();
  const {
    invoiceList,
    invoiceLimit,
    invoiceSearch,
    changePageSize,
    invoicePageNavigation,
    invoiceTotalCount,
  } = useGetFactoryInvoices();

  const [orderProgress, setOrderProgress] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setOrderProgress(event.target.value as string);
    invoiceSearch("progress_status", event.target.value);
  };

  return (
    <div>
      <Paper
        sx={{
          display: "flex",
          m: 1,
          p: 1,
          gap: 2,
          alignItems: "center",
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
            onChange={() => {}}
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
        <Button variant="contained">Update Progress</Button>
      </Paper>

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
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>
                <b>Select</b>
              </TableCell>
              <TableCell>
                <b>Invoice</b>
              </TableCell>
              <TableCell>
                <b>Date</b>
              </TableCell>

              <TableCell>
                <b>Progress</b>
              </TableCell>
              {/* <TableCell>
                <b>Notes</b>
              </TableCell> */}

              <TableCell>
                <b>Details</b>
              </TableCell>
              <TableCell>
                <b>Status</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoiceList.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Checkbox sx={{ p: 0 }} size="small" />
                </TableCell>
                <TableCell>{row.invoice_number}</TableCell>

                <TableCell>
                  {dateAndTimeFormat(row.order_details.order_date)}
                </TableCell>
                <TableCell>{progressStatus(row.progress_status)}</TableCell>
                {/* <TableCell>{row.notes}</TableCell> */}

                <TableCell>
                  <IconButton
                    size="small"
                    sx={{ p: 0 }}
                    onClick={() =>
                      navigate(
                        `/transaction/factory_order/invoice/${row.invoice_number}`
                      )
                    }
                    color="inherit"
                  >
                    <AssignmentIcon fontSize="small" />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", flexDirection: "rows" }}>
                    {row.order_details.on_hold ? (
                      <CircleIcon sx={{ color: "red", fontSize: "1rem" }} />
                    ) : (
                      <CircleIcon sx={{ color: "green", fontSize: "1rem" }} />
                    )}
                    {!row.order_details.fitting_on_collection && (
                      <CircleIcon sx={{ color: "blue", fontSize: "1rem" }} />
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomerPagination
        totalCount={invoiceTotalCount}
        handlePageNavigation={invoicePageNavigation}
        changePageSize={changePageSize}
        page_size={invoiceLimit}
      />
    </div>
  );
}
