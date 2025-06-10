import { Card, CardContent, Typography, Grid, Box, Stack } from "@mui/material";
import { numberWithCommas } from "../utils/numberWithCommas";
import { formatDateTimeByType } from "../utils/formatDateTimeByType";
import { OrderItem } from "../model/SingleInvoiceModel";
import { formatBrandedText } from "../validations/formatBrandedText";

export const AufitExternalLensItem = ({
  order_items,
}: {
  order_items: OrderItem[];
}) => {
  const lensItems = order_items.filter((item) => item.external_lens !== null);

  if (lensItems.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        No Deleted External lens items found.
      </Typography>
    );
  }

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      {lensItems.map((item) =>
        item.external_lens ? (
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
                  <Typography
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    variant="subtitle1"
                    fontWeight={600}
                  >
                    <span>
                      {item.brand_name} / {item.type_name} / {item.coating_name}{" "}
                      / {formatBrandedText(item?.ex_branded_type)}
                    </span>
                  </Typography>
                  <Typography variant="subtitle1" fontWeight={600}></Typography>
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
