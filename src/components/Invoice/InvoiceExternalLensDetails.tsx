import { Box, TableCell, TableRow } from "@mui/material";
import { OrderItem } from "../../model/SingleInvoiceModel";
import { InvoiceItemCalculateTotal } from "../../utils/calculations";
import { numberWithCommas } from "../../utils/numberWithCommas";
interface InvoiceLensDetailsProps {
  order_items: OrderItem[];
}
export default function InvoiceExternalLensDetails({
  order_items,
}: InvoiceLensDetailsProps) {
  const externalLenseTotal = InvoiceItemCalculateTotal(
    order_items.filter((items) => items.external_lens !== null)
  );
  return (
    <TableRow>
      {order_items
        .filter((items) => items.external_lens !== null)
        .slice(0, 1)
        .map(
          (item) =>
            item.external_lens && (
              <TableCell
                key={item.id}
                sx={{
                  textAlign: "left",
                  fontSize: ".9rem",
                }}
              >
                <Box
                  component={"span"}
                  sx={{
                    "@media print": {
                      display: "none",
                    },
                  }}
                >
                  {item.brand_name} /
                </Box>
                {` ${item.coating_name} / ${item.type_name}`}
              </TableCell>
            )
        )}

      {externalLenseTotal.quantity > 0 &&
        externalLenseTotal.price_per_unit > 0 &&
        externalLenseTotal.subtotal > 0 && (
          <>
            <TableCell
              sx={{
                textAlign: "center",
              }}
            >
              {externalLenseTotal.quantity}
            </TableCell>
            <TableCell
              sx={{
                textAlign: "right",
              }}
            >
              {numberWithCommas(externalLenseTotal.price_per_unit)}
            </TableCell>
            <TableCell
              sx={{
                textAlign: "right",
              }}
            >
              {numberWithCommas(externalLenseTotal.subtotal)}
            </TableCell>
          </>
        )}
    </TableRow>
  );
}
