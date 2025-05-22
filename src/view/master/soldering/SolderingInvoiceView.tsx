import {
  Box,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";
import { useParams } from "react-router";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import InvoiceHeading from "../../../components/Invoice/InvoiceHeading";
import InvoiceFooter from "../../../components/Invoice/InvoiceFooter";
import useGetSolderingInvoiceList from "../../../hooks/useGetSolderingInvoiceList";
import BranchAddress from "../../../components/common/BranchAddress";
import { numberWithCommas } from "../../../utils/numberWithCommas";
import { channelPaymentsTotal } from "../../../utils/channelPaymentsTotal";
import LoadingAnimation from "../../../components/LoadingAnimation";
import BackButton from "../../../components/BackButton";

const SolderingInvoiceView = () => {
  const { invoice_number } = useParams();
  const componentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef: componentRef });
  const { solderingInvoiceList, solderingInvoiceListLoading } =
    useGetSolderingInvoiceList({
      invoice_number: invoice_number,
    });

  const invoiceDetail =
    solderingInvoiceList.length === 1 ? solderingInvoiceList[0] : null;

  if (solderingInvoiceListLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <LoadingAnimation loadingMsg="Loading Soldering Invoice" />
      </Box>
    );
  }

  return (
    <div>
      {/* A5 Paper Size Container */}
      {invoiceDetail && (
        <div>
          <Box
            sx={{
              padding: "4mm",
              minwidth: "6cm", // A5 width
              minHeight: "10.5mc", // A5 height
              border: "1px solid #000",
              fontFamily: "Arial, sans-serif",
              "@media print": {
                minWidth: "13cm",
                minHeight: "21cm",
                border: "none",
                margin: "0",
              },
            }}
            ref={componentRef}
          >
            {/* Logo and Header */}
            <InvoiceHeading invoiceDate={invoiceDetail.invoice_date} />

            <div>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <Box sx={{ alignSelf: "flex-end" }}>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "15mm 1fr",
                      gridTemplateRows: "repeat(3, 1fr)", // 3 equal columns
                    }}
                  >
                    <Typography variant="body2">Name</Typography>
                    <Typography sx={{}} variant="body2">
                      <span style={{ margin: "0 1mm", fontWeight: "bold" }}>
                        :
                      </span>
                      {invoiceDetail?.patient?.name}
                    </Typography>
                    <Typography variant="body2">Address</Typography>
                    <Typography sx={{}} variant="body2">
                      <span style={{ margin: "0 1mm", fontWeight: "bold" }}>
                        :
                      </span>
                      {invoiceDetail?.patient?.address}
                    </Typography>
                    <Typography variant="body2">Contact</Typography>
                    <Typography sx={{}} variant="body2">
                      <span style={{ margin: "0 1mm", fontWeight: "bold" }}>
                        :
                      </span>
                      {invoiceDetail?.patient?.phone_number}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ textAlign: "left" }}>
                  <Typography variant="body2">
                    <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                      INVOICE NO : {invoiceDetail?.invoice_number}{" "}
                      {/* //!Order ID as Invoice Number */}
                    </span>
                  </Typography>
                  <BranchAddress />
                </Box>
              </Box>
            </div>

            {/* Table using CSS Grid */}
            <Table sx={{ border: "2px solid #000", maxWidth: "16cm" }}>
              <TableHead>
                <TableRow sx={{ borderBottom: "2px solid #000" }}>
                  <TableCell>Description</TableCell>

                  <TableCell align="right">Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell
                    sx={{
                      textAlign: "left",
                      fontSize: ".9rem",
                      whiteSpace: "pre-line",
                      wordBreak: "break-word",
                    }}
                  >
                    {invoiceDetail.order_details.note}
                  </TableCell>

                  <TableCell sx={{ textAlign: "right" }}>
                    {numberWithCommas(invoiceDetail.order_details.price)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ border: "none" }} align="right" colSpan={1}>
                    Payment
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "right",
                    }}
                  >
                    {numberWithCommas(
                      channelPaymentsTotal(invoiceDetail?.payments)
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ border: "none" }} align="right" colSpan={1}>
                    <strong>Balance</strong>
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "right",
                    }}
                  >
                    <strong>
                      {" "}
                      {numberWithCommas(
                        parseInt(invoiceDetail?.order_details.price || "0") -
                          channelPaymentsTotal(invoiceDetail?.payments)
                      )}
                    </strong>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <InvoiceFooter />
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => reactToPrintFn()}
            sx={{ mt: "2mm" }}
          >
            Print Invoice
          </Button>
        </div>
      )}

      {!invoiceDetail && (
        <Box>
          <Typography variant="h6">Invoice Not Found</Typography>
          <BackButton />
        </Box>
      )}
    </div>
  );
};

export default SolderingInvoiceView;
