import { Typography, Box } from "@mui/material";

interface StockCountDisplayProps {
  currentQty: number;
  changeQty?: number;
}

export default function StockCountDisplay({
  currentQty,
  changeQty = 0,
}: StockCountDisplayProps) {
  const showChange = changeQty !== 0;
  const isPositive = changeQty > 0;

  return (
    <Typography variant="h6" fontWeight="bold" sx={{ color: "#1565C0", mb: 1 }}>
      {currentQty}{" "}
      {showChange && (
        <Box
          component="span"
          sx={{
            display: "inline-flex",
            gap: 0.5,
            color: isPositive ? "green" : "red",
            fontSize: "0.9rem",
            fontWeight: 500,
          }}
        >
          <span>
            {isPositive ? "+" : ""}
            {changeQty}
          </span>
        </Box>
      )}
    </Typography>
  );
}
