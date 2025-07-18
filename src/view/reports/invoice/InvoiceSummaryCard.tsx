import React from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { numberWithCommas } from "../../../utils/numberWithCommas";

// Define props type
type InvoiceReportSummary = {
  total_balance: number;
  total_invoice_amount: number;
  total_invoice_count: number;
  total_paid_amount: number;
};

type Props = {
  data: InvoiceReportSummary;
};

const InvoiceSummaryCard: React.FC<Props> = ({ data }) => {
  const summaryItems = [
    { label: "Total Invoices", value: data.total_invoice_count },
    {
      label: "Total Amount",
      value: numberWithCommas(data.total_invoice_amount),
    },
    { label: "Total Paid", value: numberWithCommas(data.total_paid_amount) },
    { label: "Total Balance", value: numberWithCommas(data.total_balance) },
  ];

  return (
    <Card sx={{ mb: 2, background: "#f5f5f5" }}>
      <CardContent sx={{ py: 1.5, "&:last-child": { pb: 1.5 } }}>
        <Grid container spacing={1}>
          {summaryItems.map((item, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 0.25 }}
              >
                {item.label}
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                {item.value}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default InvoiceSummaryCard;
