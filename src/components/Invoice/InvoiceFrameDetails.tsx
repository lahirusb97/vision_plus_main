import { Box } from "@mui/material";
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
              <Box
                key={item.id}
                sx={{
                  gridColumn: "1 / -1",
                  display: "grid",
                  gridTemplateColumns: "2fr 23mm 21mm 21mm",
                  backgroundColor: "#fff",
                  paddingY: "1mm",
                  paddingX: "1mm",
                  borderBottom: "1px solid #000",
                }}
              >
                <Box sx={{ textAlign: "left", fontSize: ".9rem" }}>
                  {item.frame_detail.brand_name}/{item.frame_detail.code_name}/
                  {item.frame_detail.color_name}
                </Box>
                <Box sx={{ textAlign: "center" }}>{item.quantity}</Box>
                <Box sx={{ textAlign: "left" }}>
                  {numberWithCommas(item.price_per_unit)}
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  {numberWithCommas(item.subtotal)}
                </Box>
              </Box>
            )
        )}
    </>
  );
}
