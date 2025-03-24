import React, { useRef } from "react";
import {
  Box,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  GlobalStyles,
} from "@mui/material";
import { useReactToPrint } from "react-to-print";
import { Invoice } from "../model/SingleInvoiceModel";
import { dateAndTimeFormat } from "../utils/dateAndTimeFormat";

interface OrderFormProps {
  invoiceDetail: Invoice | null;
}

const OrderForm: React.FC<OrderFormProps> = ({ invoiceDetail }) => {
  const componentRef = useRef<HTMLDivElement | null>(null);
  const reactToPrintFn = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      {/* Custom Font */}
      <GlobalStyles
        styles={{
          "@font-face": {
            fontFamily: "Alger",
            src: "url('/fonts/ALGER.ttf') format('truetype')",
            fontWeight: "normal",
            fontStyle: "normal",
          },
        }}
      />

      <Box sx={{ padding: "0.5cm", fontFamily: "Alger" }}>
        {/* Printable Section */}
        <Box
          sx={{
            padding: "1cm",
            width: "21cm",
            minHeight: "14.8cm",
            margin: "0 auto",
            border: "1px solid #000",
            fontFamily: "Alger, Arial, sans-serif",
            "@media print": {
              width: "21cm",
              minHeight: "14.8cm",
              border: "none",
              margin: "0",
              padding: "0.2cm",
            },
          }}
          ref={componentRef}
        >
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
            {/* Left Section */}
            <Box sx={{ display: "flex", flexDirection: "column", flex: 2, gap: "1rem", width: "14cm" }}>
              <Box sx={{ display: "flex", gap: "1rem" }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    VISION PLUS OPTICIANS (PVT) LTD
                  </Typography>
                  <Typography variant="body1">
                    {dateAndTimeFormat(invoiceDetail?.invoice_date)}
                  </Typography>
                </Box>
                <Box sx={{ border: "1px solid gray", padding: "0.2cm" }}>
                  <Typography variant="body1">Invoice No:</Typography>
                  <Typography variant="body1">
                    <strong>ALUA0001</strong>
                  </Typography>
                </Box>
              </Box>

              {/* Table Section */}
              <TableContainer component={Paper}>
                <Table size="small" sx={{ marginTop: "0.4cm" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" colSpan={3} sx={{ border: "1px solid black", fontWeight: "bold" }}>
                        Right Eye
                      </TableCell>
                      <TableCell align="center" colSpan={3} sx={{ border: "1px solid black", fontWeight: "bold" }}>
                        Left Eye
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ border: "1px solid black", fontWeight: "bold" }}>SPH</TableCell>
                      <TableCell sx={{ border: "1px solid black", fontWeight: "bold" }}>CYL</TableCell>
                      <TableCell sx={{ border: "1px solid black", fontWeight: "bold" }}>AXIS</TableCell>
                      <TableCell sx={{ border: "1px solid black", fontWeight: "bold" }}>SPH</TableCell>
                      <TableCell sx={{ border: "1px solid black", fontWeight: "bold" }}>CYL</TableCell>
                      <TableCell sx={{ border: "1px solid black", fontWeight: "bold" }}>AXIS</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ border: "1px solid black" }}>1</TableCell>
                      <TableCell sx={{ border: "1px solid black" }}>-1</TableCell>
                      <TableCell sx={{ border: "1px solid black" }}>1</TableCell>
                      <TableCell sx={{ border: "1px solid black" }}>1</TableCell>
                      <TableCell sx={{ border: "1px solid black" }}>-1</TableCell>
                      <TableCell sx={{ border: "1px solid black" }}>1</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ marginTop: "0.2cm" }}>
                <Typography variant="body2">
                  <strong>Details:</strong> Lens Type / Lens Coating / Lens Brand / Frame Brand / Frame Shape / PD: 87 / H:10 / shuger/cataract /
                </Typography>
                <Typography variant="body2">
                  LPD: 87 / LH:10 / shuger/cataract
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  Remark: factory invoice remark required
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  Refraction remark: Refraction related remark
                </Typography>
                {/* Staff Members Section */}
          <Box display="flex" alignItems="center" marginTop="0.2cm">
            <Typography variant="body2" fontWeight="bold">
              Staff Members:
            </Typography>
            <Box sx={{ display: "flex", gap: "0.3cm",}}>
              <Box sx={{ width: "1cm", height: "1cm", border: "1px solid black" }} />
              <Box sx={{ width: "1cm", height: "1cm", border: "1px solid black" }} />
              <Box sx={{ width: "1cm", height: "1cm", border: "1px solid black" }} />
              <Box sx={{ width: "1cm", height: "1cm", border: "1px solid black" }} />
            </Box>
          </Box>
              </Box>
            </Box>

            {/* Right Section (On Hold / Fitting on collection) */}
            <Box sx={{ flex: 1, border: "1px solid gray", padding: "0.5cm", width: "7cm" }}>
              <Typography variant="h6" sx={{ fontFamily: "Alger" }}>
                On Hold / Fitting on collection
              </Typography>
              <Typography variant="body2">Refraction : Mr. Plumf / Prescription</Typography>
              <Typography variant="body2">Refraction No : ALU001</Typography>
              <Typography variant="body2">Staff Member : Mr. Rukshan</Typography>
              <Typography variant="body2">Name : Mr. Ruwan Jayakodi</Typography>

              <Typography variant="body2" sx={{ marginTop: "0.5cm", fontWeight: "bold" }}>
                Frame :
              </Typography>
              <Typography variant="body2">Ray Ban</Typography>
              <Typography variant="body2">DC5893</Typography>
              <Typography variant="body2">Black</Typography>
              <Typography variant="body2">Plastic</Typography>

              <Typography variant="body2" sx={{ marginTop: "0.5cm", fontWeight: "bold" }}>
                Lense :
              </Typography>
              <Typography variant="body2">Lens Type</Typography>
              <Typography variant="body2">Coating</Typography>
              <Typography variant="body2">Lens Factory</Typography>

            </Box>
            
          </Box>

          

          {/* Payment Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "21cm",
              height: "4.8cm",
              border: "1px solid black",
              padding: "0.2cm",
              marginTop: "0.2cm",
            }}
          >
            {/* Payment Details */}
            <Box sx={{ flex: 1, padding: "0.2cm" }}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Payment Details:
              </Typography>
              <Typography variant="body2">Full Amount - Rs. 10000.00</Typography>
              <Typography variant="body2">Total Payment - Rs. 5000.00</Typography>
              <Typography variant="body2">Balance - Rs. 5000.00</Typography>
            </Box>

            {/* Empty Box */}
            <Box
              sx={{
                width: "15cm",
                height: "4.4cm",
                border: "1px solid black",
              }}
            />
          </Box>
        </Box>

        {/* Print Button */}
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => reactToPrintFn()}
            sx={{ marginTop: "0.2cm" }}
          >
            Print Invoice
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default OrderForm;