import { Box } from "@mui/material";
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
      <Box
        sx={{
          gridColumn: "1 / -1",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 24mm 21mm ",
          backgroundColor: "#fff",
        }}
      >
        <Box
          sx={{
            gridColumn: "3/4",
            padding: "1mm",

            borderBottom: "1px solid #000",
            borderLeft: "1px solid #000",
          }}
        >
          Subtotal
        </Box>

        <Box
          sx={{
            textAlign: "right",
            gridColumn: "4 / 6",
            padding: "1mm",
            borderBottom: "1px solid #000",
          }}
        >
          {numberWithCommas(invoiceDetail?.order_details.sub_total)}
        </Box>
      </Box>
      <Box
        sx={{
          gridColumn: "1 / -1",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 24mm 21mm ",
          backgroundColor: "#fff",
        }}
      >
        <Box
          sx={{
            gridColumn: "3 / 4",
            padding: "1mm",
            borderBottom: "1px solid #000",

            paddingLeft: "1mm",
            borderLeft: "1px solid #000",
          }}
        >
          Discounts
        </Box>
        <Box
          sx={{
            textAlign: "right",
            gridColumn: "4 / 6",
            padding: "1mm",
            borderBottom: "1px solid #000",
          }}
        >
          {numberWithCommas(invoiceDetail?.order_details.discount)}
        </Box>
      </Box>
      <Box
        sx={{
          gridColumn: "1 / -1",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 24mm 21mm ",
          backgroundColor: "#fff",
        }}
      >
        <Box
          sx={{
            gridColumn: "3 / 4",
            fontWeight: "bold",
            textAlign: "left",
            padding: "1mm",

            borderBottom: "1px solid #000",

            paddingLeft: "1mm",
            borderLeft: "1px solid #000",
          }}
        >
          Total
        </Box>
        <Box
          sx={{
            textAlign: "right",
            gridColumn: "4 / 6",
            padding: "1mm",

            borderBottom: "1px solid #000",
          }}
        >
          <strong>
            {numberWithCommas(invoiceDetail?.order_details.total_price)}
          </strong>
        </Box>
      </Box>
      <Box
        sx={{
          gridColumn: "1 / -1",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 24mm 21mm",
          backgroundColor: "#fff",
        }}
      >
        <Box
          sx={{
            gridColumn: "3 / 4",

            borderBottom: "1px solid #000",
            paddingLeft: "1mm",
            borderLeft: "1px solid #000",
          }}
        >
          Payment
        </Box>
        <Box
          sx={{
            textAlign: "right",
            gridColumn: "4 / 6",
            padding: "1mm",

            borderBottom: "1px solid #000",
          }}
        >
          {numberWithCommas(
            customerPaymentTotal(invoiceDetail?.order_details.order_payments)
          )}
        </Box>
      </Box>
      <Box
        sx={{
          gridColumn: "1 / -1",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 24mm 21mm",
          backgroundColor: "#fff",
        }}
      >
        <Box
          sx={{
            gridColumn: "3 / 4",
            fontWeight: "bold",
            paddingLeft: "1mm",
            borderLeft: "1px solid #000",
          }}
        >
          Balance
        </Box>
        <Box
          sx={{
            textAlign: "right",
            gridColumn: "4 / 6",
            fontWeight: "bold",
            padding: "1mm",
          }}
        >
          {numberWithCommas(
            parseInt(invoiceDetail?.order_details?.total_price || "0") -
              customerPaymentTotal(invoiceDetail?.order_details.order_payments)
          )}
        </Box>
      </Box>
    </>
  );
}
