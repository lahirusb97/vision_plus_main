import { TableCell, TableRow } from "@mui/material";
import { DoctorClaimPayload } from "../../../features/invoice/doctorClaimSlice";
import { numberWithCommas } from "../../../utils/numberWithCommas";

interface DoctorClaimTotalSummeryProps {
  invoiceDetail: DoctorClaimPayload | null;
}

export default function DoctorClaimTotalSummery({
  invoiceDetail,
}: DoctorClaimTotalSummeryProps) {
  return (
    <>
      <TableRow>
        <TableCell sx={{ border: "none" }} align="right" colSpan={3}>
          Subtotal
        </TableCell>

        <TableCell align="right">
          {numberWithCommas(invoiceDetail?.sub_total)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ border: "none" }} align="right" colSpan={3}>
          Discounts
        </TableCell>

        <TableCell align="right">
          {numberWithCommas(invoiceDetail?.discount)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ border: "none" }} align="right" colSpan={3}>
          <strong>Total</strong>
        </TableCell>
        <TableCell align="right">
          <strong>{numberWithCommas(invoiceDetail?.total_price)}</strong>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ border: "none" }} align="right" colSpan={3}>
          Payment
        </TableCell>
        <TableCell
          sx={{
            textAlign: "right",
          }}
        >
          {numberWithCommas(invoiceDetail?.order_payments)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ border: "none" }} align="right" colSpan={3}>
          Balance
        </TableCell>
        <TableCell
          sx={{
            textAlign: "right",
          }}
        >
          {numberWithCommas(invoiceDetail?.balance)}
        </TableCell>
      </TableRow>
    </>
  );
}
