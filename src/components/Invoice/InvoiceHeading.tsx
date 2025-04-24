import log from "../../assets/defalt/Rectangle 522.png";
import { Box, Typography } from "@mui/material";
import { formatDateTimeByType } from "../../utils/formatDateTimeByType";

interface InvoiceHeadingProps {
  invoiceDate: string;
}

export default function InvoiceHeading({ invoiceDate }: InvoiceHeadingProps) {
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

      <Typography variant="body2" align="center">
        Tel: 034 2247466 / 071 7513639
      </Typography>
      <Typography variant="body2" align="center">
        Date: {formatDateTimeByType(invoiceDate, "date")}
      </Typography>
    </>
  );
}
