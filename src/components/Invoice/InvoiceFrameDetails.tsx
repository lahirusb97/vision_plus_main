import { TableCell, TableRow } from "@mui/material";
import { OrderItem } from "../../model/SingleInvoiceModel";
import { numberWithCommas } from "../../utils/numberWithCommas";
interface InvoiceLensDetailsProps {
  order_items: OrderItem[];
}
export default function InvoiceFrameDetails({
  order_items,
}: InvoiceLensDetailsProps) {
  return (
    <>
      {order_items
        .filter((items) => items.frame !== null)
        .map(
          (item) =>
            item.frame_detail && (
              <TableRow key={item.id}>
                <TableCell sx={{ textAlign: "left", fontSize: ".9rem" }}>
                  {item.frame_detail.brand_name}/{item.frame_detail.code_name}/
                  {item.frame_detail.color_name}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {item.quantity}
                </TableCell>
                <TableCell sx={{ textAlign: "right" }}>
                  {numberWithCommas(item.price_per_unit)}
                </TableCell>
                <TableCell sx={{ textAlign: "right" }}>
                  {numberWithCommas(item.subtotal)}
                </TableCell>
              </TableRow>
            )
        )}
    </>
  );
}
