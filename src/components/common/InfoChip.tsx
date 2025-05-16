import React from "react";
import { Chip, Tooltip } from "@mui/material";

interface InfoChipProps {
  label: string;
  value?: string | number | null;
}

const InfoChip: React.FC<InfoChipProps> = ({ label, value }) => {
  const displayValue = value ?? "N/A";

  return (
    <Tooltip title={`${label}: ${displayValue}`}>
      <Chip
        label={`${label}: ${displayValue}`}
        sx={{
          backgroundColor: "#F4F6F8",
          color: "#333",
          fontWeight: 500,
          fontSize: 13,
          borderRadius: "8px",
          border: "1px solid #D1D5DB",
        }}
      />
    </Tooltip>
  );
};

export default InfoChip;
