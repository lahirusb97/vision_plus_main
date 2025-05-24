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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import InvoiceHeading from "../../../components/Invoice/InvoiceHeading";
import DoctorClaimInvoiceAddress from "./DoctorClaimInvoiceAddress";
import DoctorClaimItems from "./DoctorClaimItems";
import DoctorClaimTotalSummery from "./DoctorClaimTotalSummery";
import InvoiceFooter from "../../../components/Invoice/InvoiceFooter";
import { clearDoctorClaim } from "../../../features/invoice/doctorClaimSlice";
import BackButton from "../../../components/BackButton";
import { useNavigate } from "react-router";
export default function DoctorClainInvoiceView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const doctorClaimInvoice = useSelector(
    (state: RootState) => state.doctor_claim_invoice.doctorClaimPayload
  );
  const componentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef: componentRef });

  return (
    <div>
      {doctorClaimInvoice && (
        <>
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
            <InvoiceHeading
              invoiceDate={doctorClaimInvoice.date}
              hideDate={true}
            />

            <DoctorClaimInvoiceAddress invoiceDetail={doctorClaimInvoice} />
            <Typography variant="body2" align="center">
              Invoice Date: {doctorClaimInvoice.invoice_date}
            </Typography>

            <Table sx={{ border: "2px solid #000" }}>
              <TableHead>
                <TableRow sx={{ borderBottom: "2px solid #000" }}>
                  <TableCell>Description</TableCell>
                  <TableCell align="center">Qty.</TableCell>
                  <TableCell align="right">Unit</TableCell>
                  <TableCell align="right">Sum</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <DoctorClaimItems invoiceDetail={doctorClaimInvoice} />
                <DoctorClaimTotalSummery invoiceDetail={doctorClaimInvoice} />
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
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              dispatch(clearDoctorClaim());
              navigate("/transaction/doctor_claim_invoice");
            }}
            sx={{ mt: "2mm", ml: "2mm" }}
          >
            Clear Invoice
          </Button>
        </>
      )}
      {!doctorClaimInvoice && (
        <Typography variant="h6" align="center">
          <BackButton />
          Invoice not found
        </Typography>
      )}
    </div>
  );
}
