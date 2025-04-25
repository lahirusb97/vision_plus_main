import { Box } from "@mui/material";
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
      <Box
        sx={{
          gridColumn: "1 / -1",
          display: "grid",
          gridTemplateColumns: "2fr 21mm 22mm 21mm",
          backgroundColor: "#fff",
          paddingX: "2mm",
          borderBottom:
            instockLenseTotal.subtotal > 0 ? "1px solid #000" : "none",
        }}
      >
        {
          order_items
            .filter((items) => items.lens !== null)
            .map(
              (item) =>
                item.lens_detail && (
                  <Box
                    key={item.lens_detail.id}
                    sx={{
                      textAlign: "left",
                      fontSize: ".9rem",
                      paddingY: "1mm",
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
                    {item.lens_detail.coating_name}/{item.lens_detail.type_name}
                  </Box>
                )
            )[0]
        }

        {instockLenseTotal.quantity > 0 &&
          instockLenseTotal.price_per_unit > 0 &&
          instockLenseTotal.subtotal > 0 && (
            <>
              <Box sx={{ textAlign: "center" }}>
                {instockLenseTotal.quantity}
              </Box>
              <Box sx={{ textAlign: "left" }}>
                {numberWithCommas(instockLenseTotal.price_per_unit)}
              </Box>
              <Box
                sx={{
                  textAlign: "right",

                  paddingLeft: "2mm",
                }}
              >
                {numberWithCommas(instockLenseTotal.subtotal)}
              </Box>
            </>
          )}
      </Box>
    </>
  );
}
