import { Box, Typography } from "@mui/material";
interface SugarCataractTextProps {
  shuger: boolean;
  cataract: boolean;
  blepharitis: boolean;
}
export default function SugarCataractText({
  shuger,
  cataract,
  blepharitis,
}: SugarCataractTextProps) {
  return (
    <Box sx={{ display: "flex", rowGap: 2 }}>
      <Typography
        fontWeight={600}
        variant="subtitle1"
        color="error"
        sx={{ mr: 1 }}
      >
        {shuger ? "Sugar" : ""}
      </Typography>
      <Typography
        fontWeight={600}
        variant="subtitle1"
        color="error"
        sx={{ mr: 1 }}
      >
        {cataract ? `Cataract` : ""}
      </Typography>
      <Typography
        fontWeight={600}
        variant="subtitle1"
        color="error"
        sx={{ mr: 1 }}
      >
        {blepharitis ? `Blepharitis` : ""}
      </Typography>
    </Box>
  );
}
