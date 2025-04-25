import { Box, Typography } from "@mui/material";
import { Invoice } from "../../model/SingleInvoiceModel";
interface InvoiceAddressProps {
  invoiceDetail: Invoice | null;
}

export default function InvoiceAddress({ invoiceDetail }: InvoiceAddressProps) {
  return (
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
              <span style={{ margin: "0 1mm", fontWeight: "bold" }}>:</span>
              {invoiceDetail?.customer_details?.name}
            </Typography>
            <Typography variant="body2">Address</Typography>
            <Typography sx={{}} variant="body2">
              <span style={{ margin: "0 1mm", fontWeight: "bold" }}>:</span>
              {invoiceDetail?.customer_details?.address}
            </Typography>
            <Typography variant="body2">Contact</Typography>
            <Typography sx={{}} variant="body2">
              <span style={{ margin: "0 1mm", fontWeight: "bold" }}>:</span>
              {invoiceDetail?.customer_details?.phone_number}
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
          <Typography variant="body2">No: 34, Aluthgama Road</Typography>
          <Typography variant="body2">Mathugama</Typography>
          <Typography variant="body2">Sri Lanka</Typography>
        </Box>
      </Box>
    </div>
  );
}
