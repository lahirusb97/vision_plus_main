import { Box, TableCell, TableRow } from "@mui/material";
import { OrderItem } from "../../model/SingleInvoiceModel";
import { InvoiceItemCalculateTotal } from "../../utils/calculations";
import { numberWithCommas } from "../../utils/numberWithCommas";
interface InvoiceLensDetailsProps {
  order_items: OrderItem[];
}
export default function InvoiceLensDetails({
  order_items,
}: InvoiceLensDetailsProps) {
  const instockLenseTotal = InvoiceItemCalculateTotal(
    order_items.filter((items) => items.lens !== null)
  );
  return (
    <>
      <TableRow>
        <TableCell>
          {
            order_items
              .filter((items) => items.lens !== null)
              .map(
                (item) =>
                  item.lens_detail && (
                    <Box
                      key={item.lens_detail.id}
                      sx={{
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
                        {item.lens_detail.brand_name} /
                      </Box>
                      {item.lens_detail.coating_name}/
                      {item.lens_detail.type_name}
                    </Box>
                  )
              )[0]
          }
        </TableCell>

        {instockLenseTotal.quantity > 0 &&
          instockLenseTotal.price_per_unit > 0 &&
          instockLenseTotal.subtotal > 0 && (
            <>
              <TableCell sx={{ textAlign: "center" }}>
                {instockLenseTotal.quantity}
              </TableCell>
              <TableCell sx={{ textAlign: "right" }}>
                {numberWithCommas(instockLenseTotal.price_per_unit)}
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "right",
                }}
              >
                {numberWithCommas(instockLenseTotal.subtotal)}
              </TableCell>
            </>
          )}
      </TableRow>
    </>
  );
}
