import { Box, TextField, Typography } from "@mui/material";
const widthInput = 100;
import { blue, lightBlue, yellow } from "@mui/material/colors";
import { useFormContext } from "react-hook-form";

export default function LeftEyeTable() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          backgroundColor: "#f5f5f5",/* chalani- backgroundcolor change*/
          p: 1,
        }}
      >
        <Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <TextField
              type="number"
              inputProps={{ step: 0.25 }}
              {...register("hb_rx_left_dist")}
              error={!!errors.hb_rx_left_dist}
              size="small"
              label="Hb Rx Distance"
            />
            <TextField
              inputProps={{ step: 0.25 }}
              type="number"
              {...register("hb_rx_left_near")}
              error={!!errors.hb_rx_left_near}
              size="small"
              label="Hb Rx Near"
            />
            <TextField
              inputProps={{ step: 0.25 }}
              type="number"
              {...register("auto_ref_left")}
              error={!!errors.auto_ref_left}
              size="small"
              label="Auto Ref"
            />
          </Box>
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
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
      </Box>
    </div>
  );
}
