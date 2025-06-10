import { Card, CardContent, Typography, Grid, Box, Stack } from "@mui/material";
import { numberWithCommas } from "../utils/numberWithCommas";
import { formatDateTimeByType } from "../utils/formatDateTimeByType";
import { OrderItem } from "../model/SingleInvoiceModel";
import InfoChip from "./common/InfoChip";
import returnPlusSymbol from "../utils/returnPlusSymbol";

export const AufitLensItem = ({
  order_items,
}: {
  order_items: OrderItem[];
}) => {
  const lensItems = order_items.filter((item) => item.lens !== null);

  if (lensItems.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        No Deleted lens items found.
      </Typography>
    );
  }

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      {lensItems.map((item) =>
        item.lens_detail ? (
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
                      {item.lens_detail.brand_name} /{" "}
                      {item.lens_detail.type_name} /{" "}
                      {item.lens_detail.coating_name} /{" "}
                    </span>{" "}
                    Powers :
                    <Stack
                      direction="row"
                      spacing={1.5}
                      useFlexGap
                      flexWrap="wrap"
                    >
                      {item?.lens_powers.map((item) => (
                        <div key={item.power_name}>
                          <InfoChip
                            label={item.power_name}
                            value={`${returnPlusSymbol(item.value)}${parseFloat(
                              item.value
                            ).toFixed(2)}`}
                          />
                        </div>
                      ))}
                    </Stack>
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
