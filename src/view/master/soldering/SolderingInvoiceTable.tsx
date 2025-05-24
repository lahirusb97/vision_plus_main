import {
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
  Tooltip,
  Box,
} from "@mui/material";
import useGetSolderingInvoiceList from "../../../hooks/useGetSolderingInvoiceList";
import { channelPaymentsTotal } from "../../../utils/channelPaymentsTotal";
import { numberWithCommas } from "../../../utils/numberWithCommas";
import { progressStatus } from "../../../utils/progressState";
import { formatDateTimeByType } from "../../../utils/formatDateTimeByType";
import { SolderingInvoiceModel } from "../../../model/SolderingInvoiceModel";
import { Edit, Print, Update } from "@mui/icons-material";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import axiosClient from "../../../axiosClient";
import toast from "react-hot-toast";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { useMutationDialog } from "../../../context/MutationDialogContext";
import { useState } from "react";
import CustomerPagination from "../../../components/CustomPagination";
import TitleText from "../../../components/TitleText";
import SolderingInvoiceSearch from "../../../hooks/SolderingInvoiceSearch";
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
  const {
    solderingInvoiceList,
    solderingInvoiceListRefres,
    solderingInvoiceLimit,
    solderingInvoiceListSearch,
    solderingInvoiceListTotalCount,
    solderingInvoiceListPageNavigation,
    solderingInvoiceListChangePageSize,
  } = useGetSolderingInvoiceList();
  const { openMutationDialog } = useMutationDialog();

  const handleUpdateProgress = (
    stage: string,
    invoice: SolderingInvoiceModel | null
  ) => {
    if (!invoice) return;
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

  return (
    <Paper sx={{ p: 2, width: "100%" }}>
      <TitleText title="Soldering Invoice List" />
      <SolderingInvoiceSearch invoiceListSearch={solderingInvoiceListSearch} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Actions </TableCell>
              <TableCell align="center">Repayment</TableCell>

              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Mobile</TableCell>
              <TableCell align="center">Nic</TableCell>
              <TableCell>Invoice Number</TableCell>
              <TableCell>Invoice Date</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell align="center"> Status</TableCell>
              <TableCell align="center">Last Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {solderingInvoiceList.map((invoice) => (
              <TableRow key={invoice.invoice_number}>
                <TableCell align="center">
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Tooltip title="Edit Invoice">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() =>
                          navigate(
                            `/master/soldering-invoice/${invoice.invoice_number}/soldering-edit`
                          )
                        }
                      >
                        <Edit color="info" sx={{ fontSize: 15 }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Update Progress">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={(event) => handleOpenPopover(event, invoice)}
                      >
                        <Update sx={{ fontSize: 15 }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="View Invoice">
                      <IconButton
                        size="small"
                        onClick={(event) => {
                          event.preventDefault();
                          const url = `/master/soldering-invoice/${invoice.invoice_number}`;
                          window.open(url, "_blank");
                        }}
                      >
                        <Print color="info" sx={{ fontSize: 15 }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Repayment">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={(event) => {
                        event.preventDefault();
                        const url = `/master/soldering-invoice/${invoice.invoice_number}/soldering-repayment`;
                        window.open(url, "_blank");
                      }}
                    >
                      <PointOfSaleIcon color="error" sx={{ fontSize: 15 }} />
                    </IconButton>
                  </Tooltip>
                </TableCell>

                <TableCell>{invoice.patient.name}</TableCell>
                <TableCell>{invoice.patient.phone_number}</TableCell>
                <TableCell>{invoice.patient.nic}</TableCell>
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
      <CustomerPagination
        totalCount={solderingInvoiceListTotalCount}
        handlePageNavigation={solderingInvoiceListPageNavigation}
        changePageSize={solderingInvoiceListChangePageSize}
        page_size={solderingInvoiceLimit}
      />
    </Paper>
  );
}
