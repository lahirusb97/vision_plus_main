// components/StatusWithTimestamp.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import { formatDateTimeByType } from "../../utils/formatDateTimeByType";

//TODO reuse this everywhere an audit-grade timestamp is shown
interface StatusWithTimestampProps {
  /** Main status text or React node shown on the first line */
  label: React.ReactNode;
  /** ISO-8601 UTC string (null ⇒ show em-dash) */
  iso: string | null | undefined;
}

const StatusWithTimestamp: React.FC<StatusWithTimestampProps> = ({
  label,
  iso,
}) => {
  if (!iso) return <>{label}</>; // graceful fallback (no timestamp)

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        lineHeight: 1.1, // keep the stack tight
      }}
    >
      <span style={{ textTransform: "capitalize" }}>{label}</span>
      <Typography
        variant="caption"
        component="time"
        dateTime={iso} // machine-readable for SR / CSV
        sx={{ fontSize: "0.65rem", color: "text.secondary" }}
        title={iso} // full UTC on hover
      >
        {formatDateTimeByType(iso, "both")}
      </Typography>
    </Box>
  );
};

export default StatusWithTimestamp;
