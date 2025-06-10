import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { numberWithCommas } from "../utils/numberWithCommas";
import { formatDateTimeByType } from "../utils/formatDateTimeByType";
import { OrderItem } from "../model/SingleInvoiceModel";

export const AuditFrameItem = ({
  order_items,
}: {
  order_items: OrderItem[];
}) => {
  const frameItems = order_items.filter((item) => item.frame !== null);

  if (frameItems.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        No frame items found.
      </Typography>
    );
  }

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      {frameItems.map((item) =>
        item.frame_detail ? (
          <Card
            sx={{
              mb: 0.5,
              px: 1,
              py: 0.5,
              borderLeft: "2px solid #1976d2",
              backgroundColor: "#fafafa",
              borderRadius: 1,
            }}
            variant="outlined"
            key={item.id}
          >
            <CardContent sx={{ p: 1, m: 0 }}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {item.frame_detail.brand_name} /{" "}
                    {item.frame_detail.code_name} /{" "}
                    {item.frame_detail.color_name} /{" "}
                    {item.frame_detail.brand_type_display}
                  </Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">
                    Quantity
                  </Typography>
                  <Typography>{item.quantity}</Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">
                    Unit Price
                  </Typography>
                  <Typography>
                    {numberWithCommas(item.price_per_unit)}
                  </Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">
                    Subtotal
                  </Typography>
                  <Typography>{numberWithCommas(item.subtotal)}</Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">
                    Deleted By (Admin)
                  </Typography>
                  <Typography>{item.admin_username || "-"}</Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">
                    Deleted By (User)
                  </Typography>
                  <Typography>{item.user_username || "-"}</Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">
                    Deleted At
                  </Typography>
                  <Typography>
                    {item.deleted_at
                      ? formatDateTimeByType(item.deleted_at, "both")
                      : "-"}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ) : null
      )}
    </Box>
  );
};
