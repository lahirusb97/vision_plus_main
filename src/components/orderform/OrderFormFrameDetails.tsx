import React from "react";
import { Typography } from "@mui/material";
import { OrderItem } from "../../model/SingleInvoiceModel";

interface OrderFormFrameDetailsProps {
  order_items: OrderItem[];
}

export default function OrderFormFrameDetails({
  order_items,
}: OrderFormFrameDetailsProps) {
  return (
    <>
      {order_items
        .filter((items) => items.frame !== null)
        .map((item) => (
          <>
            <Typography variant="body2">
              -{item.frame_detail?.brand_name}
            </Typography>
            <Typography variant="body2">
              -{item.frame_detail?.code_name}
            </Typography>
            <Typography variant="body2">
              -{item.frame_detail?.color_name}
            </Typography>
            <Typography variant="body2">-{item.frame_detail?.size}</Typography>
            <Typography variant="body2">
              -{item.frame_detail?.species}
            </Typography>
          </>
        ))}
    </>
  );
}
