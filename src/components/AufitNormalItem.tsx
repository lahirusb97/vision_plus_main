import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { numberWithCommas } from "../utils/numberWithCommas";
import { formatDateTimeByType } from "../utils/formatDateTimeByType";
import { OrderItem } from "../model/SingleInvoiceModel";

export const AufitNormalItem = ({
  order_items,
}: {
  order_items: OrderItem[];
}) => {
  const normalItems = order_items.filter((item) => item.frame === null);

  if (normalItems.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        No normal items found.
      </Typography>
    );
  }

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      {normalItems.map((item) =>
        item.other_item ? (
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
                    {item.other_item_detail.name}
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
