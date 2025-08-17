import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";

interface BtnViewOrderFormProps {
  invoiceNumber: string;
  size?: "small" | "medium" | "large";
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
}

const BtnViewOrderForm: React.FC<BtnViewOrderFormProps> = ({
  invoiceNumber,
  size = "small",
  color = "primary",
}) => {
  if (!invoiceNumber) return null;

  return (
    <Tooltip title="View Order Form">
      <a
        href={`/transaction/invoice/view/${invoiceNumber}/?invoice_number=${invoiceNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <IconButton size={size} sx={{ p: 0 }} color={color}>
          <AssignmentIcon fontSize={size} />
        </IconButton>
      </a>
    </Tooltip>
  );
};

export default BtnViewOrderForm;
