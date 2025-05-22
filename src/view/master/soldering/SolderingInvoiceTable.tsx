import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import useGetSolderingInvoiceList from "../../../hooks/useGetSolderingInvoiceList";
import { channelPaymentsTotal } from "../../../utils/channelPaymentsTotal";
import { numberWithCommas } from "../../../utils/numberWithCommas";
import { progressStatus } from "../../../utils/progressState";
import { formatDateTimeByType } from "../../../utils/formatDateTimeByType";
import { SolderingInvoiceModel } from "../../../model/SolderingInvoiceModel";
import { Print, Update } from "@mui/icons-material";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import axiosClient from "../../../axiosClient";
import toast from "react-hot-toast";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { useMutationDialog } from "../../../context/MutationDialogContext";
import { useState } from "react";
import { useNavigate } from "react-router";
const PROGRESS_STAGES = [
  { value: "received_from_customer", label: "Received from Customer" },
  { value: "issue_to_factory", label: "Issued to Factory" },
  { value: "received_from_factory", label: "Received from Factory" },
  { value: "issue_to_customer", label: "Issued to Customer" },
];
export default function SolderingInvoiceTable() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedInvoice, setSelectedInvoice] =
    useState<SolderingInvoiceModel | null>(null);
  const handleOpenPopover = (
    event: React.MouseEvent<HTMLButtonElement>,
    invoice: SolderingInvoiceModel
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedInvoice(invoice);
  };
  const handleClosePopover = () => {
    setAnchorEl(null);
    setSelectedInvoice(null);
  };
  const { solderingInvoiceList, solderingInvoiceListRefres } =
    useGetSolderingInvoiceList();
  const { openMutationDialog } = useMutationDialog();

  const handleUpdateProgress = (
    stage: string,
    invoice: SolderingInvoiceModel
  ) => {
    openMutationDialog(
      `Update Progress of Invoice Number ${invoice.invoice_number}`,
      "patch",
      async () => {
        try {
          await axiosClient.patch(
            `soldering/orders/${invoice.order_id}/update-progress/`,
            {
              progress_status: stage,
            }
          );
          toast.success("Progress updated successfully");
          solderingInvoiceListRefres();
          handleClosePopover();
        } catch (error) {
          extractErrorMessage(error);
        }
      }
    );
  };

  const handleRepayment = (invoice: SolderingInvoiceModel) => {
    console.log(invoice);
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Update Progress</TableCell>
              <TableCell align="center">Repayment</TableCell>
              <TableCell align="center">View</TableCell>
              <TableCell>Invoice Number</TableCell>
              <TableCell>Invoice Date</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell>Progress Status</TableCell>
              <TableCell>Last Updated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {solderingInvoiceList.map((invoice) => (
              <TableRow key={invoice.invoice_number}>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={(event) => handleOpenPopover(event, invoice)}
                  >
                    <Update sx={{ fontSize: 15 }} />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleRepayment(invoice)}
                  >
                    <PointOfSaleIcon color="error" sx={{ fontSize: 15 }} />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    onClick={() =>
                      navigate(
                        `/master/soldering-invoice/${invoice.invoice_number}`
                      )
                    }
                  >
                    <Print color="info" sx={{ fontSize: 15 }} />
                  </IconButton>
                </TableCell>
                <TableCell>{invoice.invoice_number}</TableCell>
                <TableCell>{invoice.invoice_date}</TableCell>
                <TableCell align="right">
                  {numberWithCommas(invoice.order_details.price)}
                </TableCell>
                <TableCell align="right">
                  {numberWithCommas(channelPaymentsTotal(invoice.payments))}
                </TableCell>
                <TableCell align="right">
                  {numberWithCommas(
                    parseInt(invoice?.order_details.price || "0") -
                      channelPaymentsTotal(invoice.payments)
                  )}
                </TableCell>
                <TableCell>
                  {progressStatus(invoice.order_details.progress_status)}
                </TableCell>
                <TableCell>
                  {formatDateTimeByType(
                    invoice.order_details.progress_status_updated_at,
                    "both"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        PaperProps={{ sx: { p: 2, minWidth: 200 } }}
      >
        <List dense>
          {PROGRESS_STAGES.map((stage) => (
            <ListItem key={stage.value} disablePadding>
              <ListItemButton
                onClick={() =>
                  handleUpdateProgress(stage.value, selectedInvoice)
                }
                selected={
                  selectedInvoice?.order_details?.progress_status ===
                  stage.value
                }
              >
                <ListItemText
                  primary={stage.label}
                  primaryTypographyProps={{
                    fontWeight:
                      selectedInvoice?.order_details?.progress_status ===
                      stage.value
                        ? "bold"
                        : "normal",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Popover>
    </Box>
  );
}
