import { Box, Typography } from "@mui/material";
import BranchAddress from "../../../components/common/BranchAddress";
import { DoctorClaimPayload } from "../../../features/invoice/doctorClaimSlice";
interface InvoiceAddressProps {
  invoiceDetail: DoctorClaimPayload | null;
}

export default function DoctorClaimInvoiceAddress({
  invoiceDetail,
}: InvoiceAddressProps) {
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
              {invoiceDetail?.name}
            </Typography>
            <Typography variant="body2">Address</Typography>
            <Typography sx={{}} variant="body2">
              <span style={{ margin: "0 1mm", fontWeight: "bold" }}>:</span>
              {invoiceDetail?.address}
            </Typography>
            <Typography variant="body2">Contact</Typography>
            <Typography sx={{}} variant="body2">
              <span style={{ margin: "0 1mm", fontWeight: "bold" }}>:</span>
              {invoiceDetail?.phone_number}
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
  );
}
