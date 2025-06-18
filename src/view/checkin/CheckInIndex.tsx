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
  CircularProgress,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CircleIcon from "@mui/icons-material/Circle";
import { dateAndTimeFormat } from "../../utils/dateAndTimeFormat";
import { progressStatus } from "../../utils/progressState";
import CustomerPagination from "../../components/CustomPagination";
import FactoryInvoiceSearch from "../../hooks/FactoryInvoiceSearch";
import ProgressStagesColors from "../../components/ProgressStagesColors";
import { customerPaymentTotal } from "../../utils/customerPaymentTotal";
import { numberWithCommas } from "../../utils/numberWithCommas";
import useGetCheckinInvoiceList from "../../hooks/useGetCheckinInvoiceList";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import { formatDateTimeByType } from "../../utils/formatDateTimeByType";

const CheckInIndex = () => {
  const {
    invoiceList,
    invoiceLimit,
    invoiceListSearch,
    invoiceListChangePageSize,
    invoiceListPageNavigation,
    invoiceListLoading,
    invoiceListTotalCount,
  } = useGetCheckinInvoiceList();
  return (
    <div style={{ padding: 20, maxWidth: "1200px", minWidth: "900px" }}>
      <FactoryInvoiceSearch invoiceListSearch={invoiceListSearch} />
      {/* Status Indicators */}
      <ProgressStagesColors />
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>Patient Name</TableCell>
              <TableCell align="center">Date </TableCell>
              <TableCell align="center">Invoice</TableCell>
              <TableCell>Invoice Total</TableCell>
              <TableCell>Total Payment</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell align="center">Progress</TableCell>
              {/* <TableCell>
                <b>Notes</b>
              </TableCell> */}
              <TableCell>Arrival Status</TableCell>
              <TableCell>Issued By</TableCell>
              <TableCell>Issued Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoiceListLoading && (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}
            {invoiceList.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.customer}</TableCell>
                <TableCell>{dateAndTimeFormat(row.invoice_date)}</TableCell>
                <TableCell>{row.invoice_number}</TableCell>
                <TableCell align="right">
                  {numberWithCommas(row.total_price)}
                </TableCell>
                <TableCell align="right">
                  {numberWithCommas(customerPaymentTotal(row.payments))}
                </TableCell>
                <TableCell align="right">
                  {numberWithCommas(
                    parseInt(row.total_price) -
                      customerPaymentTotal(row.payments)
                  )}
                </TableCell>
                <TableCell>
                  {progressStatus(row.progress_status.progress_status)}
                </TableCell>
                {/* <TableCell>{row.notes}</TableCell> */}
                <TableCell align="center">
                  {row.lens_arrival_status == null
                    ? "_"
                    : row.lens_arrival_status == "received"
                    ? "Received"
                    : "Not Received"}
                </TableCell>
                <TableCell>{row.issued_by_user_name}</TableCell>
                <TableCell>
                  {formatDateTimeByType(row.issued_date, "both")}
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

                <TableCell
                  sx={{
                    display: "flex",
                    gap: 1,
                    justifyContent: "space-between",
                  }}
                  align="center"
                >
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
                  <a
                    href={`/transaction/repayment/${row.invoice_number}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }} // Optional: keep icon color
                  >
                    <IconButton size="small" sx={{ p: 0 }} color="inherit">
                      <PointOfSaleIcon color="error" fontSize="small" />
                    </IconButton>
                  </a>
                </TableCell>
              </TableRow>
            ))}
            {!invoiceListLoading && invoiceList.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} rowSpan={6} align="center">
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomerPagination
        totalCount={invoiceListTotalCount}
        handlePageNavigation={invoiceListPageNavigation}
        changePageSize={invoiceListChangePageSize}
        page_size={invoiceLimit}
      />
    </div>
  );
};

export default CheckInIndex;
