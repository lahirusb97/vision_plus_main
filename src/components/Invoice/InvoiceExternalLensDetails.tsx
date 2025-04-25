import { Box } from "@mui/material";
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
    <>
      <Box
        sx={{
          gridColumn: "1 / -1",
          display: "grid",
          gridTemplateColumns: "2fr 21mm 22mm 21mm",
          backgroundColor: "#fff",
          paddingX: "1mm",
          borderBottom:
            externalLenseTotal.subtotal > 0 ? "1px solid #000" : "none",
        }}
      >
        {order_items
          .filter((items) => items.external_lens !== null)
          .slice(0, 1)
          .map(
            (item) =>
              item.external_lens && (
                <>
                  <Box
                    key={item.id}
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
                      {item.brand_name} /
                    </Box>
                    {` ${item.coating_name} / ${item.type_name}`}
                  </Box>
                </>
              )
          )}

        {externalLenseTotal.quantity > 0 &&
          externalLenseTotal.price_per_unit > 0 &&
          externalLenseTotal.subtotal > 0 && (
            <>
              <Box
                sx={{
                  textAlign: "center",
                }}
              >
                {externalLenseTotal.quantity}
              </Box>
              <Box
                sx={{
                  textAlign: "left",
                }}
              >
                {numberWithCommas(externalLenseTotal.price_per_unit)}
              </Box>
              <Box
                sx={{
                  textAlign: "right",
                }}
              >
                {numberWithCommas(externalLenseTotal.subtotal)}
              </Box>
            </>
          )}
      </Box>
    </>
  );
}
