import { TableCell, TableRow } from "@mui/material";
import { numberWithCommas } from "../../../utils/numberWithCommas";
import { OrderItem } from "../../../model/SingleInvoiceModel";
interface InvoiceLensDetailsProps {
  order_items: OrderItem[];
}
export default function TableRawNormalItem({
  order_items,
}: InvoiceLensDetailsProps) {
  return (
    <>
      {order_items
        ?.filter((item) => item.other_item !== null)
        .map((item) => (
          <TableRow key={item.id}>
            <TableCell sx={{ textAlign: "left", fontSize: ".9rem" }}>
              {item.other_item_detail?.name}
            </TableCell>
            <TableCell sx={{ textAlign: "center" }}>{item.quantity}</TableCell>
            <TableCell sx={{ textAlign: "right" }}>
              {numberWithCommas(item.price_per_unit)}
            </TableCell>
            <TableCell sx={{ textAlign: "right" }}>
              {numberWithCommas(item.subtotal)}
            </TableCell>
          </TableRow>
        ))}
    </>
  );
}
