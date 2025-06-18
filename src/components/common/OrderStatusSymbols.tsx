import React from "react";
import { Box } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

interface OrderStatusSymbolsProps {
  on_hold: boolean;
  fitting_on_collection: boolean;
  urgent: boolean;
}
export default function OrderStatusSymbols({
  on_hold,
  fitting_on_collection,
  urgent,
}: OrderStatusSymbolsProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "rows" }}>
      {on_hold ? (
        <CircleIcon sx={{ color: "red", fontSize: "1rem" }} />
      ) : (
        <CircleIcon sx={{ color: "green", fontSize: "1rem" }} />
      )}
      {fitting_on_collection && (
        <CircleIcon sx={{ color: "blue", fontSize: "1rem" }} />
      )}
      {urgent && (
        <CircleIcon
          sx={{
            color: "black",
            fontSize: "1rem",
            verticalAlign: "middle",
            ml: 1, // margin-left for spacing
          }}
        />
      )}
    </Box>
  );
}
