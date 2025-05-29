import { useState } from "react";
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  IconButton,
  Button,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { grey } from "@mui/material/colors";
import CircleIcon from "@mui/icons-material/Circle";
import { progressStatus } from "../../utils/progressState";
import { customerPaymentTotal } from "../../utils/customerPaymentTotal";
import { numberWithCommas } from "../../utils/numberWithCommas";
import { Close } from "@mui/icons-material";
import { formatDateTimeByType } from "../../utils/formatDateTimeByType";
import { toast } from "react-hot-toast";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import { ExternalLenseOrderInvoiceModel } from "../../model/ExternalLenseOrderInvoiceModel";
import { useAxiosPost } from "../../hooks/useAxiosPost";

interface CheckBoxTableProps {
  invoiceList: ExternalLenseOrderInvoiceModel[];
  loading: boolean;
  invoiceListRefres: () => void;
}
interface SelectedInvoices {
  order_id: number;
  invoice_number: string;
}
export default function ExternalOrderCheckBoxTable({
  invoiceList,
  loading,
  invoiceListRefres,
}: CheckBoxTableProps) {
  const { postHandler, postHandlerError, postHandlerloading } = useAxiosPost();
  const [selectedInvoice, setSelectedInvoice] = useState<SelectedInvoices[]>(
    []
  );
  const [selectedUrgent, setSelectedUrgent] = useState<number[]>([]);

  const handleBulkUpdate = async () => {
    if (selectedInvoice.length === 0) {
      toast.error("Please select at least one invoice");
      return;
    }

    try {
      await postHandler("factory-invoices/bulk-update-whatsapp-sent/", {
        order_ids: selectedInvoice.map((item) => item.order_id),
        urgent_order_ids: selectedUrgent,
        whatsapp_sent: "sent",
      });

      toast.success(`Updated ${selectedInvoice.length} item(s) successfully`);
      setSelectedInvoice([]);
      setSelectedUrgent([]);
      invoiceListRefres();
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <TableContainer sx={{ flexGrow: 1 }}>
        <Table sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell align="center">Select</TableCell>
              <TableCell align="center">Urgent</TableCell>

              <TableCell align="center">Patient Name</TableCell>
              <TableCell align="center">Date </TableCell>
              <TableCell align="center">Invoice</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="center">Balance</TableCell>
              <TableCell align="center">Progress</TableCell>
              <TableCell align="center">Whatapp MSG</TableCell>
              {/* <TableCell>
                <b>Notes</b>
              </TableCell> */}
              {/* <TableCell>Arrival Status</TableCell> */}
              <TableCell>Status</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}
            {!loading && invoiceList.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} rowSpan={6} align="center">
                  No data found
                </TableCell>
              </TableRow>
            )}
            {invoiceList.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Checkbox
                    size="small"
                    sx={{ p: 0 }}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedInvoice((prev) => [
                          ...prev,
                          {
                            order_id: row.order_id,
                            invoice_number: row.invoice_number,
                          },
                        ]);
                      } else {
                        setSelectedInvoice((prev) =>
                          prev.filter((item) => item.order_id !== row.order_id)
                        );
                      }
                    }}
                    checked={selectedInvoice.some(
                      (item) => item.order_id === row.order_id
                    )}
                  />
                </TableCell>
                <TableCell align="center">
                  <Checkbox
                    size="small"
                    sx={{ p: 0 }}
                    checked={selectedUrgent.includes(row.order_id)}
                    // Only allow ticking if the order is selected!
                    disabled={
                      !selectedInvoice.some(
                        (item) => item.order_id === row.order_id
                      )
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUrgent((prev) => [...prev, row.order_id]);
                      } else {
                        setSelectedUrgent((prev) =>
                          prev.filter((id) => id !== row.order_id)
                        );
                      }
                    }}
                    // Visually indicate if already urgent (fetched from backend)
                    indeterminate={
                      !!row.urgent && !selectedUrgent.includes(row.order_id)
                    }
                  />
                </TableCell>

                <TableCell>{row.customer_name}</TableCell>
                <TableCell>
                  {formatDateTimeByType(row.invoice_date, "date")}
                </TableCell>
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
                {/* <TableCell>
                {row.lens_arrival_status == null
                  ? "_"
                  : row.lens_arrival_status == "received"
                  ? "Received"
                  : "Not Received"}
              </TableCell> */}
                <TableCell align="center">
                  {row.whatsapp_sent === "sent" ? "Sent" : "Not Sent"}
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: "flex", flexDirection: "rows" }}>
                    {row.on_hold ? (
                      <CircleIcon sx={{ color: "red", fontSize: "1rem" }} />
                    ) : (
                      <CircleIcon sx={{ color: "green", fontSize: "1rem" }} />
                    )}
                    {row.fitting_on_collection && (
                      <CircleIcon sx={{ color: "blue", fontSize: "1rem" }} />
                    )}
                    {row.urgent && (
                      <CircleIcon
                        sx={{
                          color: "black",
                          fontSize: "1rem",
                          verticalAlign: "middle",
                          ml: 1, // margin-left for spacing
                        }}
                        titleAccess="Urgent Order"
                      />
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
          </TableBody>
        </Table>
      </TableContainer>
      <Paper
        sx={{
          minWidth: 260,
          flexDirection: "column",
          display: "flex",
          gap: 1,
          marginLeft: 1,
          p: 1,
        }}
      >
        <Typography
          textAlign={"center"}
          fontWeight={"bold"}
          variant="subtitle1"
        >
          WhatsApp Message Sent
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: ".2rem",
            flexWrap: "wrap",
            maxWidth: "300px",
          }}
        >
          {selectedInvoice.map((item) => (
            <Box
              key={item.order_id}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: ".1rem",
                bgcolor: grey[200],
                px: 1,
                py: 0.5,
                borderRadius: 1,
                minWidth: 0, // Allow grid to shrink items
                wordBreak: "break-all", // Ensure long numbers wrap if needed
              }}
            >
              <Typography
                sx={{ fontSize: ".8rem" }}
                variant="body2"
                key={item.order_id}
              >
                {item.invoice_number}
              </Typography>
              <IconButton
                onClick={() => {
                  setSelectedInvoice((prev) =>
                    prev.filter(
                      (prevItem) => prevItem.order_id !== item.order_id
                    )
                  );
                }}
                size="small"
                sx={{ p: 0 }}
                color="inherit"
              >
                <Close sx={{ fontSize: "1rem" }} color="error" />
              </IconButton>
            </Box>
          ))}
        </Box>

        <Button
          onClick={handleBulkUpdate}
          disabled={postHandlerloading || selectedInvoice.length === 0}
          fullWidth
          variant="contained"
          color={postHandlerError ? "error" : "primary"}
        >
          {postHandlerloading ? "Updating..." : "Mark as MSG sent"}
        </Button>
        <Button
          onClick={() => setSelectedInvoice([])}
          fullWidth
          variant="outlined"
          color="error"
          disabled={selectedInvoice.length === 0}
        >
          Clear {selectedInvoice.length} sections
        </Button>
      </Paper>
    </Box>
  );
}
