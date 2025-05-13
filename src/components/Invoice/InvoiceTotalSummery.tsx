import { TableCell, TableRow } from "@mui/material";
import { numberWithCommas } from "../../utils/numberWithCommas";
import { customerPaymentTotal } from "../../utils/customerPaymentTotal";
import { Invoice } from "../../model/SingleInvoiceModel";
interface InvoiceSummeryProps {
  invoiceDetail: Invoice | null;
}

export default function InvoiceTotalSummery({
  invoiceDetail,
}: InvoiceSummeryProps) {
  return (
    <>
      <TableRow>
        <TableCell sx={{ border: "none" }} align="right" colSpan={3}>
          Subtotal
        </TableCell>

        <TableCell align="right">
          {numberWithCommas(invoiceDetail?.order_details.sub_total)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ border: "none" }} align="right" colSpan={3}>
          Discounts
        </TableCell>

        <TableCell align="right">
          {numberWithCommas(invoiceDetail?.order_details.discount)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ border: "none" }} align="right" colSpan={3}>
          <strong>Total</strong>
        </TableCell>
        <TableCell align="right">
          <strong>
            {numberWithCommas(invoiceDetail?.order_details.total_price)}
          </strong>
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
          {numberWithCommas(
            customerPaymentTotal(invoiceDetail?.order_details.order_payments)
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ border: "none" }} align="right" colSpan={3}>
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
              parseInt(invoiceDetail?.order_details?.total_price || "0") -
                customerPaymentTotal(
                  invoiceDetail?.order_details.order_payments
                )
            )}
          </strong>
        </TableCell>
      </TableRow>
    </>
  );
}
