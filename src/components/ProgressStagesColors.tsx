import { Box, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
export default function ProgressStagesColors() {
  return (
    <div>
      <Box m={1} display="flex" alignItems="center" gap={2} marginBottom={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <CircleIcon sx={{ color: "red", fontSize: "1rem" }} />
          <Typography sx={{ fontSize: "1rem" }}>On Hold Job</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <CircleIcon sx={{ color: "green", fontSize: "1rem" }} />
          <Typography sx={{ fontSize: "1rem" }}>Confirm Order</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <CircleIcon sx={{ color: "blue", fontSize: "1rem" }} />
          <Typography sx={{ fontSize: "1rem" }}>
            Fitting on Collection
          </Typography>
        </Box>
      </Box>
    </div>
  );
}
