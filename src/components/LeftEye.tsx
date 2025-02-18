import { Box, Button, Grid2, TextField, Typography } from "@mui/material";
const widthInput = 100;
import { lightBlue } from "@mui/material/colors";

export default function LeftEye() {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          bgcolor: lightBlue[50],
          p: 1,
        }}
      >
        <Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <TextField size="small" label="Hb Rx Distance" />
            <TextField size="small" label="Hb Rx Near" />
            <TextField size="small" label="Auto Ref" />
          </Box>
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            <TextField
              placeholder=" sph"
              size="small"
              label="sph"
              sx={{ width: widthInput }}
            />

            <TextField
              placeholder=" cyl"
              size="small"
              label="cyl"
              sx={{ width: widthInput }}
            />

            <TextField
              placeholder=" axis"
              size="small"
              label="axis"
              sx={{ width: widthInput }}
            />
          </Box>
        </Box>

        {/* show this below */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <TextField
            placeholder=" near"
            size="small"
            label="near"
            sx={{ width: widthInput }}
          />
          <Box sx={{ flexGrow: 2, p: 1 }}>
            <Typography>Left Side</Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
