// components/common/PaymentListItem.tsx

import { Paper, Typography } from "@mui/material";
import { FC } from "react";
import { formatPaymentMethod } from "../../utils/formatPaymentMethod";
import { formatDateTimeByType } from "../../utils/formatDateTimeByType";
import { numberWithCommas } from "../../utils/numberWithCommas";

type Props = {
  method: string;
  date: string;
  amount: string | number;
};

const PaymentListItem: FC<Props> = ({ method, date, amount }) => {
  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 1,
        my: 1,
      }}
    >
      <Typography sx={{ fontSize: 16 }}>
        {formatPaymentMethod(method)} / {formatDateTimeByType(date, "both")}
      </Typography>
      <Typography sx={{ fontSize: 16 }}>
        Rs. {numberWithCommas(amount)}
      </Typography>
    </Paper>
  );
};

export default PaymentListItem;
