import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { formatDateTimeByType } from "../utils/formatDateTimeByType";
import { numberWithCommas } from "../utils/numberWithCommas";
import { PaymentModel } from "../model/PaymentModel";
import { formatPaymentMethod } from "../utils/formatPaymentMethod";

export const AuditPaymentItem = ({
  order_payments,
}: {
  order_payments: PaymentModel[];
}) => {
  if (order_payments.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        No deleted payments found.
      </Typography>
    );
  }

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      {order_payments.map((payment) => (
        <Card
          key={payment.id}
          variant="outlined"
          sx={{
            mb: 0.5,
            px: 1,
            py: 0.5,
            borderLeft: "2px solid #1976d2",
            backgroundColor: "#fafafa",
            borderRadius: 1,
          }}
        >
          <CardContent sx={{ p: 1, "&:last-child": { pb: 1 } }}>
            <Grid container spacing={0.5}>
              <Grid item xs={4}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  Payment ID
                </Typography>
                <Typography variant="body2">#{payment.id}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  Amount
                </Typography>
                <Typography variant="body2">
                  {numberWithCommas(payment.amount)}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  Payment Method
                </Typography>
                <Typography variant="body2">
                  {formatPaymentMethod(payment.payment_method)}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  Payment Date
                </Typography>
                <Typography variant="body2">
                  {formatDateTimeByType(payment.payment_date, "both")}
                </Typography>
              </Grid>

              <Grid item xs={4}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  Deleted By (Admin)
                </Typography>
                <Typography variant="body2">
                  {payment.admin_username || "-"}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  Deleted By (User)
                </Typography>
                <Typography variant="body2">
                  {payment.user_username || "-"}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  Deleted At
                </Typography>
                <Typography variant="body2">
                  {payment.deleted_at
                    ? formatDateTimeByType(payment.deleted_at, "both")
                    : "-"}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};
