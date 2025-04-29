import { Typography } from "@mui/material";
import { OrderItem } from "../../model/SingleInvoiceModel";

interface OrderFormLensDetailsProps {
  order_items: OrderItem[];
}

export default function OrderFormLensDetails({
  order_items,
}: OrderFormLensDetailsProps) {
  return (
    <>
      {order_items
        .filter((items) => items.lens !== null)
        .map(
          (item) =>
            item.lens_detail && (
              <>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "bold", marginTop: "0.2cm" }}
                >
                  Lens:
                </Typography>
                <Typography variant="body2">
                  -{item.lens_detail.brand_name}
                </Typography>
                <Typography variant="body2">
                  -{item.lens_detail.coating_name}
                </Typography>
                <Typography variant="body2">
                  -{item.lens_detail.type_name}
                </Typography>
              </>
            )
        )}
    </>
  );
}
