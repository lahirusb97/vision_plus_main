import { Box, Paper, TextField, Typography } from "@mui/material";
import { purple } from "@mui/material/colors";
import { useFormContext } from "react-hook-form";
const widthInput = 160;

export default function RefractionDetailsRight() {
  const { register } = useFormContext();

  return (
    <div>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          bgcolor: purple[50],
          p: 2,
        }}
      >
        {/* //!Right EYE */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <TextField
            inputProps={{ step: 0.25 }}
            {...register("hb_rx_right_dist")}
            size="small"
            label={"Hb Rx dist"}
            type="number"
          />
          <TextField
            inputProps={{ step: 0.25 }}
            {...register("hb_rx_right_near")}
            size="small"
            label={"Hb Rx near"}
            type="number"
          />
          <TextField
            inputProps={{ step: 0.25 }}
            {...register("auto_ref_right")}
            size="small"
            label={"Auto Ref"}
            type="number"
          />
          <TextField
            inputProps={{ step: 0.25 }}
            {...register("ntc_right")}
            size="small"
            label={"NTC"}
            type="number"
          />
          <TextField
            inputProps={{ step: 0.25 }}
            {...register("va_without_glass_right")}
            size="small"
            label={"VA Without Glass"}
            type="number"
          />
          <TextField
            inputProps={{ step: 0.25 }}
            {...register("va_without_ph_right")}
            size="small"
            label={"VA Without P/H"}
            type="number"
          />
          <TextField
            inputProps={{ step: 0.25 }}
            {...register("va_with_glass_right")}
            size="small"
            label={"VA With Glass"}
            type="number"
          />
        </Box>
        <Paper variant="elevation" sx={{ bgcolor: purple[100] }}>
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
              <TextField
                inputProps={{ step: 0.25 }}
                type="number"
                {...register("right_eye_dist_sph")}
                placeholder=" sph"
                size="small"
                label="sph"
                sx={{ width: widthInput }}
              />

              <TextField
                inputProps={{ step: 0.25 }}
                type="number"
                {...register("right_eye_dist_cyl")}
                placeholder=" cyl"
                size="small"
                label="cyl"
                sx={{ width: widthInput }}
              />

              <TextField
                inputProps={{ step: 0.25 }}
                type="number"
                {...register("right_eye_dist_axis")}
                placeholder=" axis"
                size="small"
                label="axis"
                sx={{ width: widthInput }}
              />
            </Box>
          </Box>

          {/* show this below */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: 2,
              pb: 2,
            }}
          >
            <TextField
              inputProps={{ step: 0.25 }}
              type="number"
              {...register("right_eye_near_sph")}
              placeholder=" near"
              size="small"
              label="near"
              sx={{ width: widthInput }}
            />
            <Box
              sx={{
                flexGrow: 2,
                p: 1,
                bgcolor: purple[500],
                ml: 1,
                color: "white",
              }}
            >
              <Typography>right Side</Typography>
            </Box>
          </Box>
        </Paper>
      </Paper>
    </div>
  );
}
