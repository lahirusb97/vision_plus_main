import { TableCell, TableRow } from "@mui/material";
import { OrderItem } from "../../model/SingleInvoiceModel";
import { numberWithCommas } from "../../utils/numberWithCommas";
interface InvoiceLensDetailsProps {
  order_items: OrderItem[];
}
export default function InvoiceHearingDetails({
  order_items,
}: InvoiceLensDetailsProps) {
  return (
    <>
      {order_items
        .filter((items) => items.hearing_item !== null)
        .map(
          (item) =>
            item.hearing_item_detail && (
              <TableRow key={item.id}>
                <TableCell sx={{ textAlign: "left", fontSize: ".9rem" }}>
                  {item.hearing_item_detail.name} | Serial No - {item.serial_no || ""} |{" "}
                  Battery - {item.battery || ""}
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
