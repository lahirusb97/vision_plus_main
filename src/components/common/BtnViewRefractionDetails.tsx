import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { History } from "lucide-react";

interface BtnViewRefractionDetailsProps {
  refractionNumber: number;
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

const BtnViewRefractionDetails: React.FC<BtnViewRefractionDetailsProps> = ({
  refractionNumber,
  size = "small",
  color = "primary",
}) => {
  if (!refractionNumber) return null;

  return (
    <Tooltip title="View Order Form">
      <a
        href={`/refraction/${refractionNumber}/`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <IconButton size={size} sx={{ p: 0 }} color={color}>
          <History fontSize={size} />
        </IconButton>
      </a>
    </Tooltip>
  );
};

export default BtnViewRefractionDetails;
