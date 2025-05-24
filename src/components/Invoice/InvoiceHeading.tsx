import log from "../../assets/defalt/Rectangle 522.png";
import { Box, Typography } from "@mui/material";
import { formatDateTimeByType } from "../../utils/formatDateTimeByType";
import BranchMobileNum from "../common/BranchMobileNum";

interface InvoiceHeadingProps {
  invoiceDate: string;
  hideDate?: boolean;
}

export default function InvoiceHeading({
  invoiceDate,
  hideDate,
}: InvoiceHeadingProps) {
  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center">
        <img
          src={log}
          alt="Vision Plus Logo"
          style={{ height: "8mm", margin: "0 -4mm" }}
        />
        <Typography
          sx={{ fontFamily: "Algerian", fontSize: "6mm" }}
          variant="h6"
          align="center"
          fontWeight="bold"
        >
          VISION PLUS OPTICIANS & EYE CLINIC (PVT) LTD
        </Typography>
      </Box>

      <BranchMobileNum />

      {!hideDate && (
        <Typography variant="body2" align="center">
          Date: {formatDateTimeByType(invoiceDate, "date")}
        </Typography>
      )}
    </>
  );
}
