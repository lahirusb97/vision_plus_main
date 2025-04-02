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
import { useNavigate } from "react-router";
import FactoryInvoiceSearch from "../../hooks/FactoryInvoiceSearch";
import ProgressStagesColors from "../../components/ProgressStagesColors";

const CheckInIndex = () => {
  const navigate = useNavigate();
  const {
    invoiceList,
    invoiceLimit,
    invoiceSearch,
    changePageSize,
    invoicePageNavigation,
    invoiceTotalCount,
  } = useGetFactoryInvoices();

  return (
    <div style={{ padding: 20, maxWidth: "1200px", minWidth: "900px" }}>
      <FactoryInvoiceSearch invoiceSearch={invoiceSearch} />
      {/* Status Indicators */}
      <ProgressStagesColors />
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>
                <b>Patient Name</b>
              </TableCell>
              <TableCell>
                <b>Date</b>
              </TableCell>
              <TableCell>
                <b>Invoice</b>
              </TableCell>
              <TableCell>
                <b>Progress</b>
              </TableCell>
              {/* <TableCell>
                <b>Notes</b>
              </TableCell> */}
              <TableCell>
                <b>Arrival Status</b>
              </TableCell>
              <TableCell>
                <b>Details</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoiceList.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.customer_details.name}</TableCell>
                <TableCell>
                  {dateAndTimeFormat(row.order_details.order_date)}
                </TableCell>
                <TableCell>{row.invoice_number}</TableCell>
                <TableCell>{progressStatus(row.progress_status)}</TableCell>
                {/* <TableCell>{row.notes}</TableCell> */}
                <TableCell>
                  {row.lens_arrival_status == null
                    ? "_"
                    : row.lens_arrival_status == "received"
                    ? "Received"
                    : "Not Received"}
                </TableCell>

                <TableCell sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    onClick={() =>
                      navigate(
                        `/transaction/factory_order/invoice/${row.invoice_number}`
                      )
                    }
                    color="inherit"
                  >
                    <AssignmentIcon />
                  </IconButton>
                  <Box
                    sx={{ display: "flex", gap: 1, flexDirection: "column" }}
                  >
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
};

export default CheckInIndex;
