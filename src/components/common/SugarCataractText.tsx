import { Typography } from "@mui/material";
interface SugarCataractTextProps {
  shuger: boolean | undefined;
  cataract: boolean | undefined;
}
export default function SugarCataractText({
  shuger,
  cataract,
}: SugarCataractTextProps) {
  if (!shuger && !cataract) {
    return null; // Render nothing if both props are false or undefined
  }
  return (
    <Typography
      fontWeight={600}
      variant="subtitle1"
      color="error"
      sx={{ mr: 1 }}
    >
      {shuger ? "Sugar" : ""}
      {cataract ? `${shuger ? " | " : ""}Cataract` : ""}
    </Typography>
  );
}
