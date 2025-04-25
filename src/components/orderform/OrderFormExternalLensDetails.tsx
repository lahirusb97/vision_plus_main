import React from "react";
import { Typography } from "@mui/material";
import { OrderItem } from "../../model/SingleInvoiceModel";

interface OrderFormLensDetailsProps {
  order_items: OrderItem[];
}

export default function OrderFormExternalLensDetails({
  order_items,
}: OrderFormLensDetailsProps) {
  return (
    <>
      {order_items
        .filter((items) => items.external_lens !== null)
        .map(
          (item) =>
            item.external_lens && (
              <>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "bold", marginTop: "0.2cm" }}
                >
                  External Lens:
                </Typography>
                <Typography variant="body2">-{item.type_name}</Typography>
                <Typography variant="body2">-{item.brand_name}</Typography>
                <Typography variant="body2">-{item.coating_name}</Typography>
              </>
            )
        )}
    </>
  );
}
