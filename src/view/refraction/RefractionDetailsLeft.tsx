import { Box, Paper, TextField, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useFormContext } from "react-hook-form";
const widthInput = 160;
export default function RefractionDetailsLeft() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",

          gap: 2,
          bgcolor: blue[50],
          p: 2,
        }}
      >
        <TextField
          {...register("hb_rx_left_dist")}
          error={!!errors.hb_rx_left_dist}
          size="small"
          label={"Hb Rx dist"}
        />
        <TextField
          {...register("hb_rx_left_near")}
          error={!!errors.hb_rx_left_near}
          size="small"
          label={"Hb Rx near"}
        />
        <TextField
          {...register("auto_ref_left")}
          error={!!errors.auto_ref_left}
          size="small"
          label={"Auto Ref"}
        />
        <TextField
          {...register("ntc_left")}
          error={!!errors.ntc_left}
          size="small"
          label={"NTC"}
        />
        <TextField
          {...register("va_without_glass_left")}
          error={!!errors.va_without_glass_left}
          size="small"
          label={"VA Without Glass"}
        />
        <TextField
          {...register("va_without_ph_left")}
          error={!!errors.va_without_ph_left}
          size="small"
          label={"VA Without P/H"}
        />
        <TextField
          {...register("va_with_glass_left")}
          error={!!errors.va_with_glass_left}
          size="small"
          label={"VA With Glass"}
        />
        <Paper sx={{ p: 2, bgcolor: blue[100] }}>
          <Box>
            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
              <TextField
                inputProps={{ step: 0.25 }}
                type="number"
                {...register("left_eye_dist_sph")}
                error={!!errors.left_eye_dist_sph}
                placeholder=" sph"
                size="small"
                label="sph"
                sx={{ width: widthInput }}
              />

              <TextField
                inputProps={{ step: 0.25 }}
                type="number"
                {...register("left_eye_dist_cyl")}
                error={!!errors.left_eye_dist_cyl}
                placeholder=" cyl"
                size="small"
                label="cyl"
                sx={{ width: widthInput }}
              />

              <TextField
                inputProps={{ step: 0.25 }}
                type="number"
                {...register("left_eye_dist_axis")}
                error={!!errors.left_eye_dist_axis}
                placeholder=" axis"
                size="small"
                label="axis"
                sx={{ width: widthInput }}
              />
            </Box>
          </Box>

          {/* show this below */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <TextField
              inputProps={{ step: 0.25 }}
              type="number"
              {...register("left_eye_near_sph")}
              error={!!errors.left_eye_near_sph}
              placeholder=" near"
              size="small"
              label="near"
              sx={{ width: widthInput }}
            />
            <Box
              sx={{
                flexGrow: 2,
                p: 1,
                bgcolor: blue[500],
                ml: 1,
                color: "white",
              }}
            >
              <Typography>Left Side</Typography>
            </Box>
          </Box>
        </Paper>
      </Paper>
    </div>
  );
}
