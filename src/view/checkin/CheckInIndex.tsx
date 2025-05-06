import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CircleIcon from "@mui/icons-material/Circle";
import useGetFactoryInvoices from "../../hooks/useGetFactoryInvoices";

import { dateAndTimeFormat } from "../../utils/dateAndTimeFormat";
import { progressStatus } from "../../utils/progressState";
import CustomerPagination from "../../components/CustomPagination";
import FactoryInvoiceSearch from "../../hooks/FactoryInvoiceSearch";
import ProgressStagesColors from "../../components/ProgressStagesColors";
import { customerPaymentTotal } from "../../utils/customerPaymentTotal";
import { numberWithCommas } from "../../utils/numberWithCommas";

const CheckInIndex = () => {
  const {
    invoiceList,
    invoiceLimit,
    invoiceSearch,
    changePageSize,
    invoicePageNavigation,
    invoiceTotalCount,
  } = useGetFactoryInvoices();
  console.log(invoiceList);
  return (
    <div style={{ padding: 20, maxWidth: "1200px", minWidth: "900px" }}>
      <FactoryInvoiceSearch invoiceSearch={invoiceSearch} />
      {/* Status Indicators */}
      <ProgressStagesColors />
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>Patient Name</TableCell>
              <TableCell>Date </TableCell>
              <TableCell>Invoice</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell>Progress</TableCell>
              {/* <TableCell>
                <b>Notes</b>
              </TableCell> */}
              <TableCell>Arrival Status</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoiceList.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.customer}</TableCell>
                <TableCell>{dateAndTimeFormat(row.invoice_date)}</TableCell>
                <TableCell>{row.invoice_number}</TableCell>
                <TableCell>
                  Rs.{numberWithCommas(customerPaymentTotal(row.payments))}
                </TableCell>
                <TableCell>
                  Rs.
                  {numberWithCommas(
                    parseInt(row.total_price) -
                      customerPaymentTotal(row.payments)
                  )}
                </TableCell>
                <TableCell>{progressStatus(row.progress_status)}</TableCell>
                {/* <TableCell>{row.notes}</TableCell> */}
                <TableCell>
                  {row.lens_arrival_status == null
                    ? "_"
                    : row.lens_arrival_status == "received"
                    ? "Received"
                    : "Not Received"}
                </TableCell>

                <TableCell>
                  <Box sx={{ display: "flex", flexDirection: "rows" }}>
                    {row.on_hold ? (
                      <CircleIcon sx={{ color: "red", fontSize: "1rem" }} />
                    ) : (
                      <CircleIcon sx={{ color: "green", fontSize: "1rem" }} />
                    )}
                    {row.fitting_on_collection && (
                      <CircleIcon sx={{ color: "blue", fontSize: "1rem" }} />
                    )}
                  </Box>
                </TableCell>

                <TableCell>
                  <a
                    href={`/transaction/invoice/view/${row.invoice_number}/?invoice_number=${row.invoice_number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }} // Optional: keep icon color
                  >
                    <IconButton size="small" sx={{ p: 0 }} color="inherit">
                      <AssignmentIcon fontSize="small" />
                    </IconButton>
                  </a>
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
};

export default CheckInIndex;
